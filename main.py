from utils.file_type import detect_file_type
from utils.extract_text import extract_text_from_mixed_pdf, extract_text_from_image
from utils.doc_type_detector import detect_doc_type


def process_document(file_path):
    kind = detect_file_type(file_path)

    if kind == "pdf":
        text = extract_text_from_mixed_pdf(file_path)
    elif kind == "image":
        text = extract_text_from_image(file_path)
    else:
        raise ValueError(f"unsupported file type: {file_path}")

    doc_type = detect_doc_type(text)
    return doc_type, text


if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    doc_type, text = process_document(file_path)
    print(f"detected type: {doc_type}")
    print(text)