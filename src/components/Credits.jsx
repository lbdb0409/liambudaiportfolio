import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const credits = [
  { title: 'Beast', sub: 'Lionsgate / Deeper Water Film', year: '2024/2025', role: 'Camera Attachment', detail: 'Arri Alexa 35', dop: 'Thomaz Labanca', img: '/posters/Beast.jpg' },
  { title: 'Spaceballs 2', sub: 'Amazon MGM Studios', year: '2025', role: 'Video Split Assist', dop: 'Sean Walker', img: '/posters/Spaceballs 2.jpeg' },
  { title: 'The Mic and the Gun', sub: 'SBS', year: '2025', role: 'Director of Photography', detail: 'Blackmagic Pocket 6K', note: 'Airing on SBS 2026', featured: true, img: '/posters/The Mic and The Gun.JPEG' },
  { title: 'Shadow of Hope', sub: 'Documentary', year: '2025', role: '1st Assistant Camera', detail: 'BMPCC 6K / Sony FS5', img: '/posters/Shadow of hope still.jpg' },
  { title: 'Medicine', sub: 'Behani / Warner Music', year: '2024', role: '2nd Assistant Camera', detail: 'Canon C70', dop: 'Ben Develin', img: '/posters/Medicine.jpg' },
  { title: 'Islands in the Stream', sub: 'Karl Stefanovic & Keli Holiday', year: '2024', role: '2nd Assistant Camera', detail: 'Canon C70', dop: 'Ben Develin', img: '/posters/islands in the stream.jpg' },
  { title: 'Tofu Cat Litter TVC', sub: 'Commercial', year: '2024', role: '1st Assistant Camera', detail: 'Canon C70', dop: 'Benni Ling', img: '/posters/tofu cat litter.jpg' },
  { title: 'Movies at your House', sub: 'Music Video', year: '2024', role: 'B Camera Operator', detail: 'BMPCC 6K Pro', dop: 'Benni Ling', img: '/posters/Movies at your house.jpg' },
  { title: 'Leech', sub: 'Short Film', year: '2024', role: '1st Assistant Director', dop: 'Paul Mayora', img: '/posters/Leech.jpg' },
  { title: 'Stuck In A Memory', sub: 'Short Film · Award Winner', year: '2024', role: '1st AC · Editor', detail: 'BMPCC 6K Pro', dop: 'Dylan Slattery', img: '/posters/stuck in a memory.jpg' },
]

function CreditCard({ credit, index }) {
  const { title, sub, year, role, detail, dop, note, featured, img } = credit
  const num = String(index + 1).padStart(2, '0')
  const w = featured ? 'clamp(320px, 40vw, 480px)' : 'clamp(260px, 30vw, 360px)'
  const accent = featured ? '#d4ff2b' : '#2baaff'
  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <div data-hover style={{ flexShrink: 0, width: w, display: 'flex', flexDirection: 'column' }}>
      {/* Image frame */}
      <div style={{
        width: '100%', aspectRatio: '3/4', borderRadius: 4, position: 'relative', overflow: 'hidden',
        background: '#0c0c0c',
        border: featured ? '1px solid #d4ff2b15' : '1px solid #ffffff06',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accent}33`
          e.currentTarget.style.boxShadow = `0 20px 60px -15px ${accent}15`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = featured ? '#d4ff2b15' : '#ffffff06'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Actual image */}
        <img src={img} alt={title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          display: 'block',
        }} />

        {/* Overlay gradient for readability */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        }} />

        {/* Top info */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '14px 18px' }}>
          <span style={{ ...s, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{year}</span>
          {featured && (
            <span style={{ ...s, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4ff2b', background: 'rgba(0,0,0,0.5)', padding: '2px 10px', borderRadius: 2 }}>
              Broadcast
            </span>
          )}
        </div>

        {/* Bottom info over image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
          <span style={{ ...s, display: 'block', fontSize: 14, fontWeight: 500, color: accent }}>{role}</span>
          {detail && <span style={{ ...s, display: 'block', marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{detail}</span>}
        </div>
      </div>

      {/* Below frame */}
      <div style={{ paddingTop: 16 }}>
        <h3 style={{
          ...h, fontWeight: 700, textTransform: 'uppercase',
          fontSize: featured ? 24 : 20, lineHeight: 1.1,
          color: featured ? '#d4ff2b' : '#eee', marginBottom: 6,
        }}>{title}</h3>
        <span style={{ ...s, display: 'block', fontSize: 13, color: '#555' }}>{sub}</span>
        {dop && <span style={{ ...s, display: 'block', marginTop: 4, fontSize: 12, color: '#333' }}>DoP: {dop}</span>}
        {note && <span style={{ ...s, display: 'block', marginTop: 8, fontSize: 12, color: '#d4ff2b' }}>{note}</span>}
      </div>
    </div>
  )
}

export default function Credits() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 769px)', () => {
        const track = trackRef.current
        const totalScroll = track.scrollWidth - window.innerWidth
        gsap.to(track, {
          x: -totalScroll, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top top',
            end: () => `+=${totalScroll * 1.1}`,
            pin: true, scrub: 0.6, invalidateOnRefresh: true,
          },
        })
      })
      mm.add('(max-width: 768px)', () => {
        trackRef.current.querySelectorAll('.cc-wrap').forEach((card) => {
          gsap.fromTo(card, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={sectionRef} id="credits" style={{
      position: 'relative', overflow: 'hidden',
      paddingTop: 'clamp(80px, 10vh, 120px)', paddingBottom: 'clamp(60px, 8vh, 100px)',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 1000, margin: '0 auto', padding: '0 32px', marginBottom: 'clamp(48px, 6vh, 72px)' }}>
        <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 12 }}>
          Industry Credits
        </span>
        <h2 style={{ ...h, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1, color: '#eee' }}>
          On Set, On Screen
        </h2>
      </div>

      <div ref={trackRef} style={{
        display: 'flex', gap: 24, padding: '0 clamp(32px, 8vw, 120px)',
        flexDirection: 'row', width: 'max-content',
      }}>
        {credits.map((credit, i) => (
          <div key={i} className="cc-wrap">
            <CreditCard credit={credit} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
