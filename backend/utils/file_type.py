import filetype

def detect_file_type(file_path):
    kind = filetype.guess(file_path)
    if kind is None:
        return "unknown", None
    if kind.mime == "application/pdf":
        return "pdf", kind.mime
    if kind.mime.startswith("image/"):
        return "image", kind.mime
    return "unsupported", kind.mime