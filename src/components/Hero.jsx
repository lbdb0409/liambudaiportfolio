import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const ref = useRef(null)
  const l1 = useRef(null)
  const l2 = useRef(null)
  const tag = useRef(null)
  const meta = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo(imgRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' })
        .fromTo(l1.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=1')
        .fromTo(l2.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .fromTo(tag.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(meta.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')

      gsap.fromTo(imgRef.current, { y: 0, scale: 1 }, { y: 80, scale: 1.1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.fromTo(l1.current, { y: 0 }, { y: -60, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.fromTo(l2.current, { y: 0 }, { y: -100, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.fromTo(tag.current, { y: 0, opacity: 1 }, { y: -40, opacity: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: '20% top', end: '50% top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="hero" style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', overflow: 'hidden', position: 'relative',
    }}>
      {/* Background image */}
      <img
        ref={imgRef}
        src="/posters/liam-bts-bw.jpg"
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 30%',
          opacity: 0, filter: 'brightness(0.3)',
        }}
      />

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.6) 50%, #080808 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 ref={l1} style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: 'uppercase',
          fontSize: 'clamp(56px, 14vw, 200px)', lineHeight: 0.85, letterSpacing: '-0.04em',
          color: '#eee', opacity: 0,
        }}>LIAM</h1>
        <h1 ref={l2} style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: 'uppercase',
          fontSize: 'clamp(56px, 14vw, 200px)', lineHeight: 0.85, letterSpacing: '-0.04em',
          opacity: 0,
          background: 'linear-gradient(90deg, #d4ff2b, #2baaff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>BUDAI</h1>

        <div ref={tag} className="hero-tag" style={{
          marginTop: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: 0,
        }}>
          <div style={{ width: 40, height: 2, background: '#d4ff2b', borderRadius: 1 }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999',
          }}>
            Writer &middot; Director &middot; Cinematographer &middot; Producer &amp; Camera Assistant
          </span>
          <div style={{ width: 40, height: 2, background: '#2baaff', borderRadius: 1 }} />
        </div>
      </div>

      <div ref={meta} style={{
        position: 'absolute', bottom: 40, fontFamily: "'DM Sans', sans-serif",
        fontSize: 12, letterSpacing: '0.2em', color: '#555', opacity: 0, zIndex: 1,
      }}>
        SYDNEY &middot; AFTRS &middot; 2026
      </div>
    </section>
  )
}
