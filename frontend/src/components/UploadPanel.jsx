import Composer from './Composer'

function UploadPanel({ onFileChange, onExtract, hasFile, fileName, loading }) {
  const fileExt = fileName ? fileName.split('.').pop().toUpperCase() : ''

  return (
    <div className="upload-view">
      <div className="upload-view-inner">
        {loading ? (
          <div className="processing-panel">
            <div className="file-card">
              <span className="file-card-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>
                </svg>
              </span>
              <div className="file-card-meta">
                <span className="file-card-name">{fileName}</span>
                <span className="file-card-type">{fileExt}</span>
              </div>
            </div>

            <div className="progress-state">
              <div className="progress-label">
                <span className="spinner" />
                Extracting data
              </div>
              <div className="progress-bar"><div className="progress-bar-fill" /></div>
              <div className="progress-status"><span className="pulse-dot" />Working&hellip;</div>
            </div>
          </div>
        ) : (
          <h1 className="hero-heading">Which document should I extract today?</h1>
        )}
      </div>

      <Composer
        placeholder="Drop a file, or click the clip to browse&hellip;"
        hasFile={hasFile}
        fileName={fileName}
        loading={loading}
        onFileChange={onFileChange}
        onExtract={onExtract}
      />
    </div>
  )
}

export default UploadPanel