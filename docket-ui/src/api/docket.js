const API_URL = 'http://localhost:8000/extract'

export async function extractDocument(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    return { error: data.detail }
  }

  return data
}