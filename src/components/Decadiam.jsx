import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Decadiam() {
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
    <section ref={ref} id="decadiam" style={{
      padding: 'clamp(80px, 10vh, 140px) 0', position: 'relative', overflow: 'hidden',
    }}>
      {/* BTS selfie as subtle background */}
      <img src="/posters/beast-bts-selfie.jpg" alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', filter: 'brightness(0.1) blur(3px)', pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.75)', pointerEvents: 'none' }} />

      <div ref={inner} style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <img src="/posters/decadiam-logo.png" alt="Decadiam Films" style={{
          width: 280, height: 'auto', margin: '0 auto 28px', display: 'block',
        }} />

        <h2 style={{
          ...h, fontWeight: 700, textTransform: 'uppercase',
          fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, marginBottom: 10,
          background: 'linear-gradient(90deg, #eee, #2baaff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Decadiam Films</h2>

        <span style={{ ...s, display: 'block', fontSize: 14, color: '#666', marginBottom: 'clamp(24px, 3vh, 40px)' }}>
          Founded 2022 · Sydney, Australia
        </span>

        <p style={{ ...s, fontSize: 18, lineHeight: 1.9, color: '#999', maxWidth: 540, margin: '0 auto', marginBottom: 'clamp(28px, 3vh, 48px)', textAlign: 'center' }}>
          I founded Decadiam in 2022 because I needed somewhere to put work that didn't have to ask permission to exist. It's the creative home for the stories I need to tell, but not just mine. The voices I want to amplify are the ones that haven't already had a hundred turns at the microphone; different cultures, lived experiences, perspectives the screen industry has historically left on the cutting-room floor. If you've got a story worth telling, I want to hear it. The room behind the camera should look like the country in front of it.
        </p>

        <a href="https://decadiamfilms.com" target="_blank" rel="noopener noreferrer"
          style={{
            ...s, display: 'inline-block', fontSize: 14, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#2baaff', padding: '14px 32px',
            border: '1px solid #2baaff33', borderRadius: 4, transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#2baaff'; e.currentTarget.style.color = '#080808'; e.currentTarget.style.borderColor = '#2baaff' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2baaff'; e.currentTarget.style.borderColor = '#2baaff33' }}>
          Visit Decadiam Films &rarr;
        </a>
      </div>
    </section>
  )
}
