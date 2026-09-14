import shutil
import tempfile
import os

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from main import process_document

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://docket-opal.vercel.app",
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/extract")
async def extract(file: UploadFile):

    suffix = os.path.splitext(file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        doc_type, fields, warnings = process_document(tmp_path)
    except ValueError as e:
        return {"error": str(e)}
    finally:
        os.remove(tmp_path)

    return {"doc_type": doc_type, "fields": fields, "warnings": warnings}