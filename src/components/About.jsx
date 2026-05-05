import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const blocksRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const blocks = blocksRef.current.filter(Boolean)
    const total = blocks.length

    blocks.forEach((block) => {
      block.style.position = 'absolute'
      block.style.inset = '0'
      block.style.display = 'flex'
      block.style.alignItems = 'center'
      block.style.justifyContent = 'center'
      block.style.opacity = '0'
      block.style.transform = 'translateY(24px)'
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section, start: 'top top',
        end: () => `+=${window.innerHeight * total}`,
        pin: true, pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress, seg = 1 / total
          blocks.forEach((block, i) => {
            const start = i * seg, end = (i + 1) * seg
            const fadeIn = start + seg * 0.15, fadeOut = end - seg * 0.15
            let opacity = 0, y = 24
            if (i === total - 1) {
              if (p >= start) { const t = Math.min(1, (p - start) / (seg * 0.2)); opacity = t; y = 24 * (1 - t) }
            } else if (p >= start && p < fadeIn) {
              const t = (p - start) / (fadeIn - start); opacity = t; y = 24 * (1 - t)
            } else if (p >= fadeIn && p < fadeOut) { opacity = 1; y = 0 }
            else if (p >= fadeOut && p < end) { const t = (p - fadeOut) / (end - fadeOut); opacity = 1 - t; y = -16 * t }
            block.style.opacity = opacity; block.style.transform = `translateY(${y}px)`
          })
        },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section ref={sectionRef} id="about" style={{ height: '100vh', position: 'relative' }}>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 900, padding: '0 32px' }}>

          {/* Block 1: Photo + heading */}
          <div ref={(el) => { blocksRef.current[0] = el }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%', maxWidth: 600, aspectRatio: '16/9', borderRadius: 8,
                overflow: 'hidden', margin: '0 auto 28px',
              }}>
                <img src="/posters/liam-bts-color.jpg" alt="Liam Budai on set" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <p style={{ ...s, fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4ff2b', marginBottom: 20 }}>Who I Am</p>
              <h2 style={{ ...h, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(24px, 3.5vw, 44px)', lineHeight: 1.15, color: '#eee' }}>
                I've had an overactive imagination my whole life.
              </h2>
            </div>
          </div>

          {/* Block 2: The journey */}
          <div ref={(el) => { blocksRef.current[1] = el }}>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
              <p style={{ ...s, fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.8, color: '#ccc', fontWeight: 300 }}>
                I grew up glued to screens. YouTube, TV, anything with a story. From age 7 to 15 I attended every AFTRS school holiday program I could. Those rooms were where I first felt seen, other kids who wanted what I wanted. Through high school I taught myself VFX and compositing, not because I wanted to be a VFX artist, but because I wanted to make my friends look like they were flying or being chased by something that wasn't there. It was always about the story. My HSC major work was a short film. Straight after, I applied to Screen Production at AFTRS and got in.
              </p>
            </div>
          </div>

          {/* Block 3: Now + what makes me unique */}
          <div ref={(el) => { blocksRef.current[2] = el }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', maxWidth: 750, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{
                flexShrink: 0, width: 200, height: 280, borderRadius: 8, overflow: 'hidden',
              }}>
                <img src="/posters/beast-bts-selfie.jpg" alt="On the set of Beast" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 280, textAlign: 'left' }}>
                <p style={{ ...s, fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.8, color: '#bbb', fontWeight: 300, marginBottom: 20 }}>
                  For three years I've studied and honed my craft while working on sets of every size. Hollywood blockbusters, indie shorts, TVCs, music videos, documentaries. Each one has taught me something different. The big sets show me what real craft at scale looks like. The small sets teach me how to do more with less. I write comedy, horror, and drama. I make content for me first, with the hope it connects with an audience. I am my own toughest critic.
                </p>
                <div style={{ background: '#d4ff2b0a', borderRadius: 6, padding: '14px 20px' }}>
                  <p style={{ ...s, fontSize: 15, color: '#d4ff2b', fontWeight: 400 }}>
                    2025: Shot my first broadcast documentary. The Mic and the Gun, airing on SBS this year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: How I work */}
          <div ref={(el) => { blocksRef.current[3] = el }}>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              <p style={{ ...s, fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.8, color: '#ccc', fontWeight: 300 }}>
                I work best when the set is upbeat and collaborative. I want to hear every idea. If someone has a better solution, I want to know about it. My job as a director isn't to dictate. It's to create the space where everyone in the room can do their best work. That starts with who's in the room, I build crews and cast with perspectives wider than mine, because the stories I want to tell can't be told from one viewpoint. I'd rather take a better idea from a 2nd AC than push through a worse one of my own. I keep things fun without losing focus. I don't want people to feel intimidated. I want them to feel heard.
              </p>
            </div>
          </div>

          {/* Block 5: Pull quote */}
          <div ref={(el) => { blocksRef.current[4] = el }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 40, height: 2, background: '#d4ff2b', borderRadius: 1, margin: '0 auto 28px' }} />
              <p style={{ ...h, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1.15, color: '#d4ff2b' }}>
                "I don't see genre.<br />I see entertainment."
              </p>
              <div style={{ width: 40, height: 2, background: '#2baaff', borderRadius: 1, margin: '28px auto 0' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
