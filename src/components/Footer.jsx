import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const FOOTER_MARQUEE = Array(6).fill(['Gyozas Tradicionales', 'Gyozas Gourmet', 'Empanaditas', 'Tequeños', 'MaraviGyozas']).flat()

export default function Footer() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    if (!marqueeRef.current) return
    const w    = marqueeRef.current.scrollWidth / 2
    const anim = gsap.to(marqueeRef.current, { x: -w, duration: 24, ease: 'none', repeat: -1 })
    return () => anim.kill()
  }, [])

  return (
    <footer className="bg-[#9B1C3A] pt-10 pb-8 overflow-hidden">
      {/* Kinetic marquee */}
      <div className="border-y border-white/12 py-4 mb-10 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center">
              {FOOTER_MARQUEE.map((item, i) => (
                <span key={i} className="flex items-center gap-5 pr-5 font-display font-black text-[0.72rem] uppercase tracking-[0.2em] text-white/70">
                  {item}
                  <span className="text-[#F2B8C6]/60 text-[0.6rem]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display font-black text-2xl tracking-tight text-white">Maravigyozas</p>
        <p className="text-xs text-white/35 font-body">© 2025 Maravigyozas · Santiago, Chile</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2B8C6] inline-block animate-pulse" />
          <span className="text-xs font-body text-white/35">Pedidos activos</span>
        </div>
      </div>
    </footer>
  )
}
