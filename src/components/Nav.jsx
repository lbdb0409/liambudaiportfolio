import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Credits', href: '#credits' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: document.body, start: '100px top', onEnter: () => setScrolled(true), onLeaveBack: () => setScrolled(false) })
      ;['hero','projects','credits','about','decadiam','vision','contact'].forEach(id => {
        const el = document.getElementById(id)
        if (el) ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center', onEnter: () => setActive(id), onEnterBack: () => setActive(id) })
      })
    })
    return () => ctx.revert()
  }, [])

  const go = (href) => { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '18px 48px' : '28px 48px',
      background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.7s',
    }}>
      <a href="#hero" onClick={(e) => { e.preventDefault(); go('#hero') }}
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: '#d4ff2b' }}>LB</a>
      <div style={{ display: 'flex', gap: 40 }}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: active === l.href.slice(1) ? '#d4ff2b' : '#555',
              transition: 'color 0.3s',
            }}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
