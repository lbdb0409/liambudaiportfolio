import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2025', color: '#d4ff2b', items: ['Shot You Have It', 'Continued working up the camera department on professional sets'] },
  { year: '2026', color: '#2baaff', items: ['The Mic and the Gun airs on SBS', 'Graduate AFTRS'] },
  { year: '2027', color: '#d4ff2b', items: ['Begin production on Lease On Life, debut feature film'] },
  { year: 'Beyond', color: '#2baaff', items: ['Working DoP on major productions', 'Directing my own projects under Decadiam Films', 'Building a body of work that reflects my vision'] },
]

export default function Vision() {
  const ref = useRef(null)
  const intro = useRef(null)
  const nodes = useRef([])
  const q = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(intro.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: intro.current, start: 'top 85%' },
      })
      nodes.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.fromTo(q.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: q.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={ref} id="vision" style={{
      padding: 'clamp(80px, 10vh, 140px) 0',
      background: 'linear-gradient(180deg, #080808, #0a0a0e, #080808)',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vh, 48px)' }}>
          <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 12 }}>
            Where I'm Going
          </span>
          <h2 style={{ ...h, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1, color: '#eee' }}>
            The Roadmap
          </h2>
        </div>

        {/* Intro text — what I want and what I need to grow */}
        <div ref={intro} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', marginBottom: 'clamp(48px, 6vh, 80px)' }}>
          <p style={{ ...s, fontSize: 17, lineHeight: 1.9, color: '#888' }}>
            Right now I want everything. Writing, camera work, directing. I just love being on set and being surrounded by creatives. My focus is camera department work while I continue to develop as a director. There's a gap between knowing how to shoot a film and knowing how to lead one, closing that gap is what my graduation project is for. I want to come out of AFTRS with not just another short on my reel, but a sharper sense of how to direct at the level I'm aiming for.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
          textAlign: 'center', marginBottom: 'clamp(60px, 8vh, 100px)',
        }}>
          {milestones.map((m, i) => (
            <div key={i} ref={(el) => { nodes.current[i] = el }}
              style={{
                background: '#0c0c0c', borderRadius: 8, padding: 24,
                border: '1px solid #161616', borderTopColor: m.color, borderTopWidth: 2,
              }}>
              <span style={{ ...h, fontWeight: 700, textTransform: 'uppercase', display: 'block', fontSize: 26, color: m.color, marginBottom: 12 }}>
                {m.year}
              </span>
              {m.items.map((item, j) => (
                <p key={j} style={{ ...s, fontSize: 14, lineHeight: 1.8, color: '#777', marginBottom: 6 }}>{item}</p>
              ))}
            </div>
          ))}
        </div>

        <div ref={q} style={{ textAlign: 'center', padding: 'clamp(20px, 3vh, 40px) 0' }}>
          <div style={{ width: 40, height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #d4ff2b, #2baaff)', margin: '0 auto 24px' }} />
          <p style={{
            ...h, fontWeight: 700, textTransform: 'uppercase',
            fontSize: 'clamp(20px, 3vw, 40px)', lineHeight: 1.3, maxWidth: 700, margin: '0 auto',
            background: 'linear-gradient(90deg, #eee, #d4ff2b)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            "The goal has always been the same: to let the world see what goes on in my head."
          </p>
          <div style={{ width: 40, height: 2, borderRadius: 1, background: 'linear-gradient(90deg, #2baaff, #d4ff2b)', margin: '24px auto 0' }} />
        </div>
      </div>
    </section>
  )
}
