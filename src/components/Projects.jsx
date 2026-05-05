import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    tag: 'Short Film · 2025', role: 'Writer · Director', title: 'You Have It', accent: '#d4ff2b',
    img: '/posters/you have it promo.jpg',
    body: "Four friends. One last piece of pizza. A comedy about the absurdity of how seriously we treat things that don't matter. Getting this film to production meant going through four producers. There were moments it felt impossible. But I kept rebuilding, kept believing in the story. That persistence isn't separate from who I am as a director. It is who I am as a director.",
  },
  {
    tag: 'Award Winner', role: '1st Assistant Camera · Editor', title: 'Stuck In A Memory', accent: '#2baaff',
    img: '/posters/stuck in a memory.jpg',
    awards: 'Best Editing, Australian Youth Film Festival · Official Selection, Sydney Lift-Off Film Festival · Official Selection, Young Australian Film Festival',
    body: "I came onto this project in a craft role, and it gave me something invaluable. The experience of watching a film come together from the inside of the camera department. Understanding how the DoP and 1st AC communicate, how shot decisions get made under pressure. Being part of an award-winning production raised my standard for what good looks like.",
  },
  {
    tag: 'Broadcast Documentary · 2025', role: 'Director of Photography', title: 'The Mic and the Gun', accent: '#d4ff2b',
    img: '/posters/The Mic and The Gun.JPEG',
    body: "We made this as a uni assessment, then SBS picked it up for broadcast. That alone is the moment everything I'd been working toward clicked. Being trusted as DoP on a project that grew to that scale meant every set I'd worked on, every camera department I'd learned from, had built to this. Working without a network's resources forced me to make decisions faster and trust my instincts. Airing on SBS this year.",
  },
  {
    tag: 'Lionsgate · 2024/2025', role: 'Camera Attachment', title: 'Beast', accent: '#2baaff',
    img: '/posters/Beast.jpg',
    body: "The first large-scale production set I ever stepped onto. I was overwhelmed at first, but the camera crew made it clear from day one that this was a learning opportunity. They took the time to bring me up to speed and I got the hang of it quickly. It taught me how to read a professional set, how to be useful without being in the way, and what real craft at scale actually looks like.",
  },
]

function Project({ project }) {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.fromTo(infoRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <div ref={ref} style={{ padding: 'clamp(40px, 5vh, 80px) 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

        {/* Full-width image */}
        <div ref={imgRef} style={{
          width: '100%', aspectRatio: '2.2/1', borderRadius: 8,
          overflow: 'hidden', position: 'relative', marginBottom: 32,
        }}>
          <img src={project.img} alt={project.title} loading="lazy" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%, rgba(8,8,8,0.2) 100%)',
          }} />
          <div style={{ position: 'absolute', top: 20, left: 24 }}>
            <span style={{
              ...s, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: project.accent, background: 'rgba(8,8,8,0.5)', padding: '5px 12px',
              borderRadius: 4, backdropFilter: 'blur(8px)',
            }}>{project.tag}</span>
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
            <h3 style={{
              ...h, fontWeight: 800, textTransform: 'uppercase',
              fontSize: 'clamp(28px, 4.5vw, 56px)', lineHeight: 1, color: '#fff',
            }}>{project.title}</h3>
          </div>
        </div>

        {/* Info below */}
        <div ref={infoRef} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            ...s, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: project.accent, display: 'block', marginBottom: 20,
          }}>{project.role}</span>

          {project.awards && (
            <p style={{ ...s, fontSize: 14, lineHeight: 1.7, color: '#555', marginBottom: 16 }}>{project.awards}</p>
          )}

          <p style={{ ...s, fontSize: 17, lineHeight: 1.9, color: '#888' }}>{project.body}</p>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const s = { fontFamily: "'DM Sans', sans-serif" }
  const h = { fontFamily: "'Syne', sans-serif" }

  return (
    <section id="projects" style={{ padding: 'clamp(60px, 8vh, 100px) 0 0' }}>
      <div style={{ textAlign: 'center', maxWidth: 1100, margin: '0 auto', padding: '0 32px', marginBottom: 32 }}>
        <span style={{ ...s, fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: 12 }}>
          Selected Projects
        </span>
        <h2 style={{ ...h, fontWeight: 700, textTransform: 'uppercase', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1, color: '#eee' }}>
          Featured Work
        </h2>
      </div>
      {projects.map((p, i) => <Project key={i} project={p} />)}
    </section>
  )
}
