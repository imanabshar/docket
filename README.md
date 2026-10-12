# Docket

Docket identifies what kind of document you've uploaded, extracts its text, and returns the key fields as clean, structured data.
<br><br>

[![Docket Preview](/assets/preview.png)](https://docket-opal.vercel.app)
*Live at [docket-opal.vercel.app](https://docket-opal.vercel.app)*


## About

Plenty of documents carry the same handful of fields every time, yet getting that data out usually means opening each file and retyping it into another system. That doesn't scale, and it's an easy place for typos to creep in.

Docket automates that step. Upload a PDF or image and it works out what kind of document it is, extracts the text, pulls the fields specific to that document type, and hands back JSON instead of a document someone has to read by hand.

It isn't locked to the document types it ships with. Each type is a small parser module, and a dispatcher routes every document to the right one. To support a new document, add a parser. The detection flow, the output format, and the core pipeline stay the same.

## How It Works

Docket runs each upload through four stages.

**1. File type detection**
Reads the file's actual content instead of trusting its extension, so a renamed or mislabeled file is still handled correctly. Empty, unreadable, and unsupported files are caught here with a clear error rather than failing deeper in the pipeline.

**2. Text extraction**
Works page by page, since a single PDF can mix text-based and scanned pages. Pages with a real text layer are read directly with pdfplumber. Pages without one are rendered as images and run through PaddleOCR. Image uploads go straight to OCR. Scanned and mixed documents go through the same flow with no extra steps.

**3. Document type detection**
Searches the extracted text for keywords unique to each supported document type and returns a type label.

**4. Parsing**
Routes the text to the matching parser, which returns the document's fields along with any warnings. If an expected field can't be found, the response includes a warning for it instead of quietly leaving it out.

## Supported Documents

| Document | Extraction approach |
| --- | --- |
| Emirates ID | MRZ parsing, plus a front-page lookup for the national ID number |
| Passport | MRZ parsing |
| Title deed | Label-based extraction |
| Listing form | Position-based extraction |

## Parsing Techniques

There's no single extraction method that works for every document, so each parser uses whichever technique its layout makes reliable.

- **MRZ parsing (Emirates ID, passport):** These documents carry a machine-readable zone with a standardized format, so the fields can be decoded from that rather than from the visual layout. The parser handles both the 3-line format used on ID cards and the 2-line format used on passports. On the Emirates ID, the MRZ holds the card number rather than the national ID number printed on the front, so the national ID number is picked up separately from the front-page text.
- **Label-based extraction (title deed):** The document has clearly labeled fields, so the parser finds each label and reads the value that belongs to it.
- **Position-based extraction (listing form):** Fields sit side by side, and PDF text extraction can reorder them, which made label-based matching grab the wrong values. This parser uses word coordinates to work out which value belongs to which label.

## API

The backend exposes one endpoint.

```bash
curl -X POST http://localhost:8000/extract -F "file=@document.pdf"
```

Example response (sample data):

```json
{
  "doc_type": "passport",
  "fields": {
    "name": "RIMSHA ALI",
    "document_number": "AB1234567",
    "nationality": "PAK",
    "date_of_birth": "01/01/2000",
    "sex": "F",
    "expiry_date": "01/01/2030",
    "country": "PAK"
  },
  "warnings": []
}
```

If something goes wrong (unsupported file, unrecognized document, unreadable file), the response is `{"error": "message"}`.

## Extending Docket

Adding a new document type doesn't touch the core pipeline:

1. Write a parser module in `backend/parsers/` with a `parse(text, file_path)` function that returns `(fields, warnings)`. `build_warnings` in `utils/warnings_helper.py` flags any expected field that came back empty.
2. Add the keywords that identify the document type to `detect_doc_type` in `utils/doc_type_detector.py`.
3. Register the parser in the `PARSERS` dictionary in `main.py`.

## Project Structure

```
docket/
├── backend/
│   ├── main.py                  
│   ├── app.py                   
│   ├── Dockerfile
│   ├── parsers/                 
│   └── utils/
│       ├── file_type.py         
│       ├── extract_text.py      
│       ├── doc_type_detector.py 
│       ├── mrz_parser.py        
│       ├── json_builder.py      
│       └── warnings_helper.py   
├── frontend/                   
└── assets/                      
```

## Installation and Usage

Requires Python 3.11 or newer, Node.js, and a few GB of free RAM, since PaddleOCR is memory-hungry.

### 1. Clone the repository

```bash
git clone https://github.com/imanabshar/docket.git
cd docket
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The first run may take a while: PaddleOCR downloads its models the first time it's used.

You can also run a single file from the command line without the API: `python main.py path/to/document.pdf` prints the extracted fields and saves them as JSON in `output/`.

### 3. Set up the frontend

In a second terminal, from the repo root:

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

## Notes

- **Scanned pages are rendered at 150 DPI before OCR, not 300.** Rendering at 300 DPI produced images large enough to exhaust RAM during development and crash the process. 150 DPI costs a little accuracy in exchange for a pipeline that stays up.
- **CORS is an allowlist.** If you host the frontend somewhere new, add its origin to the allowed origins in `app.py`, or uploads from it will be blocked.  

## Built With

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
&nbsp;&nbsp;
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
&nbsp;&nbsp;
![pdfplumber](https://img.shields.io/badge/pdfplumber-4B8BBE?style=for-the-badge)
&nbsp;&nbsp;
![PaddleOCR](https://img.shields.io/badge/PaddleOCR-2932E1?style=for-the-badge)
&nbsp;&nbsp;
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
&nbsp;&nbsp;
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>
