import filetype

def detect_file_type(file_path):
    kind = filetype.guess(file_path)
    if kind is None:
        return "unknown"
    if kind.mime == "application/pdf":
        return "pdf"
    if kind.mime.startswith("image/"):
        return "image"
    return "unknown"