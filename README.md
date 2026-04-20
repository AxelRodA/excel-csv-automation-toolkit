# Excel / CSV Automation Toolkit

A production-ready portfolio project that demonstrates business-focused data automation for messy Excel and CSV files. The app lets a client upload spreadsheet exports, preview raw data, run a repeatable cleanup pipeline, review ambiguous company-name matches, and download cleaned CSV/XLSX deliverables.

![Homepage screenshot placeholder](docs/screenshots/homepage.png)
![Processed results screenshot placeholder](docs/screenshots/processed-results.png)

## Business Problem / Solution / Result

**Business problem:** Sales, operations, and finance teams often receive spreadsheet exports with inconsistent columns, duplicated records, extra whitespace, and many variations of the same company name. Cleaning these manually is slow, error-prone, and difficult to repeat.

**Solution:** This toolkit provides a full-stack workflow that turns a raw upload into standardized output using pandas, centralized alias rules, duplicate removal, fuzzy company matching, manual-review flags, and downloadable CSV/XLSX exports.

**Result:** Clients get cleaner files faster, fewer spreadsheet mistakes, and a reusable automation workflow that can be adapted to CRM imports, vendor lists, lead files, procurement reports, and internal reporting cleanup.

## Features

- Upload `.csv`, `.xlsx`, or `.xls` files
- Preview the uploaded data before processing
- Normalize column names into clean snake_case fields
- Trim and collapse whitespace in text fields
- Remove exact duplicate rows
- Standardize company names with exact aliases and simple fuzzy matching
- Flag ambiguous company names for human review
- Show before/after previews and processing metrics
- Export cleaned results as CSV and XLSX
- Responsive dark UI with upload, loading, success, error, and empty states

## Tech Stack

- Backend: Python, FastAPI, pandas, openpyxl, uvicorn
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Workflow: local file upload, local generated exports, no authentication

## Project Structure

```text
backend/
  app/
    main.py          FastAPI routes
    processing.py    pandas cleaning and standardization pipeline
    schemas.py       typed API response models
    config.py        paths and processing thresholds
  config/
    aliases.json     canonical company names and alias rules
  requirements.txt
sample-data/
  company_leads_dirty.csv
  company_leads_dirty.xlsx
  company-aliases.example.json
src/
  components/        reusable React UI components
  lib/api.ts         frontend API client
  App.tsx
```

## Local Setup

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`.

### Frontend

From the project root:

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` requests to FastAPI.

## Sample Workflow

1. Start the backend with `python -m uvicorn app.main:app --reload`.
2. Start the frontend with `npm run dev`.
3. Upload `sample-data/company_leads_dirty.csv` or `sample-data/company_leads_dirty.xlsx`.
4. Review the before/after preview tables.
5. Check the metric cards for rows processed, duplicates removed, names standardized, and ambiguous rows found.
6. Review ambiguous company names that need manual confirmation.
7. Download the cleaned CSV or XLSX export.

## Editing Alias Rules

Company standardization rules live in `backend/config/aliases.json`.

Use canonical company names as top-level keys and add lower-case or mixed-case variations to each alias list:

```json
{
  "Acme Corporation": ["acme corp", "acme co", "acme incorporated"]
}
```

The pipeline applies:

1. Exact canonical name matching
2. Exact alias mapping
3. Fuzzy similarity scoring against canonical names
4. Ambiguous review flags when confidence is close but below the auto-match threshold

## Production Build

Build the frontend:

```bash
npm run build
```

Run the backend in production with your preferred ASGI deployment process:

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

For Vercel or Netlify frontend deployment, set `VITE_API_BASE_URL` to the deployed FastAPI API URL. The backend can be deployed separately on services that support Python ASGI apps.

## Portfolio Value

This project is designed to show freelance clients that you can:

- automate repetitive Excel cleanup work
- repair messy CSV import workflows
- standardize company and account names
- build review queues for data that should not be auto-fixed blindly
- deliver clean, exportable files for business users
- combine Python automation with a polished web interface
