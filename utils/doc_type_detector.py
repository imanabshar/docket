# determine the type of document(based on unique keyowrds in each document) from extracted text
# and if anything doesn't match falls back to ad_flyer(because flyer don't have specific keywords)
def detect_doc_type(text):
    text_lower = text.lower()

    if "resident identity card" in text_lower:
        return "eid"
    if "passport" in text_lower and "nationality" in text_lower:
        return "passport"
    if "title deed" in text_lower or "land department" in text_lower:
        return "title_deed"
    if "listing form" in text_lower:
        return "listing_form"
    return "ad_flyer"