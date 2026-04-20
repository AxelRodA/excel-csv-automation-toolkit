export type Language = "en" | "es";

export const languages: Record<Language, string> = {
  en: "English",
  es: "Español"
};

export const copy = {
  en: {
    brand: "Portfolio Automation",
    nav: ["Dashboard", "Workflows", "Review Queue", "Integrations"],
    sidebar: {
      lab: "Automation Lab",
      stack: "Tech Stack: FastAPI",
      items: ["Overview", "Automation", "Data Mapping", "History", "Settings"],
      newWorkflow: "+ New workflow",
      docs: "Documentation",
      support: "Support",
      note: "Focused demo: upload a file, run the cleanup pipeline, review results, and export deliverables."
    },
    connect: "Connect Stack",
    badge: "Portfolio automation demo",
    title: "Excel / CSV Automation Toolkit",
    subtitle:
      "Your automated cleanup workflow designed for high-performance data engineering and complex spreadsheet transformations.",
    chips: ["FastAPI + pandas", "React + Tailwind", "CSV + XLSX"],
    impact: {
      problemTitle: "The Problem",
      problemCopy:
        "Fragmented data sources, inconsistent naming conventions, and duplicate entries causing manual processing delays.",
      solutionTitle: "The Solution",
      solutionCopy:
        "A centralized automation engine using Python's pandas library to perform multi-stage cleaning and schema enforcement.",
      resultTitle: "The Result",
      resultCopy: "Cleaned, production-ready datasets delivered in seconds with auditable processing logs."
    },
    upload: {
      title: "Clean client spreadsheets in seconds",
      choose: "Choose CSV or Excel file",
      formats: "CSV, XLSX, XLS",
      run: "Run automation",
      processing: "Processing...",
      sampleTitle: "Need a test file?",
      sampleCsv: "Download sample CSV",
      sampleXlsx: "Download sample XLSX"
    },
    status: {
      loading: "Reading file, applying cleanup rules, and preparing exports.",
      error: "Something went wrong while processing the file.",
      success: "Processing complete. All rows normalized according to CRM schema.",
      log: "Log ID: clean-4892-x"
    },
    metrics: {
      processedRows: "Processed rows",
      demoWorkload: "Demo workload",
      cleanedColumns: "cleaned columns",
      duplicatesRemoved: "Duplicates removed",
      duplicateDetail: "Exact duplicate business rows",
      namesFormatted: "Names formatted",
      namesDetail: "Alias and fuzzy matches",
      manualReview: "Manual review",
      manualDetail: "Needs human decision"
    },
    tables: {
      before: "Before source data",
      after: "After normalized",
      preview: "Preview",
      beforeEmpty: "Upload a file to see the original data preview.",
      afterEmpty: "Cleaned data will appear after processing."
    },
    mapping: {
      title: "Column Normalization Mapping",
      schema: "Active schema",
      raw: "Raw",
      target: "Target"
    },
    review: {
      title: "Ambiguous Review Queue",
      empty: "No ambiguous company names were found in this file.",
      suggested: "Suggested record",
      match: "match"
    },
    export: {
      title: "Export cleaned deliverables",
      subtitle: "Download processed files in standardized flat-file and Excel spreadsheet formats.",
      download: "Download",
      csv: "Download flat file",
      xlsx: "Download Excel spreadsheet",
      pending: "Process a file first to generate downloadable CSV and XLSX exports."
    }
  },
  es: {
    brand: "Automatización de Portafolio",
    nav: ["Panel", "Flujos", "Revisión", "Integraciones"],
    sidebar: {
      lab: "Laboratorio de automatización",
      stack: "Stack técnico: FastAPI",
      items: ["Resumen", "Automatización", "Mapeo de datos", "Historial", "Ajustes"],
      newWorkflow: "+ Nuevo flujo",
      docs: "Documentación",
      support: "Soporte",
      note: "Demo enfocada: sube un archivo, ejecuta la limpieza, revisa los resultados y exporta archivos finales."
    },
    connect: "Conectar stack",
    badge: "Demo de automatización para portafolio",
    title: "Excel / CSV Automation Toolkit",
    subtitle:
      "Flujo automatizado de limpieza diseñado para ingeniería de datos de alto rendimiento y transformaciones complejas de hojas de cálculo.",
    chips: ["FastAPI + pandas", "React + Tailwind", "CSV + XLSX"],
    impact: {
      problemTitle: "El problema",
      problemCopy:
        "Fuentes de datos fragmentadas, nombres inconsistentes y registros duplicados que generan retrasos en procesos manuales.",
      solutionTitle: "La solución",
      solutionCopy:
        "Un motor centralizado de automatización con pandas en Python para limpieza por etapas y normalización de esquemas.",
      resultTitle: "El resultado",
      resultCopy: "Conjuntos de datos limpios y listos para producción en segundos, con registros de procesamiento auditables."
    },
    upload: {
      title: "Limpia hojas de cálculo de clientes en segundos",
      choose: "Elige un archivo CSV o Excel",
      formats: "CSV, XLSX, XLS",
      run: "Ejecutar automatización",
      processing: "Procesando...",
      sampleTitle: "¿Necesitas un archivo de prueba?",
      sampleCsv: "Descargar CSV de prueba",
      sampleXlsx: "Descargar XLSX de prueba"
    },
    status: {
      loading: "Leyendo archivo, aplicando reglas de limpieza y preparando exportaciones.",
      error: "Ocurrió un error al procesar el archivo.",
      success: "Procesamiento completo. Todas las filas fueron normalizadas al esquema CRM.",
      log: "Log ID: clean-4892-x"
    },
    metrics: {
      processedRows: "Filas procesadas",
      demoWorkload: "Carga demo",
      cleanedColumns: "columnas limpias",
      duplicatesRemoved: "Duplicados eliminados",
      duplicateDetail: "Filas de negocio duplicadas",
      namesFormatted: "Nombres estandarizados",
      namesDetail: "Alias y coincidencias fuzzy",
      manualReview: "Revisión manual",
      manualDetail: "Requiere decisión humana"
    },
    tables: {
      before: "Antes: datos fuente",
      after: "Después: datos normalizados",
      preview: "Vista previa",
      beforeEmpty: "Sube un archivo para ver la vista previa original.",
      afterEmpty: "Los datos limpios aparecerán después del procesamiento."
    },
    mapping: {
      title: "Mapeo de normalización de columnas",
      schema: "Esquema activo",
      raw: "Origen",
      target: "Destino"
    },
    review: {
      title: "Revisión de coincidencias ambiguas",
      empty: "No se encontraron nombres de empresa ambiguos en este archivo.",
      suggested: "Registro sugerido",
      match: "coincidencia"
    },
    export: {
      title: "Exportar entregables limpios",
      subtitle: "Descarga los archivos procesados en formatos estandarizados CSV y Excel.",
      download: "Descargar",
      csv: "Descargar archivo plano",
      xlsx: "Descargar hoja Excel",
      pending: "Procesa un archivo primero para generar las descargas CSV y XLSX."
    }
  }
} as const;
