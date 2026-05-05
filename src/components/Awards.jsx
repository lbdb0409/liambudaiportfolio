import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Awards() {
  const ref = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={ref} id="awards" style={{
      padding: 'clamp(80px, 10vh, 140px) 0',
      background: 'linear-gradient(180deg, #080808, #0c0f05, #080808)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Stuck In A Memory poster as faded background */}
      <img src="/posters/stuck in a memory.jpg" alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', filter: 'brightness(0.12) blur(2px)', pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.7)', pointerEvents: 'none' }} />

      <div ref={inner} style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 28, display: 'block', marginBottom: 20 }}>🏆</span>
        <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4ff2b', display: 'block', marginBottom: 16 }}>
          Award Winner
        </span>
        <h2 style={{
          ...h, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1,
          fontSize: 'clamp(36px, 6vw, 72px)', marginBottom: 16,
          background: 'linear-gradient(90deg, #d4ff2b, #2baaff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Best Editing</h2>
        <p style={{ ...s, fontSize: 20, color: '#aaa', marginBottom: 6 }}>Australian Youth Film Festival</p>
        <p style={{ ...s, fontSize: 16, color: '#555' }}>Stuck In A Memory · 2024</p>
      </div>
    </section>
  )
}
