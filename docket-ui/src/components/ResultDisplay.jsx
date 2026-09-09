function ResultDisplay({ result }) {
  if (!result) return null

  if (result.error) {
    return <p className="result-error">{result.error}</p>
  }

  return (
    <div className="result">
      {result.warnings && result.warnings.length > 0 && (
        <ul className="result-warnings">
          {result.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}
      <pre>{JSON.stringify(result.fields, null, 2)}</pre>
    </div>
  )
}

export default ResultDisplay