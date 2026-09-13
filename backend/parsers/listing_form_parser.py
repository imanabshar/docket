import re
from utils.extract_text import extract_words_with_positions, extract_text_from_mixed_pdf
from utils.warnings_helper import build_warnings


EXPECTED_FIELDS = [
    "unit_no",
    "building_name",
    "community_name",
    "location",
    "bedrooms",
    "bathrooms",
    "landlord_name",
    "price_min",
    "price_max",
]


# groups words into rows based on top position(same line = close top values)
def group_words_into_rows(words, tolerance=3):
    rows = []
    for word in sorted(words, key=lambda w: w["top"]):
        placed = False
        for row in rows:
            if abs(row[0]["top"] - word["top"]) <= tolerance:
                row.append(word)
                placed = True
                break
        if not placed:
            rows.append([word])
    return rows


# splits a row into left/right half based on x position(two fields per row)
def split_row_left_right(row, midpoint_x):
    row_sorted = sorted(row, key=lambda w: w["x0"])
    left = [w["text"] for w in row_sorted if w["x0"] < midpoint_x]
    right = [w["text"] for w in row_sorted if w["x0"] >= midpoint_x]
    return " ".join(left), " ".join(right)


def strip_label(text, label):
    return re.sub(re.escape(label), "", text, flags=re.IGNORECASE).lstrip(": ").strip()


def extract_price_range(text):
    match = re.search(r"AED\s*([\d,]+)/?\s*-\s*AED\s*([\d,]+)", text)
    if match:
        return match.group(1), match.group(2)
    return None, None


def parse(text, file_path):
    words = extract_words_with_positions(file_path)
    rows = group_words_into_rows(words)

    all_x = [w["x0"] for w in words]
    midpoint_x = (min(all_x) + max(all_x)) / 2

    fields = {}
    for row in rows:
        left_text, right_text = split_row_left_right(row, midpoint_x)
        left_normalized = left_text.replace("’", "'")

        if "Unit No" in left_text:
            fields["unit_no"] = strip_label(left_text, "Unit No.:")
            fields["building_name"] = strip_label(right_text, "Building Name:")
        if "Community Name" in left_text:
            fields["community_name"] = strip_label(left_text, "Community Name:")
            fields["location"] = strip_label(right_text, "Location:")
        if "No. of Bedrooms" in left_text:
            fields["bedrooms"] = strip_label(left_text, "No. of Bedrooms:")
            fields["bathrooms"] = strip_label(right_text, "No. of Bathrooms:")
        if "Landlord's Full Name" in left_normalized:
            full_line = (left_text + " " + right_text).replace("’", "'")
            fields["landlord_name"] = strip_label(full_line, "Landlord's Full Name:")

    full_text = extract_text_from_mixed_pdf(file_path)
    price_min, price_max = extract_price_range(text)
    fields["price_min"] = price_min
    fields["price_max"] = price_max

    warnings = build_warnings(fields, EXPECTED_FIELDS)

    return fields, warnings