import re
from utils.mrz_parser import parse_mrz

 
def find_mrz_block(text):
    lines = text.strip().split("\n")
    mrz_lines = [line for line in lines if re.fullmatch(r"[A-Z0-9<]+", line.strip())]
    return "\n".join(mrz_lines[-2:])


def parse(text, file_path=None):
    mrz_block = find_mrz_block(text)
    fields = parse_mrz(mrz_block)
    return fields