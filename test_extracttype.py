from utils.extract_text import is_text_based_pdf, extract_text_from_pdf, extract_text_from_image

if is_text_based_pdf("sample_docs/text_based_test.pdf"):
    print(extract_text_from_pdf("sample_docs/text_based_test.pdf"))

print(extract_text_from_image("sample_docs/test_image.png"))