import { useEffect, useRef } from 'react'

export default function FilmGrain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 128
    canvas.height = 128
    const imageData = ctx.createImageData(128, 128)
    const buf32 = new Uint32Array(imageData.data.buffer)

    const grain = () => {
      for (let i = 0; i < buf32.length; i++) {
        const v = (Math.random() * 255) | 0
        buf32[i] = (255 << 24) | (v << 16) | (v << 8) | v
      }
      ctx.putImageData(imageData, 0, 0)
    }
    const id = setInterval(grain, 150)
    grain()
    return () => clearInterval(id)
  }, [])

  return (
    <canvas ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 9999, opacity: 0.012, mixBlendMode: 'overlay',
      }} />
  )
}
