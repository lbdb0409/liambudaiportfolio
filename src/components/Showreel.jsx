import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Showreel() {
  const ref = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vh, 100px) 0' }}>
      <div ref={inner} style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 24 }}>
          Showreel
        </span>

        {/* Video embed */}
        <div style={{
          width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden',
          background: '#0c0c0c', border: '1px solid #1a1a1a', position: 'relative',
        }}>
          <iframe
            src="https://www.youtube.com/embed/erj_T5wcTBI"
            title="Liam Budai Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </section>
  )
}
