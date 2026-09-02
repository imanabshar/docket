from mrz.checker.td3 import TD3CodeChecker

# decodes an mrz block(2 lines for passports/eid) into structured fields
# td3 is the mrz format used by passports and similar id cards
def parse_mrz(mrz_text):
    lines = [line.strip() for line in mrz_text.strip().split("\n") if line.strip()]
    mrz_block = "\n".join(lines)

    checker = TD3CodeChecker(mrz_block)

    fields = checker.fields()

    return {
        "name": f"{fields.surname} {fields.name}".strip(),
        "document_number": fields.document_number,
        "nationality": fields.nationality,
        "date_of_birth": fields.birth_date,
        "sex": fields.sex,
        "expiry_date": fields.expiry_date,
        "country": fields.country,
    }