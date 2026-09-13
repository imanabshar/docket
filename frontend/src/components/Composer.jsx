import { useState, useRef } from 'react'

function Composer({ placeholder, hasFile, fileName, loading, onFileChange, onExtract }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange({ target: { files: e.dataTransfer.files } })
    }
  }

  return (
    <div
      className={`composer${dragging ? ' dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="composer-topline">
        {hasFile ? (
          <span className="composer-file-inline">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>
            </svg>
            {fileName}
          </span>
        ) : (
          <span className="composer-placeholder">{placeholder}</span>
        )}
      </div>

      <div className="composer-toolbar">
        <button
          className="clip-btn"
          onClick={() => inputRef.current.click()}
          disabled={loading}
          aria-label="Attach file"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.19 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        <input ref={inputRef} type="file" onChange={onFileChange} hidden />

        <button
          className="composer-send-btn"
          onClick={onExtract}
          disabled={!hasFile || loading}
          aria-label="Extract"
        >
          {loading ? (
            <span className="btn-spinner" />
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default Composer