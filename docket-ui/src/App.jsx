import { useState } from 'react'
import Sidebar from './components/Sidebar'
import UploadPanel from './components/UploadPanel'
import ResultPanel from './components/ResultPanel'
import { extractDocument } from './api/docket'
import './App.css'

function App() {
  const [darkTheme, setDarkTheme] = useState(false)
  const [file, setFile] = useState(null)
  const [resultFile, setResultFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleExtract = async () => {
    if (!file) return
    setResultFile(file)
    setResult(null)
    setLoading(true)
    try {
      const data = await extractDocument(file)
      setResult(data)
    } catch (err) {
      setResult({ error: 'Could not reach the server: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setResultFile(null)
    setResult(null)
  }

  return (
    <div className={`app-shell${darkTheme ? ' dark-theme' : ''}`}>
      <Sidebar darkTheme={darkTheme} onToggleTheme={() => setDarkTheme(!darkTheme)} />
      <main className="main-panel">
        {result ? (
          <ResultPanel
            file={resultFile}
            result={result}
            onReset={handleReset}
            onFileChange={handleFileChange}
            onExtract={handleExtract}
            loading={loading}
          />
        ) : (
          <UploadPanel
            onFileChange={handleFileChange}
            onExtract={handleExtract}
            hasFile={!!file}
            fileName={file?.name}
            loading={loading}
          />
        )}
      </main>
    </div>
  )
}

export default App