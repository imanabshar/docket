import pdfplumber

def is_text_based_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        first_page = pdf.pages[0]
        text = first_page.extract_text()
        return bool(text and text.strip())