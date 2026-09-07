function ResultDisplay({ result }) {
  if (!result) return null

  return (
    <pre className="result">
      {JSON.stringify(result, null, 2)}
    </pre>
  )
}

export default ResultDisplay