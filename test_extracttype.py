from utils.extract_text import extract_text_from_mixed_pdf, extract_text_from_image

print("--- text_based_test.pdf ---")
print(extract_text_from_mixed_pdf("sample_docs/text_based_test.pdf"))

print("--- scanned_based_test.pdf ---")
print(extract_text_from_mixed_pdf("sample_docs/scanned_based_test.pdf"))

print("--- test_pdf.pdf ---")
print(extract_text_from_mixed_pdf("sample_docs/test_pdf.pdf"))

print("--- test_image.png ---")
print(extract_text_from_image("sample_docs/test_image.png"))