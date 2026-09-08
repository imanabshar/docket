# determine the type of document(based on unique keywords in each document) from extracted text
# falls back to unknown if nothing matches
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
    return "unknown"