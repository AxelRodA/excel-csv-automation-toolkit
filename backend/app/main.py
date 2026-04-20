from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from .config import ALIAS_RULES_PATH, EXPORT_DIR, SUPPORTED_EXTENSIONS, UPLOAD_DIR
from .processing import load_alias_rules, process_file
from .schemas import AliasRulesResponse, HealthResponse, ProcessingResult, ProcessingSummary

app = FastAPI(
    title="Excel / CSV Automation Toolkit API",
    description="Upload, clean, standardize, deduplicate, review, and export business data files.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/api/aliases", response_model=AliasRulesResponse)
def get_alias_rules() -> AliasRulesResponse:
    aliases = load_alias_rules(ALIAS_RULES_PATH)
    return AliasRulesResponse(canonical_companies=list(aliases.keys()), aliases=aliases)


@app.post("/api/process", response_model=ProcessingResult)
async def upload_and_process(file: UploadFile = File(...)) -> ProcessingResult:
    original_name = file.filename or "uploaded-file"
    suffix = Path(original_name).suffix.lower()
    if suffix not in SUPPORTED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Upload a CSV, XLSX, or XLS file.")

    job_id = uuid4().hex
    upload_path = UPLOAD_DIR / f"{job_id}{suffix}"
    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    upload_path.write_bytes(contents)

    try:
        processed = process_file(upload_path, job_id)
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Could not process file: {exc}") from exc

    summary = ProcessingSummary(
        rows_processed=processed["rows_processed"],
        columns_processed=processed["columns_processed"],
        duplicates_removed=processed["duplicates_removed"],
        names_standardized=processed["names_standardized"],
        ambiguous_rows_found=len(processed["ambiguous_rows"]),
        exported_csv=f"/api/export/{job_id}/csv",
        exported_xlsx=f"/api/export/{job_id}/xlsx",
    )

    return ProcessingResult(
        job_id=job_id,
        filename=original_name,
        summary=summary,
        original_preview=processed["original_preview"],
        cleaned_preview=processed["cleaned_preview"],
        ambiguous_rows=processed["ambiguous_rows"],
        columns_before=processed["columns_before"],
        columns_after=processed["columns_after"],
    )


@app.get("/api/export/{job_id}/{file_type}")
def export_file(job_id: str, file_type: str) -> FileResponse:
    if file_type not in {"csv", "xlsx"}:
        raise HTTPException(status_code=400, detail="Export type must be csv or xlsx.")

    path = EXPORT_DIR / f"{job_id}_cleaned.{file_type}"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Export not found. Process a file first.")

    media_type = (
        "text/csv"
        if file_type == "csv"
        else "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    return FileResponse(
        path,
        media_type=media_type,
        filename=f"cleaned-company-data.{file_type}",
    )
