# Excel / CSV Automation Toolkit

Portfolio-ready full-stack demo for messy spreadsheet cleanup, company-name standardization, duplicate removal, and export automation.

This project is designed to look credible in three places:
- GitHub as a polished technical build
- Upwork as a service proof point for spreadsheet automation work
- a personal portfolio as a business-focused case study

## Business Framing

Teams in operations, sales, finance, and procurement often work with spreadsheet exports from CRMs, vendor portals, lead forms, and internal systems. Those files usually arrive with:

- inconsistent column names
- repeated rows
- extra whitespace and formatting issues
- multiple variations of the same company name
- edge cases that should be reviewed manually instead of auto-fixed

This project demonstrates how that problem can be turned into a repeatable product workflow: upload a dirty CSV or Excel file, preview it, clean it, standardize it, flag risky matches, and export client-ready deliverables.

## Problem / Solution / Result

### Problem

Business teams waste time cleaning spreadsheet exports by hand. That manual work creates delays, inconsistent data quality, and avoidable mistakes before the data can be imported into another system or used for reporting.

### Solution

This toolkit combines a FastAPI backend with a React frontend to provide:

- upload and preview for CSV/XLSX files
- schema normalization for inconsistent headers
- text cleanup and whitespace trimming
- duplicate removal
- exact alias mapping for company names
- simple fuzzy matching for near matches
- manual review queue for ambiguous rows
- CSV and XLSX export of cleaned output

### Result

The final workflow feels like a small internal business tool rather than a code sample. It shows how a freelance developer can deliver:

- automation that saves manual spreadsheet time
- safer normalization logic with review checkpoints
- production-style UX around loading, success, and error states
- polished deliverables that non-technical teams can actually use

## Why This Is Strong Portfolio Material

This repo is intentionally positioned to sell services such as:

- Excel cleanup automation
- CSV import repair
- CRM data normalization
- company-name standardization
- operational data cleanup
- frontend + backend workflow tooling

It demonstrates both technical implementation and business understanding, which is usually what clients care about most.

## Feature Highlights

- Upload `.csv`, `.xlsx`, or `.xls` files
- Preview source data before processing
- Normalize raw column names into clean `snake_case`
- Trim and collapse extra whitespace in text fields
- Remove duplicate rows
- Standardize company names using alias rules
- Apply fuzzy matching for near matches
- Flag ambiguous company names for manual review
- Show before/after tables and processing metrics
- Export cleaned data as CSV and XLSX
- Switch the interface between English and Spanish
- Download sample test files directly from the UI

## Screenshot Placeholders

Add final screenshots to `docs/screenshots/` using these filenames:

- `docs/screenshots/dashboard-overview.png`
- `docs/screenshots/upload-ready.png`
- `docs/screenshots/processed-results.png`
- `docs/screenshots/review-queue.png`

Suggested use:

- GitHub README hero image: `dashboard-overview.png`
- Upwork portfolio thumbnail: `processed-results.png`
- personal portfolio case study gallery: all four screenshots

## Sample Data Included

The repo includes realistic sample data to demonstrate the workflow:

- [sample-data/company_leads_dirty.csv](sample-data/company_leads_dirty.csv)
- [sample-data/company_leads_dirty.xlsx](sample-data/company_leads_dirty.xlsx)
- [sample-data/company-aliases.example.json](sample-data/company-aliases.example.json)

The sample rows intentionally include:

- duplicate company records
- inconsistent naming such as `Acme Corp`, `Acme Corporation`, `Globex LLC`
- whitespace issues
- ambiguous company names that should be reviewed manually
- fields that resemble CRM or lead-import exports

Public sample downloads used by the frontend live in:

- [public/sample-data/company_leads_dirty.csv](public/sample-data/company_leads_dirty.csv)
- [public/sample-data/company_leads_dirty.xlsx](public/sample-data/company_leads_dirty.xlsx)

## Tech Stack

- **Backend:** Python, FastAPI, pandas, openpyxl, uvicorn
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Workflow:** local file upload, local generated exports, no auth required

## Project Structure

```text
backend/
  app/
    main.py          FastAPI routes
    processing.py    pandas cleaning and standardization pipeline
    schemas.py       typed API response models
    config.py        paths and thresholds
  config/
    aliases.json     canonical company names and alias rules
  requirements.txt

public/
  sample-data/       sample files downloadable from the frontend

sample-data/
  company_leads_dirty.csv
  company_leads_dirty.xlsx
  company-aliases.example.json

src/
  components/        reusable React UI components
  lib/api.ts         frontend API client
  i18n.ts            English / Spanish UI copy
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

API:

- `http://127.0.0.1:8000`

### Frontend

From the project root:

```bash
npm install
npm run dev
```

Frontend:

- `http://127.0.0.1:5173`

The Vite dev server proxies `/api` requests to the FastAPI backend.

## Example Workflow

1. Start FastAPI.
2. Start the Vite frontend.
3. Upload `company_leads_dirty.csv` or `company_leads_dirty.xlsx`.
4. Review the raw preview table.
5. Run the automation workflow.
6. Inspect metrics for rows processed, duplicates removed, names standardized, and ambiguous rows found.
7. Review flagged matches in the ambiguous review queue.
8. Download the cleaned CSV or XLSX output.

## Editing Alias Rules

Company normalization rules are stored in:

- [backend/config/aliases.json](backend/config/aliases.json)

Use canonical company names as keys and place known variations in the alias array:

```json
{
  "Acme Corporation": ["acme corp", "acme co", "acme incorporated"]
}
```

The pipeline applies company-name logic in this order:

1. exact canonical-name match
2. exact alias match
3. fuzzy similarity match against canonical names
4. manual review flag when confidence is close but below the auto-apply threshold

## Production Build

Build the frontend:

```bash
npm run build
```

Run the backend with uvicorn:

```bash
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

For a separated deployment setup:

- deploy the frontend to Vercel or Netlify
- deploy the FastAPI app to a Python-compatible host
- set `VITE_API_BASE_URL` to the public API URL

## Suggested Portfolio Caption

Use something like this when presenting the project:

> Built a business-focused Excel/CSV automation tool that cleans raw spreadsheet exports, standardizes company names, flags ambiguous records for review, and produces clean CSV/XLSX deliverables through a polished web interface.

## Repo Quality Notes

This project includes:

- realistic sample files
- bilingual UI support
- client-facing dashboard styling
- typed frontend models
- structured backend response schemas
- clear separation between UI, processing logic, and normalization rules

That combination makes the repo present well for technical review and client-facing portfolio use.
