import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  Menu, X, Globe, ChevronRight,
  MapPin, Mail, Phone, Clock, LineChart, ShieldCheck,
  Activity, Gauge, KeyRound
} from 'lucide-react'

const MEDIA = {
  logo: '/logo.png',
  heroVideo: 'https://player.vimeo.com/external/454609743.hd.mp4?s=dc19e13c2fd0d2be3bbdf25d17c49dfc5a5e3ba5&profile_id=175',
  heroPoster: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop',
}

const TICKER_ITEMS = [
  { label: 'Inventory Status', value: '6 vehicles available' },
  { label: 'New Allocations', value: 'GT3 RS confirmed' },
  { label: 'Avg Lease Rate', value: '3.1% APR' },
  { label: 'Acquisition Time', value: '< 48 hours' },
  { label: 'Global Network', value: '400+ verified dealers' },
  { label: 'Concierge SLA', value: 'Response < 24h' },
  { label: 'Recent Delivery', value: 'Ferrari 812 GTS Vancouver' },
  { label: 'Lease Terms', value: '12-84 months available' },
]

const CAPABILITIES = [
  {
    title: 'GLOBAL SOURCING',
    icon: Globe,
    summary: 'Off-market allocations secured before public release through tier-one relationships.',
    stats: [
      { label: 'Markets Active', value: 'Tokyo / Dubai / London' },
      { label: 'Average Acquisition', value: '< 48 hours' },
      { label: 'Network', value: '400+ verified dealers' },
      { label: 'Allocation Win Rate', value: '87% successful bids' },
    ],
  },
  {
    title: 'CAPITAL STRUCTURING',
    icon: LineChart,
    summary: 'Leasing and financing built for balance-sheet efficiency and tax optimization.',
    stats: [
      { label: 'Terms', value: '12-84 months' },
      { label: 'Structures', value: 'TRAC / Operating / Balloon' },
      { label: 'Average APR', value: 'As low as 3.1%' },
      { label: 'Decision Time', value: 'Same-day credit committee' },
    ],
  },
  {
    title: 'ASSET STEWARDSHIP',
    icon: ShieldCheck,
    summary: 'Lifecycle management, storage, insurance placement, and disposition strategy.',
    stats: [
      { label: 'Custody', value: 'Secured storage + GPS audit' },
      { label: 'Insurance', value: 'Collector-grade underwriting' },
      { label: 'Disposition', value: 'Auction / Private Treaty' },
      { label: 'Hold Period', value: '18.4 month average' },
    ],
  },
]

const INVENTORY_CARDS = [
  {
    id: '01',
    name: 'Porsche 911 GT3 RS',
    year: '2024',
    status: 'Allocation confirmed',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$4,200',
    specs: [
      { label: 'Powertrain', value: '4.0L NA / PDK' },
      { label: '0-60', value: '3.0s' },
      { label: 'Colorway', value: 'PTS Black Olive' },
      { label: 'Mileage', value: 'Delivery miles' },
    ],
  },
  {
    id: '02',
    name: 'Ferrari 812 GTS',
    year: '2023',
    status: 'Private treaty',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$6,800',
    specs: [
      { label: 'Power', value: '789 hp V12' },
      { label: '0-60', value: '2.9s' },
      { label: 'Provenance', value: 'Single owner / documented' },
      { label: 'Delivery', value: 'FOB Vancouver' },
    ],
  },
  {
    id: '03',
    name: 'Mercedes-Maybach GLS 600',
    year: '2024',
    status: 'Corporate allocation',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$2,900',
    specs: [
      { label: 'Seating', value: 'Executive 4+1' },
      { label: 'Packages', value: 'Night / Chauffeur' },
      { label: 'Lead Time', value: '< 14 days' },
      { label: 'Finance', value: 'Structure-ready' },
    ],
  },
  {
    id: '04',
    name: 'Lamborghini Huracan STO',
    year: '2024',
    status: 'Track-focused',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$5,400',
    specs: [
      { label: 'Power', value: '631 hp V10' },
      { label: '0-60', value: '2.8s' },
      { label: 'Mileage', value: '2,400 km' },
      { label: 'Condition', value: 'Paint protection applied' },
    ],
  },
  {
    id: '05',
    name: 'Range Rover Sport SVR',
    year: '2024',
    status: 'Available now',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$2,100',
    specs: [
      { label: 'Power', value: '575 hp V8 Supercharged' },
      { label: '0-60', value: '4.3s' },
      { label: 'Drive', value: 'AWD with terrain response' },
      { label: 'Interior', value: 'Full Windsor leather' },
    ],
  },
  {
    id: '06',
    name: 'BMW M8 Competition',
    year: '2024',
    status: 'Available now',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    price: 'Inquire',
    monthlyFrom: '$3,200',
    specs: [
      { label: 'Power', value: '617 hp Twin-Turbo V8' },
      { label: '0-60', value: '2.9s' },
      { label: 'Features', value: 'Carbon ceramic brakes' },
      { label: 'Packages', value: 'M Driver + Executive' },
    ],
  },
]

const SERVICES = [
  {
    id: '01',
    title: 'BESPOKE ACQUISITION',
    description: 'We secure rare allocations and off-market opportunities through our global dealer network. Every acquisition undergoes forensic due diligence, authentication, and condition assessment.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    features: [
      { label: 'Sourcing Network', value: '400+ verified dealers globally' },
      { label: 'Acquisition SLA', value: 'Under 48 hours for confirmed allocations' },
      { label: 'Due Diligence', value: 'VIN forensics, service history, provenance' },
      { label: 'Markets', value: 'North America, Europe, GCC, APAC' },
    ],
  },
  {
    id: '02',
    title: 'PORTFOLIO MANAGEMENT',
    description: 'Comprehensive lifecycle stewardship including custody, insurance placement, maintenance coordination, and performance tracking with quarterly reporting.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=1200&auto=format&fit=crop',
    features: [
      { label: 'Storage Solutions', value: 'Climate-controlled with GPS audit trail' },
      { label: 'Insurance', value: 'Collector-grade underwriting & placement' },
      { label: 'Maintenance', value: 'OEM-certified service coordination' },
      { label: 'Reporting', value: 'Quarterly valuations & performance metrics' },
    ],
  },
  {
    id: '03',
    title: 'EXIT STRATEGY & DISPOSITION',
    description: 'Strategic timing and placement for maximum value realization. We handle private treaty sales, auction coordination, and trade-in valuations.',
    icon: LineChart,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    features: [
      { label: 'Market Analysis', value: 'Real-time comparable sales data' },
      { label: 'Disposition Channels', value: 'Private treaty, auction, trade-in' },
      { label: 'Average Hold Period', value: '18.4 months' },
      { label: 'Exit Coordination', value: 'Full transaction & logistics support' },
    ],
  },
]

const TEAM = [
  { name: 'ALEXANDRA CHEN', title: 'FOUNDING PARTNER', id: 'PARTNER-01' },
  { name: 'MARCUS REID', title: 'HEAD OF ACQUISITIONS', id: 'PARTNER-02' },
  { name: 'SOPHIA LAURENT', title: 'CLIENT RELATIONS', id: 'PARTNER-03' },
]

const NAV_ITEMS = ['home', 'inventory', 'services', 'concierge', 'about', 'contact']

const getPageFromHash = () => {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  return NAV_ITEMS.includes(hash) ? hash : 'home'
}

const useReveal = () => {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return ref
}

const Reveal = ({ children, className = '' }) => {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

const SpecTable = ({ items }) => (
  <div className="spec-table">
    {items.map((item, idx) => (
      <div key={idx} className="spec-row">
        <span className="spec-label">{item.label}</span>
        <span className="spec-value">{item.value}</span>
      </div>
    ))}
  </div>
)

const TickerBar = () => (
  <div className="ticker-bar">
    <div className="ticker-track">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
        <div
          key={`${item.label}-${idx}`}
          className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase"
        >
          <span className="opacity-60">{item.label}</span>
          <span className="font-semibold">{item.value}</span>
          <span className="ticker-separator">|</span>
        </div>
      ))}
    </div>
  </div>
)
function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const syncFromHash = () => setCurrentPage(getPageFromHash())
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const navigate = (page) => {
    setMobileMenuOpen(false)
    const targetHash = `#${page}`
    if (window.location.hash !== targetHash) {
      window.location.hash = page
    } else {
      setCurrentPage(page)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Utility Bar */}
      <div className="bg-black text-white py-3 px-6 lg:px-10 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-[0.16em] uppercase">
          <span className="font-medium">1168 W 48TH AVE, VANCOUVER, BC V6M 2N7</span>
          <div className="hidden md:flex items-center gap-10">
            <span className="font-medium">+1 (604) 555-0100</span>
            <span className="text-zinc-400 font-medium">By appointment only</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Tothemono home"
            >
              <img src={MEDIA.logo} alt="Tothemono" className="h-8 w-8 lg:h-10 lg:w-10" />
              <span className="text-base lg:text-xl font-bold tracking-[0.24em] text-zinc-900">TOTHEMONO</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  className={`text-xs tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap ${
                    currentPage === item ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <button
                onClick={() => navigate('concierge')}
                className="px-4 py-2.5 bg-black text-white uppercase tracking-[0.14em] text-xs font-semibold button-primary rounded-none whitespace-nowrap"
              >
                Book concierge
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-900 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
            <div className="p-12 pt-24 flex flex-col gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  className="text-left text-sm tracking-[0.18em] text-zinc-700 hover:text-zinc-900 transition-colors font-semibold uppercase"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => navigate('concierge')}
                className="mt-4 px-4 py-3 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none text-left"
              >
                Book concierge
              </button>
            </div>
          </div>
        </div>
      )}

      <TickerBar />

      <main className="page-transition">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'inventory' && <InventoryPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'concierge' && <ConciergePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}

function HomePage({ onNavigate }) {
  const [parallax, setParallax] = useState(0)

  useEffect(() => {
    const handleScroll = () => setParallax(window.scrollY * 0.12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center grid-surface bg-black text-white overflow-hidden">
        <video
          className="hero-video parallax"
          autoPlay
          muted
          loop
          playsInline
          poster={MEDIA.heroPoster}
          style={{ transform: `translateY(${parallax * 0.08}px)` }}
        >
          <source src={MEDIA.heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 flex flex-col gap-12">
            <Reveal>
              <p className="text-sm tracking-[0.24em] uppercase text-zinc-300 font-medium mb-4">
                Automotive asset curation
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.92] tracking-tight">
                The Art
                <br />
                of Motion
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-xl text-zinc-200 max-w-3xl leading-relaxed">
                Tothemono Investments structures, acquires, and stewards vehicles as an asset class.
                We operate with the discipline of an investment bank and the discretion of a private office.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('inventory')}
                className="px-6 py-4 bg-white text-black uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none"
              >
                View collection
              </button>
              <button
                onClick={() => onNavigate('concierge')}
                className="px-6 py-4 text-white uppercase tracking-[0.16em] text-xs font-semibold button-ghost rounded-none"
              >
                Book concierge
              </button>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs uppercase tracking-[0.16em] text-zinc-300">
              <div className="flex items-center gap-2">
                <Activity size={16} strokeWidth={1} />
                Response under 24 hours
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={16} strokeWidth={1} />
                Allocation win rate 87%
              </div>
              <div className="flex items-center gap-2">
                <KeyRound size={16} strokeWidth={1} />
                Delivery-ready structures
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Spec */}
      <section className="grid-surface bg-white py-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid gap-10">
          <Reveal>
            <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-4">
              Welcome to Tothemono
            </h2>
            <p className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900">
              We build performance-grade automotive portfolios for principals and family offices who expect certainty,
              speed, and silence.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl text-zinc-600 max-w-4xl leading-relaxed">
              From first allocation to final disposition, every vehicle is treated as an asset with a measurable return.
              We operate across sourcing, capital structuring, insurance placement, storage, and exit, so nothing is
              left to interpretation.
            </p>
          </Reveal>
          <Reveal>
            <SpecTable
              items={[
                { label: 'Off-market pipeline', value: '400+ verified dealers' },
                { label: 'Acquisition SLA', value: 'Under 48 hours' },
                { label: 'Concierge desk', value: 'Response under 24h' },
                { label: 'Geo coverage', value: 'North America / EU / GCC / APAC' },
              ]}
            />
          </Reveal>
        </div>
      </section>
      {/* Capabilities */}
      <section className="grid-surface bg-zinc-50 border-y border-zinc-200 py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">
                  Capabilities
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                  Engineered for allocations, liquidity, and lifecycle certainty.
                </h3>
              </div>
              <div className="tech-data text-right md:text-left">
                ALLOCATION DESK / FINANCE / STEWARDSHIP / EXIT
              </div>
            </div>
          </Reveal>
          <div className="service-grid">
            {CAPABILITIES.map((capability, idx) => {
              const Icon = capability.icon
              return (
                <Reveal key={capability.title} className="h-full">
                  <div className="service-card h-full grid-surface">
                    <div className="flex items-center justify-between mb-6">
                      <Icon size={36} strokeWidth={1} className="text-zinc-900" />
                      <span className="tech-data">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h4 className="text-sm tracking-[0.18em] uppercase text-zinc-700 font-semibold mb-3">
                      {capability.title}
                    </h4>
                    <p className="text-base text-zinc-600 leading-relaxed mb-6">
                      {capability.summary}
                    </p>
                    <SpecTable items={capability.stats} />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inventory preview */}
      <section className="grid-surface bg-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">
                  Collection dossiers
                </p>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight">Ready to transact.</h3>
              </div>
              <button
                onClick={() => onNavigate('inventory')}
                className="px-6 py-4 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none inline-flex items-center gap-2"
              >
                View all
                <ChevronRight size={16} strokeWidth={1} />
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INVENTORY_CARDS.slice(0, 3).map((car) => (
              <Reveal key={car.id}>
                <div className="border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  {/* Vehicle Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2">
                      <span className="tech-data text-zinc-900">{car.id}</span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xl font-semibold leading-tight mb-1">{car.name}</p>
                      <p className="text-sm text-zinc-500">Model Year {car.year}</p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-zinc-200 pt-3">
                      <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">From</span>
                      <span className="text-lg font-semibold">{car.monthlyFrom}/mo</span>
                    </div>

                    <SpecTable items={car.specs} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operational layer */}
      <section className="grid-surface bg-zinc-50 border-y border-zinc-200 py-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold">
              Operational telemetry
            </h3>
          </Reveal>
          <Reveal>
            <SpecTable
              items={[
                { label: 'Due diligence', value: 'Forensic VIN, service, and provenance review' },
                { label: 'Logistics', value: 'Enclosed transport with live GPS and insurance' },
                { label: 'Storage', value: 'Climate-controlled custody with quarterly audit' },
                { label: 'Exit strategies', value: 'Auction, private treaty, or trade-in modeling' },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}

function InventoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filters = ['All', 'Supercar', 'SUV', 'Luxury', 'Performance']

  const getVehicleCategory = (car) => {
    const name = car.name.toLowerCase()
    if (name.includes('porsche') || name.includes('ferrari') || name.includes('lamborghini')) return 'Supercar'
    if (name.includes('maybach') || name.includes('range rover')) return 'SUV'
    if (name.includes('bmw')) return 'Performance'
    return 'Luxury'
  }

  const filteredCars = selectedFilter === 'All'
    ? INVENTORY_CARDS
    : INVENTORY_CARDS.filter(car => getVehicleCategory(car) === selectedFilter)

  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">Inventory</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Dossiers designed to transact quickly.
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-sm uppercase tracking-[0.14em]">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 border transition-all ${
                    selectedFilter === filter
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <Reveal key={car.id}>
              <div className="border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Vehicle Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2">
                    <span className="tech-data text-zinc-900">{car.id}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-lg font-semibold">{car.monthlyFrom}/mo</p>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xl font-semibold leading-tight mb-1">{car.name}</p>
                    <p className="text-sm text-zinc-500">Model Year {car.year}</p>
                  </div>

                  <SpecTable items={car.specs} />

                  <a
                    href={`mailto:investmenttothemono@gmail.com?subject=Inquiry: ${car.name} (${car.year})&body=Hello, I'm interested in learning more about the ${car.name} (ID: ${car.id}). Please provide pricing and availability details.`}
                    className="w-full mt-2 px-4 py-3 bg-black text-white uppercase tracking-[0.14em] text-xs font-semibold hover:bg-zinc-800 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Inquire for price
                    <ChevronRight size={14} strokeWidth={1} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesPage() {
  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <Reveal>
          <h1 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-4">
            Client Services
          </h1>
          <p className="text-4xl md:text-5xl font-semibold leading-tight">
            End-to-end automotive investment solutions.
          </p>
        </Reveal>
        <Reveal>
          <p className="text-lg md:text-xl text-zinc-600 max-w-4xl leading-relaxed">
            From initial acquisition to final disposition, we provide comprehensive services designed for principals
            who view vehicles as financial assets requiring institutional-grade stewardship.
          </p>
        </Reveal>

        <div className="space-y-12">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Reveal key={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start border border-zinc-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Service Image */}
                  <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-zinc-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover lg:absolute lg:inset-0 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2">
                      <span className="tech-data text-zinc-900">{service.id}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm p-2">
                      <Icon size={20} strokeWidth={1.5} className="text-white" />
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="lg:col-span-3 p-6 lg:p-8 space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                        {service.title}
                      </h2>
                      <p className="text-base text-zinc-600 leading-relaxed">{service.description}</p>
                    </div>

                    <SpecTable items={service.features} />

                    <a
                      href={`mailto:investmenttothemono@gmail.com?subject=Service Inquiry: ${service.title}&body=Hello, I'm interested in learning more about your ${service.title} services. Please provide additional details.`}
                      className="px-6 py-4 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none inline-flex items-center gap-2"
                    >
                      Request consultation
                      <ChevronRight size={14} strokeWidth={1} />
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Call to Action */}
        <Reveal>
          <div className="border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 lg:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to build your automotive portfolio?
            </h3>
            <p className="text-base text-zinc-600 mb-6 max-w-2xl mx-auto">
              Schedule a confidential consultation to discuss your investment objectives and allocation strategy.
            </p>
            <a
              href="mailto:investmenttothemono@gmail.com?subject=Portfolio Consultation Request&body=Hello, I would like to schedule a consultation to discuss automotive investment opportunities."
              className="px-8 py-4 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none inline-flex items-center gap-2"
            >
              Schedule consultation
              <ChevronRight size={14} strokeWidth={1} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ConciergePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 500)
  }

  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <Reveal>
          <h1 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold text-center">
            Concierge service
          </h1>
          <p className="text-4xl font-semibold text-center leading-tight">
            A dedicated desk for principals, available on demand.
          </p>
        </Reveal>
        <Reveal>
          <p className="text-center text-base text-zinc-600 leading-relaxed">
            Submit your request and a member of our team will contact you within 24 hours to align on allocation,
            structure, and timeline. All inquiries are confidential.
          </p>
        </Reveal>

        {submitted && (
          <div className="border border-zinc-300 bg-white px-6 py-4 text-sm text-zinc-700">
            Request received. Concierge will respond within one business day with next steps.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm tracking-[0.14em] uppercase text-zinc-600 font-semibold mb-3">
              Full name
            </label>
            <input
              type="text"
              required
              className="w-full border-0 border-b border-zinc-300 bg-transparent pb-3 focus:outline-none focus:border-zinc-900 transition-colors text-base font-medium"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm tracking-[0.14em] uppercase text-zinc-600 font-semibold mb-3">
              Email address
            </label>
            <input
              type="email"
              required
              className="w-full border-0 border-b border-zinc-300 bg-transparent pb-3 focus:outline-none focus:border-zinc-900 transition-colors text-base font-medium"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm tracking-[0.14em] uppercase text-zinc-600 font-semibold mb-3">
                Phone number
              </label>
              <input
                type="tel"
                required
                className="w-full border-0 border-b border-zinc-300 bg-transparent pb-3 focus:outline-none focus:border-zinc-900 transition-colors text-base font-medium"
                placeholder="+1 (604) 555-0100"
              />
            </div>
            <div>
              <label className="block text-sm tracking-[0.14em] uppercase text-zinc-600 font-semibold mb-3">
                Desired vehicle
              </label>
              <select className="w-full border-0 border-b border-zinc-300 bg-transparent pb-3 focus:outline-none focus:border-zinc-900 transition-colors text-base font-medium">
                <option>Select category</option>
                <option>Vintage Classics</option>
                <option>Modern Supercars</option>
                <option>Executive Fleets</option>
                <option>Custom Specification</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm tracking-[0.14em] uppercase text-zinc-600 font-semibold mb-3">
              Requirements
            </label>
            <textarea
              rows="5"
              className="w-full border-0 border-b border-zinc-300 bg-transparent pb-3 focus:outline-none focus:border-zinc-900 transition-colors resize-none text-base font-medium"
              placeholder="Describe your acquisition criteria..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none mt-4"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Request consultation'}
          </button>
        </form>

        <div className="pt-10 border-t border-zinc-200 tech-data text-center">
          RESPONSE TIME: UNDER 24 HOURS / CONFIDENTIALITY: GUARANTEED / CHANNEL: ENCRYPTED
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <Reveal>
          <h1 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-4">
            The philosophy
          </h1>
          <p className="text-4xl md:text-5xl font-semibold leading-tight">
            Investment discipline, automotive obsession, and zero noise.
          </p>
        </Reveal>

        <Reveal>
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
            Founded in Vancouver, we serve clients who view vehicles as a statement of intent and a measurable asset.
            We remove friction: sourcing, structuring, delivery, custody, and exit are run as a single controlled process.
          </p>
        </Reveal>

        <Reveal>
          <SpecTable
            items={[
              { label: 'Founded', value: 'Vancouver, British Columbia' },
              { label: 'Coverage', value: 'North America, Europe, GCC, APAC' },
              { label: 'Approach', value: 'Allocation-first, finance-backed' },
              { label: 'Engagements', value: 'Bespoke, by appointment only' },
            ]}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <Reveal key={member.id}>
              <div className="border border-zinc-200 bg-white p-6 flex flex-col gap-3">
                <span className="tech-data">{member.id}</span>
                <h3 className="text-lg font-semibold tracking-[0.12em] uppercase">{member.name}</h3>
                <p className="text-sm text-zinc-600 tracking-[0.12em] uppercase">{member.title}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Twenty-year track record in acquisitions, finance, and private client advisory.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <Reveal>
          <h1 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-4">
            Contact
          </h1>
          <p className="text-4xl md:text-5xl font-semibold leading-tight">
            Quiet, precise, and by appointment only.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={20} strokeWidth={1} className="text-zinc-500" />
                  <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-600 font-semibold">Address</h2>
                </div>
                <p className="text-base text-zinc-700 leading-relaxed">
                  1168 W 48th Ave
                  <br />
                  Vancouver, BC V6M 2N7
                  <br />
                  Canada
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={20} strokeWidth={1} className="text-zinc-500" />
                  <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-600 font-semibold">Email</h2>
                </div>
                <p className="text-base text-zinc-700 leading-relaxed">
                  <a href="mailto:investmenttothemono@gmail.com" className="hover:text-black transition-colors">
                    investmenttothemono@gmail.com
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={20} strokeWidth={1} className="text-zinc-500" />
                  <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-600 font-semibold">Phone</h2>
                </div>
                <p className="text-base text-zinc-700 leading-relaxed">
                  +1 (604) 555-0100
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} strokeWidth={1} className="text-zinc-500" />
                  <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-600 font-semibold">Hours</h2>
                </div>
                <p className="text-base text-zinc-700 leading-relaxed">
                  By appointment only
                  <br />
                  Monday - Saturday
                </p>
              </div>
            </Reveal>

            <Reveal>
              <SpecTable
                items={[
                  { label: 'Coordinates', value: '49.2237 N / 123.1636 W' },
                  { label: 'Access', value: 'Private showroom / controlled entry' },
                  { label: 'Parking', value: 'On-premise, reserved on confirmation' },
                  { label: 'Response', value: 'Under 24 hours' },
                ]}
              />
            </Reveal>

            <Reveal>
              <div className="flex items-center gap-4 text-sm uppercase tracking-[0.16em]">
                <a
                  href="https://maps.google.com/?q=1168+W+48th+Ave,+Vancouver,+BC+V6M+2N7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-black text-white button-primary rounded-none inline-flex items-center gap-2"
                >
                  Open in maps
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
                <a
                  href="mailto:investmenttothemono@gmail.com"
                  className="px-5 py-3 button-ghost rounded-none inline-flex items-center gap-2"
                >
                  Email us
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="relative bg-zinc-100 min-h-[520px] overflow-hidden border border-zinc-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.7337!2d-123.1636!3d49.2237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0x4b0d9b6c14f55b1a!2s1168%20W%2048th%20Ave%2C%20Vancouver%2C%20BC%20V6M%202N7!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="520"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tothemono Investments Location"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const Footer = ({ navigate }) => (
  <footer className="bg-zinc-50 border-t border-zinc-200 py-20 px-6 lg:px-10">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">Location</h3>
          <p className="text-base leading-relaxed text-zinc-600">
            1168 W 48th Ave
            <br />
            Vancouver, BC V6M 2N7
          </p>
        </div>
        <div>
          <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">Contact</h3>
          <p className="text-base leading-relaxed text-zinc-600">
            <a href="mailto:investmenttothemono@gmail.com" className="hover:text-black transition-colors">
              investmenttothemono@gmail.com
            </a>
            <br />
            +1 (604) 555-0100
          </p>
        </div>
        <div>
          <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">Hours</h3>
          <p className="text-base leading-relaxed text-zinc-600">
            By appointment only
            <br />
            Monday - Saturday
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold">Inquiries</h3>
          <button
            onClick={() => navigate('concierge')}
            className="text-base text-zinc-700 hover:text-black transition-colors inline-flex items-center gap-2"
          >
            Book concierge
            <ChevronRight size={14} strokeWidth={1} />
          </button>
        </div>
      </div>
      <div className="pt-6 border-t border-zinc-200 text-center">
        <p className="text-xs text-zinc-500 tracking-[0.16em]">
          (c) 2024 Tothemono Investments Ltd. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default App
