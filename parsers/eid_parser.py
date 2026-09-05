import re
from utils.mrz_parser import parse_mrz


def find_mrz_block(text):
    lines = text.strip().split("\n")
    mrz_lines = [line for line in lines if re.fullmatch(r"[A-Z0-9<]+", line.strip())]
    return "\n".join(mrz_lines[-3:])


# grabs the real id number from the front page, not from the mrz block
def extract_id_number(text):
    match = re.search(r"784-\d{4}-\d{7}-\d", text)
    return match.group(0) if match else None


def parse(text, file_path=None):
    mrz_block = find_mrz_block(text)
    fields = parse_mrz(mrz_block)

    fields["id_number"] = extract_id_number(text)
    fields["card_number"] = fields.pop("document_number")  

    return fields