function FileUploader({ onFileChange, onExtract, hasFile, loading }) {
  return (
    <div className="uploader">
      <input type="file" onChange={onFileChange} />
      <button onClick={onExtract} disabled={!hasFile || loading}>
        {loading ? 'Extracting...' : 'Extract'}
      </button>
    </div>
  )
}

export default FileUploader