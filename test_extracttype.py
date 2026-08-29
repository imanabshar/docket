from utils.extract_text import is_text_based_pdf

print(is_text_based_pdf("sample_docs/text_based_test.pdf"))    
print(is_text_based_pdf("sample_docs/scanned_based_test.pdf"))  
print(is_text_based_pdf("sample_docs/test_pdf.pdf"))             