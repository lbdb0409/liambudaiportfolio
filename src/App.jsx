import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useLenis from './hooks/useLenis'
import FilmGrain from './components/FilmGrain'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Awards from './components/Awards'
import Credits from './components/Credits'
import Showreel from './components/Showreel'
import Projects from './components/Projects'
import Decadiam from './components/Decadiam'
import Vision from './components/Vision'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const curtainRef = useRef(null)
  const nameRef = useRef(null)
  useLenis()

  useEffect(() => {
    // Skip loader — show site immediately
    setLoaded(true)
    if (curtainRef.current) curtainRef.current.style.display = 'none'
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <div ref={curtainRef} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#080808',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: loaded ? 'none' : 'all',
      }}>
        <span ref={nameRef} style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '0.15em',
          color: '#d4ff2b', opacity: 0,
        }}>LB</span>
      </div>

      <FilmGrain />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Awards />
        <Credits />
        <Showreel />
        <Projects />
        <Decadiam />
        <Vision />
        <Contact />
      </main>
    </>
  )
}
