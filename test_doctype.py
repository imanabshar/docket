from utils.extract_text import extract_text_from_mixed_pdf, extract_text_from_image
from utils.doc_type_detector import detect_doc_type

files = {
    "eid": "sample_docs/owner_eid.pdf",
    "passport": "sample_docs/owner_passport.jpeg",
    "title_deed": "sample_docs/title_deed.pdf",
    "listing_form": "sample_docs/listing_form.pdf",
    "ad_flyer": "sample_docs/ads_format.jpg",
}   

for expected, path in files.items():
    print(f"processing {path}...")
    if path.endswith(".pdf"):
        text = extract_text_from_mixed_pdf(path)
    else:
        text = extract_text_from_image(path)

    detected = detect_doc_type(text)
    status = "correct" if detected == expected else "wrong"
    print(f"{status}: expected={expected} detected={detected}")