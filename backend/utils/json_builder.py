import json

def build_json(data: dict) -> str:
    """Convert a flat field dict into a pretty-printed JSON string."""
    return json.dumps(data, indent=2, ensure_ascii=False)


def save_json(data: dict, output_path: str) -> None:
    """Build JSON from a field dict and write it to disk."""
    json_string = build_json(data)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(json_string)