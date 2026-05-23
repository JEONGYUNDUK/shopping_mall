# Shopping Mall Monorepo Structure

This repository is prepared as a monorepo with separated frontend and backend apps.

```text
shopping_mall/
|-- .gitignore
|-- backend/
|   |-- Procfile
|   |-- requirements.txt
|   `-- app/
|       |-- __init__.py
|       |-- api/
|       |   `-- __init__.py
|       |-- core/
|       |   `-- __init__.py
|       |-- models/
|       |   `-- __init__.py
|       |-- schemas/
|       |   `-- __init__.py
|       `-- services/
|           `-- __init__.py
|-- docs/
|   `-- project-structure.md
`-- frontend/
    |-- .gitkeep
    |-- app/
    |   `-- .gitkeep
    |-- components/
    |   `-- .gitkeep
    |-- lib/
    |   `-- .gitkeep
    `-- public/
        `-- .gitkeep
```

## Notes

- `backend/` is reserved for the FastAPI service and Railway deployment.
- `frontend/` is reserved for the Next.js application.
- Empty folders currently use `.gitkeep` so the structure is preserved in Git.
