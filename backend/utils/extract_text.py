import pdfplumber
import numpy as np
from paddleocr import PaddleOCR

ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", enable_mkldnn=False)


# extract text from a standalone image file using ocr
def extract_text_from_image(file_path):
    result = ocr_engine.ocr(file_path)
    texts = result[0]["rec_texts"]
    return "\n".join(texts)


# for scanned pdfs, we render each page as an image(because paddleocr can't read pdfs directly)
# we get an in-memory image from pdfplumber(not a file path), so we hand it to ocr as a numpy array
def ocr_pil_image(pil_image):
    img_array = np.array(pil_image)
    result = ocr_engine.ocr(img_array)
    texts = result[0]["rec_texts"]
    return "\n".join(texts)


# main entry point for any pdf(single page or multi page)
# checks each page one by one, text pages(text-based pdfs) go through pdfplumber directly
# pages with no text layer(scanned pdfs) get rendered as an image and sent through ocr
def extract_text_from_mixed_pdf(file_path):
    full_text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text and text.strip():
                full_text += text + "\n"
            else:
                page_image = page.to_image(resolution=150).original
                page_text = ocr_pil_image(page_image)
                full_text += page_text + "\n"
    return full_text


# gets every word on a pdf page along with its position
def extract_words_with_positions(file_path, page_number=0):
    with pdfplumber.open(file_path) as pdf:
        page = pdf.pages[page_number]
        return page.extract_words()