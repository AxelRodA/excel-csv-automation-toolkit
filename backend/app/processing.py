import json
import re
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

import pandas as pd

from .config import (
    ALIAS_RULES_PATH,
    AMBIGUOUS_MATCH_THRESHOLD,
    EXPORT_DIR,
    FUZZY_MATCH_THRESHOLD,
    PREVIEW_LIMIT,
)
from .schemas import AmbiguousRow


def load_alias_rules(path: Path = ALIAS_RULES_PATH) -> dict[str, list[str]]:
    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    return {canonical: aliases for canonical, aliases in data.items()}


def read_tabular_file(path: Path) -> pd.DataFrame:
    suffix = path.suffix.lower()
    if suffix == ".csv":
        return pd.read_csv(path, dtype=str, keep_default_na=False)
    if suffix in {".xlsx", ".xls"}:
        return pd.read_excel(path, dtype=str, keep_default_na=False)
    raise ValueError("Only CSV, XLSX, and XLS files are supported.")


def normalize_column_name(column: str) -> str:
    normalized = column.strip().lower()
    normalized = re.sub(r"[^a-z0-9]+", "_", normalized)
    normalized = re.sub(r"_+", "_", normalized).strip("_")
    return normalized or "unnamed_column"


def normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    renamed = df.copy()
    seen: dict[str, int] = {}
    columns: list[str] = []

    for column in renamed.columns:
        base = normalize_column_name(str(column))
        seen[base] = seen.get(base, 0) + 1
        columns.append(base if seen[base] == 1 else f"{base}_{seen[base]}")

    renamed.columns = columns
    return renamed


def clean_text_fields(df: pd.DataFrame) -> pd.DataFrame:
    cleaned = df.copy()
    for column in cleaned.select_dtypes(include=["object"]).columns:
        cleaned[column] = (
            cleaned[column].astype(str).str.replace(r"\s+", " ", regex=True).str.strip()
        )
    return cleaned


def build_alias_lookup(rules: dict[str, list[str]]) -> dict[str, str]:
    lookup: dict[str, str] = {}
    for canonical, aliases in rules.items():
        lookup[canonical.lower()] = canonical
        for alias in aliases:
            lookup[alias.lower()] = canonical
    return lookup


def best_company_match(company: str, canonical_names: list[str]) -> tuple[str | None, float]:
    normalized = company.lower().strip()
    if not normalized:
        return None, 0.0

    scores = [
        (canonical, SequenceMatcher(None, normalized, canonical.lower()).ratio())
        for canonical in canonical_names
    ]
    if not scores:
        return None, 0.0
    return max(scores, key=lambda item: item[1])


def detect_company_column(columns: list[str]) -> str | None:
    preferred = ["company", "company_name", "organization", "account", "business_name"]
    for candidate in preferred:
        if candidate in columns:
            return candidate
    return next((column for column in columns if "company" in column), None)


def standardize_company_names(
    df: pd.DataFrame, rules: dict[str, list[str]]
) -> tuple[pd.DataFrame, int, list[AmbiguousRow]]:
    company_column = detect_company_column(list(df.columns))
    if company_column is None:
        return df, 0, []

    cleaned = df.copy()
    alias_lookup = build_alias_lookup(rules)
    canonical_names = list(rules.keys())
    ambiguous_rows: list[AmbiguousRow] = []
    standardized_count = 0

    for index, value in cleaned[company_column].items():
        original = str(value).strip()
        lookup_key = original.lower()
        canonical = alias_lookup.get(lookup_key)

        if canonical:
            if canonical != original:
                standardized_count += 1
            cleaned.at[index, company_column] = canonical
            continue

        suggestion, score = best_company_match(original, canonical_names)
        if suggestion and score >= FUZZY_MATCH_THRESHOLD:
            cleaned.at[index, company_column] = suggestion
            standardized_count += 1
        elif suggestion and score >= AMBIGUOUS_MATCH_THRESHOLD:
            ambiguous_rows.append(
                AmbiguousRow(
                    row_number=int(index) + 2,
                    original_company=original,
                    suggested_company=suggestion,
                    confidence=round(score, 2),
                    reason="Close fuzzy match requires manual review.",
                )
            )

    return cleaned, standardized_count, ambiguous_rows


def dataframe_preview(df: pd.DataFrame, limit: int = PREVIEW_LIMIT) -> list[dict[str, Any]]:
    return df.head(limit).where(pd.notnull(df), "").to_dict(orient="records")


def process_file(input_path: Path, job_id: str) -> dict[str, Any]:
    original_df = read_tabular_file(input_path)
    original_preview = dataframe_preview(original_df)
    columns_before = [str(column) for column in original_df.columns]

    normalized_df = normalize_columns(original_df)
    cleaned_df = clean_text_fields(normalized_df)

    rules = load_alias_rules()
    standardized_df, names_standardized, ambiguous_rows = standardize_company_names(cleaned_df, rules)
    before_dedup_count = len(standardized_df)
    standardized_df = standardized_df.drop_duplicates().reset_index(drop=True)
    duplicates_removed = before_dedup_count - len(standardized_df)

    csv_path = EXPORT_DIR / f"{job_id}_cleaned.csv"
    xlsx_path = EXPORT_DIR / f"{job_id}_cleaned.xlsx"
    standardized_df.to_csv(csv_path, index=False)
    standardized_df.to_excel(xlsx_path, index=False, engine="openpyxl")

    return {
        "rows_processed": int(len(original_df)),
        "columns_processed": int(len(standardized_df.columns)),
        "duplicates_removed": int(duplicates_removed),
        "names_standardized": int(names_standardized),
        "ambiguous_rows": ambiguous_rows,
        "original_preview": original_preview,
        "cleaned_preview": dataframe_preview(standardized_df),
        "columns_before": columns_before,
        "columns_after": list(standardized_df.columns),
        "csv_path": csv_path,
        "xlsx_path": xlsx_path,
    }
