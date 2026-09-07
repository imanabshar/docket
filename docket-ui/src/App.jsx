import { useState } from 'react'
import FileUploader from './components/FileUploader'
import ResultDisplay from './components/ResultDisplay'
import { extractDocument } from './api/docket'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null)
  }

  const handleExtract = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)

    try {
      const data = await extractDocument(file)
      setResult(data)
    } catch (err) {
      setResult({ error: 'Could not reach the server: ' + err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Docket</h1>
      <p>Upload a document to extract its fields.</p>

      <FileUploader
        onFileChange={handleFileChange}
        onExtract={handleExtract}
        hasFile={!!file}
        loading={loading}
      />

      <ResultDisplay result={result} />
    </div>
  )
}

export default App