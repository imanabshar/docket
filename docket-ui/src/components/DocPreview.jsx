import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

function DocPreview({ file }) {
  const canvasRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(null)
  const isPdf = file?.type === 'application/pdf'

  useEffect(() => {
    if (!file) return

    if (isPdf) {
      const render = async () => {
        const buffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1.3 })
        const canvas = canvasRef.current
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        await page.render({ canvasContext: ctx, viewport }).promise
      }
      render()
    } else {
      const url = URL.createObjectURL(file)
      setImgUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, isPdf])

  return (
    <div className="doc-preview">
      {isPdf ? (
        <canvas ref={canvasRef} className="doc-preview-canvas" />
      ) : (
        imgUrl && <img src={imgUrl} alt="Document preview" className="doc-preview-img" />
      )}
    </div>
  )
}

export default DocPreview