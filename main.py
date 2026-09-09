import os
from utils.file_type import detect_file_type
from utils.extract_text import extract_text_from_mixed_pdf, extract_text_from_image
from utils.doc_type_detector import detect_doc_type
from utils.json_builder import save_json
from parsers import eid_parser, passport_parser, title_deed_parser, listing_form_parser


PARSERS = {
    "eid": eid_parser,
    "passport": passport_parser,
    "title_deed": title_deed_parser,
    "listing_form": listing_form_parser,
}


def process_document(file_path):
    kind = detect_file_type(file_path)

    if kind == "pdf":
        text = extract_text_from_mixed_pdf(file_path)
    elif kind == "image":
        text = extract_text_from_image(file_path)
    else:
        raise ValueError(f"unsupported file type: {file_path}")

    doc_type = detect_doc_type(text)
    if doc_type == "unknown":
        raise ValueError("could not identify the document type. Supported types: EID, passport, title deed, listing form")
    if doc_type not in PARSERS:
        raise ValueError(f"no parser available for doc type: {doc_type}")

    parser = PARSERS[doc_type]
    fields, warnings = parser.parse(text, file_path)
    return doc_type, fields, warnings

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    doc_type, fields, warnings = process_document(file_path)

    print(f"detected type: {doc_type}")
    print(fields)
    if warnings:
        print(f"warnings: {warnings}")

    os.makedirs("output", exist_ok=True)
    filename = os.path.splitext(os.path.basename(file_path))[0]
    output_path = f"output/{filename}_{doc_type}.json"
    save_json({"doc_type": doc_type, "fields": fields, "warnings": warnings}, output_path)
    print(f"saved to: {output_path}")