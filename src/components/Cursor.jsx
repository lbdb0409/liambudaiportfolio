import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const circleRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const hover = useRef(false)
  const scale = useRef(1)
  const targetScale = useRef(1)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let raf
    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    const onOver = (e) => { if (e.target.closest('a,button,[data-hover]')) { hover.current = true; targetScale.current = 2.2 } }
    const onOut = (e) => { if (e.target.closest('a,button,[data-hover]')) { hover.current = false; targetScale.current = 1 } }
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1
      scale.current += (targetScale.current - scale.current) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px,${mouse.current.y - 4}px,0)`
        dotRef.current.style.opacity = hover.current ? '0' : '1'
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${pos.current.x - 20}px,${pos.current.y - 20}px,0) scale(${scale.current})`
        circleRef.current.style.borderColor = hover.current ? '#d4ff2b88' : '#d4ff2b33'
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0, width: 8, height: 8, borderRadius: '50%', background: '#d4ff2b', pointerEvents: 'none', zIndex: 10001, willChange: 'transform', transition: 'opacity 0.25s' }} />
      <div ref={circleRef} className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0, width: 40, height: 40, borderRadius: '50%', border: '1px solid #d4ff2b33', pointerEvents: 'none', zIndex: 10000, willChange: 'transform', transition: 'border-color 0.3s' }} />
    </>
  )
}
