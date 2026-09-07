const API_URL = 'http://localhost:8000/extract'

export async function extractDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  })

  return response.json()
}