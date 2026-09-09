def build_warnings(fields, expected_keys):
    return [f"{key} not found" for key in expected_keys if fields.get(key) is None]