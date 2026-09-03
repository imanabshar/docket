import re


# grabs the line right after a label
# title deed splits label and value onto separate lines, not label: value
def extract_after_label(text, label):
    lines = text.split("\n")
    for i, line in enumerate(lines):
        if label.lower() in line.lower():
            for next_line in lines[i + 1:]:
                if next_line.strip():
                    return next_line.strip()
    return None


def extract_owner_name(text):
    match = re.search(r"\(\d+\)\s*([A-Z\s]+)", text)
    return match.group(1).strip() if match else None


def parse(text):
    return {
        "issue_date": extract_after_label(text, "Issue Date"),
        "plot_no": extract_after_label(text, "Plot No"),
        "building_name": extract_after_label(text, "Building Name"),
        "property_no": extract_after_label(text, "Property No"),
        "area_sq_feet": extract_after_label(text, "Area Sq Feet"),
        "owner_name": extract_owner_name(text),
    }