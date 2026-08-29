import pdfplumber
from paddleocr import PaddleOCR

ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", enable_mkldnn=False)

# opens the first page to check if a text layer exists
# true -> text-based pdf, false -> scanned pdf
def is_text_based_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        first_page = pdf.pages[0]
        text = first_page.extract_text()
        return bool(text and text.strip())


# extract text from text-based pdf(call this after is_text_based_pdf confirms true)
def extract_text_from_pdf(file_path):
    full_text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
    return full_text


# extract text from images using ocr
def extract_text_from_image(file_path):
    result = ocr_engine.ocr(file_path)
    texts = result[0]["rec_texts"]
    return "\n".join(texts)