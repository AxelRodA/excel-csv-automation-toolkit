from typing import Any, Literal

from pydantic import BaseModel


class AmbiguousRow(BaseModel):
    row_number: int
    original_company: str
    suggested_company: str | None
    confidence: float
    reason: str


class ProcessingSummary(BaseModel):
    rows_processed: int
    columns_processed: int
    duplicates_removed: int
    names_standardized: int
    ambiguous_rows_found: int
    exported_csv: str
    exported_xlsx: str


class ProcessingResult(BaseModel):
    job_id: str
    filename: str
    summary: ProcessingSummary
    original_preview: list[dict[str, Any]]
    cleaned_preview: list[dict[str, Any]]
    ambiguous_rows: list[AmbiguousRow]
    columns_before: list[str]
    columns_after: list[str]


class AliasRulesResponse(BaseModel):
    canonical_companies: list[str]
    aliases: dict[str, list[str]]


class HealthResponse(BaseModel):
    status: Literal["ok"]
