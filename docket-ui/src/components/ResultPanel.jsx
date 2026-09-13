import { useState } from 'react'
import DocPreview from './DocPreview'
import Composer from './Composer'

function ResultPanel({ file, result, onReset, onFileChange, onExtract, loading }) {
  const [showRaw, setShowRaw] = useState(false)
  const [copied, setCopied] = useState(false)
  const [nextFile, setNextFile] = useState(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(result.fields, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleNextFilePick = (e) => {
    const picked = e.target.files[0]
    setNextFile(picked)
    onFileChange(e)
  }

  const handleSend = () => {
    if (nextFile) onExtract()
  }

  return (
    <div className="result-view-full">
      <div className="result-scroll">
        {!result.error && (
          <>
            <div className="result-header">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--success)" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
              <span className="result-filename">{file?.name}</span>
              {result.doc_type && <span className="doc-type-badge">{result.doc_type.replace('_', ' ')}</span>}
            </div>

            {result.warnings && result.warnings.length > 0 && (
              <ul className="result-warnings">
                {result.warnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
            )}

            <div className="result-body-full">
              <DocPreview file={file} />
              <div className="field-list-full">
                {Object.entries(result.fields || {}).map(([key, value]) => (
                  <div className="field-row" key={key}>
                    <span className="field-label">{key.replace(/_/g, ' ')}</span>
                    <span className="field-value">{value === null ? '\u2014' : String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="raw-json-toggle" onClick={() => setShowRaw(!showRaw)}>
              {showRaw ? 'Hide raw JSON' : 'View raw JSON'}
            </button>
            {showRaw && (
              <div className="raw-json-wrap">
                <pre className="raw-json">{JSON.stringify(result.fields, null, 2)}</pre>
                <button className="copy-btn" onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="result-followup">
        {result.error && (
          <div className="error-state">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <h2>Couldn't identify this document</h2>
              <p>{result.error}</p>
            </div>
          </div>
        )}
        <Composer
          placeholder="Drop another document to extract&hellip;"
          hasFile={!!nextFile}
          fileName={nextFile?.name}
          loading={loading}
          onFileChange={handleNextFilePick}
          onExtract={handleSend}
        />
      </div>
    </div>
  )
}

export default ResultPanel