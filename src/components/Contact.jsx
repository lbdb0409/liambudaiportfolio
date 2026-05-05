import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'IMDB', href: 'https://www.imdb.com/name/nm16140699/' },
  { label: 'Showreel', href: 'https://youtu.be/erj_T5wcTBI' },
  { label: 'Decadiam Films', href: 'https://decadiamfilms.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/decadiamfilms/' },
]

export default function Contact() {
  const ref = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={ref} id="contact" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(100px, 14vh, 200px) 0', textAlign: 'center', position: 'relative',
    }}>
      <img src="/posters/footer-bg.jpg" alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center',
        filter: 'brightness(0.35) saturate(0.8)',
        pointerEvents: 'none',
      }} />
      {/* Gradient overlay — fades left side more to draw eye right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.3) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, #080808 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.8) 100%)',
      }} />

      <div ref={inner} style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 16 }}>
          Get In Touch
        </span>
        <h2 style={{
          ...h, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, marginBottom: 'clamp(40px, 5vh, 72px)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          background: 'linear-gradient(90deg, #d4ff2b, #2baaff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Let's work together.</h2>

        <a href="mailto:liambudai04@gmail.com" style={{
          ...s, display: 'block', fontSize: 22, color: '#eee', marginBottom: 10, transition: 'color 0.3s',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#d4ff2b'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#eee'}>
          liambudai04@gmail.com
        </a>
        <span style={{ ...s, display: 'block', fontSize: 17, color: '#555', marginBottom: 'clamp(40px, 5vh, 64px)' }}>0420 997 014</span>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28, marginBottom: 32 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ ...s, fontSize: 14, color: '#555', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2baaff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
              {l.label}
            </a>
          ))}
        </div>

        <a href="./camera-cv.pdf" target="_blank" style={{
          ...s, display: 'inline-block', fontSize: 14, color: '#d4ff2b',
          padding: '14px 32px', border: '1px solid #d4ff2b33', borderRadius: 4,
          marginBottom: 'clamp(60px, 8vh, 100px)', transition: 'all 0.3s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#d4ff2b'; e.currentTarget.style.color = '#080808'; e.currentTarget.style.borderColor = '#d4ff2b' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4ff2b'; e.currentTarget.style.borderColor = '#d4ff2b33' }}>
          Download Camera CV &rarr;
        </a>

        <div style={{ borderTop: '1px solid #151515', paddingTop: 24 }}>
          <span style={{ ...s, fontSize: 12, color: '#333' }}>
            &copy; 2026 Liam Budai &middot; Decadiam Films &middot; Sydney, Australia
          </span>
          <span style={{ ...s, display: 'block', marginTop: 10, fontSize: 11, color: '#555', letterSpacing: '0.05em' }}>
            Some of the content of this submission has been created with the help of AI.
          </span>
        </div>
      </div>
    </section>
  )
}
