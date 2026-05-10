import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Instagram, Facebook } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PHONE = '56985756785'

const CONTACTS = [
  {
    id: 'ig',
    platform: 'Instagram',
    handle: '@gyozas_maravigyozas',
    desc: 'Fotos del proceso artesanal, novedades de la carta y lo que hay disponible hoy.',
    url: 'https://instagram.com/gyozas_maravigyozas',
    Icon: Instagram,
    iconColor: '#C13584',
    iconBg: 'rgba(193,53,132,0.12)',
  },
  {
    id: 'fb',
    platform: 'Facebook',
    handle: 'maravigyozas',
    desc: 'Publicaciones, eventos y promociones especiales de Maravigyozas.',
    url: 'https://facebook.com/maravigyozas',
    Icon: Facebook,
    iconColor: '#1877F2',
    iconBg: 'rgba(24,119,242,0.12)',
  },
  {
    id: 'wa1',
    platform: 'WhatsApp',
    handle: '+56 9 8575 6785',
    desc: 'Canal directo para pedidos, consultas y coordinar despacho. Respondemos rápido.',
    url: `https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, me gustaría hacer un pedido de Maravigyozas.')}`,
    Icon: MessageCircle,
    iconColor: '#25D366',
    iconBg: 'rgba(37,211,102,0.12)',
  },
  {
    id: 'wa2',
    platform: 'WhatsApp',
    handle: '+56 9 8575 6785',
    desc: 'Canal directo para pedidos, consultas y coordinar despacho. Respondemos rápido.',
    url: `https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, me gustaría hacer un pedido de Maravigyozas.')}`,
    Icon: MessageCircle,
    iconColor: '#25D366',
    iconBg: 'rgba(37,211,102,0.12)',
  },
]

function ContactCard({ item }) {
  const { platform, handle, desc, url, Icon, iconColor, iconBg } = item
  const cardRef      = useRef(null)
  const glowInnerRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    const glow = glowInnerRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    glow.style.background = `radial-gradient(200px at ${x}px ${y}px, rgba(155,28,58,0.15), transparent 70%)`
    glow.style.opacity    = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const glow = glowInnerRef.current
    if (!glow) return
    glow.style.opacity = '0'
  }, [])

  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card group relative flex flex-col gap-4 p-6 bg-[#170a0e] rounded-[1.75rem] border border-[#9B1C3A]/20 hover:shadow-[0_10px_36px_rgba(155,28,58,0.25)] hover:border-[#9B1C3A]/40 active:scale-[0.99] transition-all duration-300 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* inner spotlight glow */}
      <div
        ref={glowInnerRef}
        className="absolute inset-0 pointer-events-none opacity-0 z-0"
        style={{ transition: 'opacity 0.3s' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={18} style={{ color: iconColor }} strokeWidth={2} />
        </div>

        <div className="flex-1">
          <p className="font-display font-bold text-base text-white mb-0.5">{platform}</p>
          <p className="text-sm font-body text-[#F2B8C6] mb-2.5">{handle}</p>
          <p className="text-sm text-white/45 font-body leading-relaxed">{desc}</p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-display font-semibold text-[#F2B8C6]">
          Visitar
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  )
}

export default function SocialSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.social-heading', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        immediateRender: false,
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
      })

      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        immediateRender: false,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="redes" ref={sectionRef} className="py-24 px-4 md:px-6 bg-[#0d0608]">
      <div className="max-w-7xl mx-auto">

        <div className="social-heading mb-12">
          <p className="text-[11px] font-display font-semibold text-[#F2B8C6]/55 uppercase tracking-[0.25em] mb-3">
            — Redes y contacto
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.5rem)] tracking-tight text-white leading-none">
              Contacto.
            </h2>
            <p className="text-sm text-white/40 font-body max-w-[40ch] leading-relaxed">
              Escríbenos por WhatsApp para pedidos o síguenos en redes para no perderte nada.
            </p>
          </div>
        </div>

        {/* Instagram + Facebook */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <ContactCard item={CONTACTS[0]} />
          <ContactCard item={CONTACTS[1]} />
        </div>

        {/* WhatsApp x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ContactCard item={CONTACTS[2]} />
          <ContactCard item={CONTACTS[3]} />
        </div>

      </div>
    </section>
  )
}
