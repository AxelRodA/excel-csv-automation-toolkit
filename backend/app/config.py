from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
CONFIG_DIR = BASE_DIR / "config"
STORAGE_DIR = BASE_DIR / "storage"
UPLOAD_DIR = STORAGE_DIR / "uploads"
EXPORT_DIR = STORAGE_DIR / "exports"
ALIAS_RULES_PATH = CONFIG_DIR / "aliases.json"

SUPPORTED_EXTENSIONS = {".csv", ".xlsx", ".xls"}
PREVIEW_LIMIT = 8
FUZZY_MATCH_THRESHOLD = 0.90
AMBIGUOUS_MATCH_THRESHOLD = 0.76

for directory in (UPLOAD_DIR, EXPORT_DIR):
    directory.mkdir(parents=True, exist_ok=True)
