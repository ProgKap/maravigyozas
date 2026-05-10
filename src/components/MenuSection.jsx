import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PHONE = '56985756785'

const GYOZAS_TRADICIONALES = [
  {
    id: 'gt1',
    name: 'Pollo',
    desc: 'Pollo de campo condimentado con cebollín y jengibre fresco. Suave y equilibrado.',
    price: '7.000',
    img: 'https://picsum.photos/seed/chicken-gyoza-trad/400/300',
  },
  {
    id: 'gt2',
    name: 'Cerdo',
    desc: 'Chancho molido con ajo, soja y un toque de aceite de sésamo. El clásico que no puede faltar.',
    price: '7.000',
    img: 'https://picsum.photos/seed/pork-gyoza-trad/400/300',
  },
  {
    id: 'gt3',
    name: 'Camarón',
    desc: 'Camarón entero del Pacífico con hierbas finas y toque cítrico. Fresco y marino.',
    price: '7.000',
    img: 'https://picsum.photos/seed/shrimp-gyoza-trad/400/300',
  },
  {
    id: 'gt4',
    name: 'Veganas',
    desc: 'Col napa, zanahoria y shiitake salteados. Sin proteína animal, con todo el sabor.',
    price: '7.000',
    img: 'https://picsum.photos/seed/vegan-gyoza-trad/400/300',
  },
]

const GYOZAS_GOURMET = [
  {
    id: 'gg1',
    name: 'Champiñón',
    desc: 'Hongos silvestres salteados con aceite de trufa. Intenso y terroso.',
    img: 'https://picsum.photos/seed/mushroom-gyoza-gourmet/400/300',
  },
  {
    id: 'gg2',
    name: 'Pollo Spicy',
    desc: 'Pollo marinado en pasta gochujang con un toque picante que sorprende.',
    img: 'https://picsum.photos/seed/spicy-chicken-gyoza/400/300',
  },
  {
    id: 'gg3',
    name: 'Pollo Teriyaki',
    desc: 'Glaseado dulce-umami que carameliza con cada mordida. Irresistible.',
    img: 'https://picsum.photos/seed/teriyaki-chicken-gyoza/400/300',
  },
  {
    id: 'gg4',
    name: 'Camarón',
    desc: 'Camarón salteado con mantequilla clarificada y eneldo fresco.',
    img: 'https://picsum.photos/seed/shrimp-gourmet-gyoza/400/300',
  },
  {
    id: 'gg5',
    name: 'Pulpo',
    desc: 'Pulpo al mojo con paprika ahumada. Textura suave y sabor marino profundo.',
    img: 'https://picsum.photos/seed/octopus-gyoza-gourmet/400/300',
  },
  {
    id: 'gg6',
    name: 'Jaiba',
    desc: 'Jaiba fresca con limón de Pica y ciboulette. Delicado y cremoso.',
    img: 'https://picsum.photos/seed/crab-gourmet-gyoza/400/300',
  },
]

const EMPANADITAS = [
  {
    id: 'e1',
    name: 'Mechada Queso',
    desc: 'Carne mechada lentamente cocida con queso gouda fundido. Reconfortante y generosa.',
    img: 'https://picsum.photos/seed/beef-cheese-empanada/400/300',
  },
  {
    id: 'e2',
    name: 'Camarón Queso',
    desc: 'Camarón salteado con queso crema y pimentón ahumado. Mar y suavidad en cada bocado.',
    img: 'https://picsum.photos/seed/shrimp-cheese-empanada/400/300',
  },
  {
    id: 'e3',
    name: 'Queso',
    desc: 'Solo queso mantecoso fundido, crujiente por fuera y derretido por dentro. Simple y adictivo.',
    img: 'https://picsum.photos/seed/cheese-empanada-solo/400/300',
  },
]

const TEQUENOS = [
  {
    id: 'tq1',
    name: 'Ají de Gallina',
    desc: 'Rellenos con ají de gallina cremoso y queso. Sabor peruano en cada mordida.',
    img: 'https://picsum.photos/seed/aji-gallina-tequeno/400/300',
  },
  {
    id: 'tq2',
    name: 'Lomo Saltado',
    desc: 'Tiras de lomo saltado con cebolla morada. Crujientes por fuera, sabrosos por dentro.',
    img: 'https://picsum.photos/seed/lomo-saltado-tequeno/400/300',
  },
]

const MAIN_TABS = [
  { id: 'gyozas', label: 'Gyozas' },
  { id: 'empanaditas', label: 'Empanaditas' },
  { id: 'tequenos', label: 'Tequeños' },
]

function ProductCard({ item }) {
  const wrapperRef = useRef(null)
  const cardRef    = useRef(null)
  const glowRef    = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const wrapper = wrapperRef.current
    const card    = cardRef.current
    const glow    = glowRef.current
    if (!wrapper || !card || !glow) return

    const rect = wrapper.getBoundingClientRect()
    const x  = e.clientX - rect.left
    const y  = e.clientY - rect.top
    const px = (x / rect.width  - 0.5)
    const py = (y / rect.height - 0.5)

    wrapper.style.background = `radial-gradient(220px at ${x}px ${y}px, rgba(155,28,58,0.55), rgba(242,184,198,0.12) 60%, rgba(242,184,198,0.06))`

    glow.style.background = `radial-gradient(240px at ${x}px ${y}px, rgba(155,28,58,0.09), transparent 70%)`
    glow.style.opacity    = '1'

    card.style.transform  = `perspective(900px) rotateY(${px * 10}deg) rotateX(${py * -10}deg) translateZ(12px)`
    card.style.transition = 'transform 0.06s linear'
  }, [])

  const handleMouseLeave = useCallback(() => {
    const wrapper = wrapperRef.current
    const card    = cardRef.current
    const glow    = glowRef.current
    if (!wrapper || !card || !glow) return

    wrapper.style.background = 'rgba(242, 184, 198, 0.12)'
    glow.style.opacity       = '0'
    card.style.transform     = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    card.style.transition    = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="spotlight-wrapper menu-card p-px rounded-[1.75rem] cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative bg-[#FFF8F8] rounded-[calc(1.75rem-1px)] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* inner glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-0 z-10"
          style={{ transition: 'opacity 0.3s' }}
          aria-hidden="true"
        />

        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="font-display font-bold text-[0.95rem] text-[#1A1A1A] leading-snug">{item.name}</h4>
            {item.price && (
              <span className="font-display font-black text-sm text-[#9B1C3A] whitespace-nowrap pt-0.5">
                ${item.price}
              </span>
            )}
          </div>
          <p className="text-[0.82rem] text-[#1A1A1A]/52 leading-relaxed font-body">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

function SubsectionHeader({ title, subtitle }) {
  return (
    <div className="subsection-header mb-6">
      <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight text-[#1A1A1A]">{title}</h3>
      {subtitle && (
        <p className="text-sm text-[#9B1C3A]/70 font-body mt-1">{subtitle}</p>
      )}
    </div>
  )
}

function PriceTag({ price, units }) {
  return (
    <div className="inline-flex items-baseline gap-1.5 mb-8">
      <span className="font-display font-black text-3xl text-[#9B1C3A]">${price}</span>
      <span className="text-sm text-[#1A1A1A]/45 font-body">{units}</span>
    </div>
  )
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('gyozas')
  const sectionRef  = useRef(null)
  const contentRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-heading', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        immediateRender: false,
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'all',
      })

      gsap.from('.subsection-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        immediateRender: false,
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const cards = contentRef.current.querySelectorAll('.menu-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
    )
  }, [activeTab])

  return (
    <section id="menu" ref={sectionRef} className="py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="menu-heading mb-10">
          <p className="text-[11px] font-display font-semibold text-[#9B1C3A]/65 uppercase tracking-[0.25em] mb-3">
            — Nuestra carta
          </p>
          <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.5rem)] tracking-tight text-[#1A1A1A] leading-none mb-8">
            Elige tus<br />favoritas.
          </h2>

          {/* Main tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-[#FFF8F8] border border-[#F2B8C6]/35 rounded-2xl shadow-[0_2px_12px_rgba(155,28,58,0.06)]">
              {MAIN_TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-7 py-3 rounded-xl text-base font-display font-semibold transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-[#9B1C3A] text-[#FFF8F8] shadow-[0_2px_10px_rgba(155,28,58,0.32)]'
                      : 'text-[#1A1A1A]/45 hover:text-[#9B1C3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>

          {/* ── GYOZAS ── */}
          {activeTab === 'gyozas' && (
            <div className="space-y-14">

              {/* Tradicionales */}
              <div>
                <SubsectionHeader title="Gyozas Tradicionales" subtitle="25 Unidades" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {GYOZAS_TRADICIONALES.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Gourmet */}
              <div>
                <SubsectionHeader
                  title="Gyozas Gourmet"
                  subtitle="Todas van rellenas con queso crema"
                />
                <PriceTag price="9.500" units="25 unidades" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {GYOZAS_GOURMET.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── EMPANADITAS ── */}
          {activeTab === 'empanaditas' && (
            <div>
              <SubsectionHeader title="Empanaditas" />
              <PriceTag price="7.500" units="10 unidades" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {EMPANADITAS.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* ── TEQUEÑOS ── */}
          {activeTab === 'tequenos' && (
            <div>
              <SubsectionHeader title="Tequeños" />
              <PriceTag price="15.000" units="20 unidades" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                {TEQUENOS.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-14 pt-8 border-t border-[#F2B8C6]/30">
          <p className="text-sm text-[#1A1A1A]/45 font-body leading-relaxed">
            Pedidos vía WhatsApp · Despacho disponible en Santiago
          </p>
          <a
            href={`https://wa.me/${PHONE}?text=${encodeURIComponent(
              'Hola, me gustaría hacer un pedido. ¿Cuál es el menú disponible hoy?'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 bg-[#9B1C3A] text-[#FFF8F8] font-display font-semibold text-sm rounded-xl hover:bg-[#7d1630] active:scale-[0.98] transition-all duration-200 shadow-[0_6px_22px_rgba(155,28,58,0.28)] whitespace-nowrap"
          >
            <MessageCircle size={15} strokeWidth={2} />
            Hacer un pedido
          </a>
        </div>

      </div>
    </section>
  )
}
