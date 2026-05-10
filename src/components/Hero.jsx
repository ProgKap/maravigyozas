import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHONE = '56985756785'
const WA_MSG = encodeURIComponent(
  'Hola, me gustaría hacer un pedido de Maravigyozas. ¿Me pueden informar sobre disponibilidad?'
)

const TITLE_WHITE = 'Maravi'
const TITLE_PINK  = 'Gyozas'

const MARQUEE_ITEMS = Array(8).fill(['Exquisitas', 'Deliciosas', 'MaraviGyozas'])

export default function Hero() {
  const heroRef    = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── background slow zoom on load ── */
      gsap.from('.hero-bg', {
        scale: 1.08,
        duration: 3,
        ease: 'power2.out',
      })

      /* ── ScrollTrigger parallax on background ── */
      gsap.to('.hero-bg', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        scale: 1.1,
        yPercent: 8,
      })

      /* ── decorative orbs fade in ── */
      gsap.from('.hero-orb', {
        opacity: 0,
        duration: 2.2,
        stagger: 0.4,
        ease: 'power2.out',
      })

      /* ── main entrance timeline ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.5 }, 0.4)

        .from('.h-word', {
          opacity: 0,
          y: 90,
          rotateX: -90,
          stagger: 0.18,
          duration: 0.75,
          ease: 'back.out(1.6)',
          transformOrigin: '50% 100%',
        }, 0.6)

        .from('.sub-word', {
          opacity: 0,
          y: 32,
          stagger: 0.14,
          duration: 0.55,
        }, 1.35)

        .from('.hero-cta', {
          opacity: 0,
          y: 22,
          stagger: 0.1,
          duration: 0.45,
        }, 1.75)

        .from('.hero-badge', {
          opacity: 0,
          scale: 0.6,
          duration: 0.45,
          ease: 'back.out(2.2)',
        }, 2.05)

      /* ── infinite marquee ── */
      if (marqueeRef.current) {
        const totalW = marqueeRef.current.scrollWidth / 2
        gsap.to(marqueeRef.current, {
          x: -totalW,
          duration: 22,
          ease: 'none',
          repeat: -1,
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── background image ── */}
      <img
        src="/gyozafoto1.jpg"
        alt=""
        aria-hidden="true"
        className="hero-bg absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* ── gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0608]/88 via-[#0d0608]/60 to-[#0d0608]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0608]/75 via-transparent to-transparent pointer-events-none" />

      {/* ── decorative orbs ── */}
      <div
        className="hero-orb absolute top-[15%] left-[5%] w-[38vw] h-[38vw] max-w-[520px] max-h-[520px] rounded-full bg-[#9B1C3A]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hero-orb absolute bottom-[20%] right-[8%] w-[26vw] h-[26vw] max-w-[360px] max-h-[360px] rounded-full bg-[#F2B8C6]/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6 pt-28 pb-36">

        {/* tag */}
        <div className="hero-tag inline-flex items-center gap-2 px-3 py-1.5 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2B8C6] block" />
          <span className="text-[11px] font-display font-semibold text-white/80 uppercase tracking-[0.22em]">
            Artesanal · Santiago, Chile
          </span>
        </div>

        {/* ── title ── */}
        <div style={{ perspective: '900px' }} className="overflow-hidden mb-2">
          <h1
            className="font-display font-black leading-none tracking-tight text-[clamp(3.6rem,10vw,7.5rem)]"
            aria-label="MaraviGyozas"
          >
            <span className="h-word inline-block shimmer-white">{TITLE_WHITE}</span>
            <span className="h-word inline-block shimmer-pink">{TITLE_PINK}</span>
          </h1>
        </div>

        {/* ── subtitle ── */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-12">
          <span className="sub-word font-display font-light text-[clamp(1.3rem,3.5vw,2.2rem)] text-white/60 italic tracking-wide">
            Exquisitas,
          </span>
          <span className="sub-word font-display font-light text-[clamp(1.3rem,3.5vw,2.2rem)] text-white/60 italic tracking-wide">
            deliciosas,
          </span>
          <span className="sub-word shimmer-subtle font-display font-black text-[clamp(1.3rem,3.5vw,2.2rem)] uppercase tracking-tight">
            MARAVIGYOZAS!
          </span>
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-14">
          <a
            href={`https://wa.me/${PHONE}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center justify-center px-8 py-3.5 bg-[#9B1C3A] text-[#FFF8F8] font-display font-semibold text-[0.95rem] rounded-2xl hover:bg-[#7d1630] active:scale-[0.98] transition-all duration-200 shadow-[0_10px_32px_rgba(155,28,58,0.55)]"
          >
            Hacer pedido
          </a>
          <a
            href="#menu"
            className="hero-cta inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/22 text-white font-display font-semibold text-[0.95rem] rounded-2xl hover:bg-white/18 active:scale-[0.98] transition-all duration-200"
          >
            Ver menu
          </a>
        </div>

        {/* ── badge ── */}
        <div className="hero-badge inline-flex items-center px-4 py-2 bg-[#D4A843] rounded-xl shadow-[0_4px_16px_rgba(212,168,67,0.4)]">
          <span className="text-[11px] font-display font-bold text-white tracking-[0.2em] uppercase">
            Desde 2014
          </span>
        </div>

      </div>

      {/* ── kinetic marquee band ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 py-3.5 bg-[#9B1C3A]/85 backdrop-blur-sm overflow-hidden border-t border-white/10">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {MARQUEE_ITEMS.map((group, gi) => (
                <span key={gi} className="flex items-center gap-5 pr-5 font-display font-black text-[0.75rem] uppercase tracking-[0.18em]">
                  <span className="text-white/85">{group[0]}</span>
                  <span className="text-[#F2B8C6] text-xs">✦</span>
                  <span className="text-white/85">{group[1]}</span>
                  <span className="text-[#F2B8C6] text-xs">✦</span>
                  <span className="text-[#D4A843]">{group[2]}</span>
                  <span className="text-[#F2B8C6] text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
