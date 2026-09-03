from datetime import datetime
from mrz.checker.td3 import TD3CodeChecker
from mrz.checker.td1 import TD1CodeChecker

# decodes an mrz block(lines for passports/eid) into structured fields
def format_mrz_date(yymmdd, is_expiry=False):
    yy = int(yymmdd[0:2])
    mm = yymmdd[2:4]
    dd = yymmdd[4:6]
    if is_expiry:
        year = 2000 + yy
    else:
        current_yy = datetime.now().year % 100
        year = 2000 + yy if yy <= current_yy else 1900 + yy
    return f"{dd}/{mm}/{year}"


# td3 = passports(2 lines)
# td1 = id cards(3 lines)
# we pick the right checker based on how many lines the mrz block has
def parse_mrz(mrz_text):
    lines = [line.strip() for line in mrz_text.strip().split("\n") if line.strip()]
    mrz_block = "\n".join(lines)

    if len(lines) == 2:
        checker = TD3CodeChecker(mrz_block)
    elif len(lines) == 3:
        checker = TD1CodeChecker(mrz_block)
    else:
        raise ValueError(f"unrecognized mrz format, expected 2 or 3 lines, got {len(lines)}")

    fields = checker.fields()

    return {
        "name": f"{fields.name} {fields.surname}".strip(),
        "document_number": fields.document_number,
        "nationality": fields.nationality,
        "date_of_birth": format_mrz_date(fields.birth_date),
        "sex": fields.sex,
        "expiry_date": format_mrz_date(fields.expiry_date, is_expiry=True),
        "country": fields.country,
    }