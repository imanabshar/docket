from datetime import datetime
from mrz.checker.td3 import TD3CodeChecker

# decodes an mrz block(2 lines for passports/eid) into structured fields
# td3 is the mrz format used by passports and similar id cards
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


def parse_mrz(mrz_text):
    lines = [line.strip() for line in mrz_text.strip().split("\n") if line.strip()]
    mrz_block = "\n".join(lines)
    checker = TD3CodeChecker(mrz_block)
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