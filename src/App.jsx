import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  Menu, X, Globe, ChevronRight,
  MapPin, Mail, Phone, Clock, LineChart, ShieldCheck,
  Activity, Gauge, KeyRound
} from 'lucide-react'

const MEDIA = {
  logo: '/logo.png',
  heroPoster: '/hero-poster.jpg',
}

const TICKER_ITEMS = [
  { label: 'Inventory', value: '6 vehicles ready to transact' },
  { label: 'Featured', value: 'GT3 RS allocation confirmed' },
  { label: 'Finance', value: 'Lease 12-84 months | from 3.1% APR' },
  { label: 'Concierge', value: 'Response under 24h' },
  { label: 'FX Desk', value: 'CNY to CAD / USD / EUR / GBP / AUD / JPY / SGD' },
  { label: 'FX Update', value: 'Quotes refresh every 30 seconds' },
  { label: 'Security', value: 'ID-verified counter, CCTV-monitored' },
  { label: 'Location', value: '1168 W 48th Ave, Vancouver — by appointment' },
  { label: 'Contact', value: '+1 (604) 674-6299' },
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
  {
    title: 'CURRENCY EXCHANGE DESK',
    icon: LineChart,
    summary: 'Live CNY and CAD desk with receipt-backed, appointment-based service.',
    stats: [
      { label: 'Pairs', value: 'CNY to CAD, USD, EUR, GBP, AUD, JPY, SGD' },
      { label: 'Refresh', value: 'Quotes every 30 seconds' },
      { label: 'Access', value: 'By appointment at Vancouver desk' },
      { label: 'Security', value: 'ID-verified, controlled counter' },
    ],
  },
]

const INVENTORY_CARDS = [
  {
    id: '01',
    name: 'Porsche Panamera Turbo',
    year: '2024',
    status: 'Allocation confirmed',
    image: '/car-01.jpg',
    price: 'Inquire',
    monthlyFrom: '$3,400',
    specs: [
      { label: 'Powertrain', value: '4.0L Twin-Turbo V8' },
      { label: '0-60', value: '3.0s' },
      { label: 'Generation', value: '2nd Gen (971)' },
      { label: 'Mileage', value: 'Delivery miles' },
    ],
  },
  {
    id: '02',
    name: 'Ferrari F8 Tributo',
    year: '2023',
    status: 'Private treaty',
    image: '/car-02.jpg',
    price: 'Inquire',
    monthlyFrom: '$5,800',
    specs: [
      { label: 'Power', value: '710 hp Twin-Turbo V8' },
      { label: '0-60', value: '2.9s' },
      { label: 'Provenance', value: 'Single owner / documented' },
      { label: 'Delivery', value: 'FOB Vancouver' },
    ],
  },
  {
    id: '03',
    name: 'Mercedes-AMG GT R Pro',
    year: '2024',
    status: 'Track-ready',
    image: '/car-03.jpg',
    price: 'Inquire',
    monthlyFrom: '$4,200',
    specs: [
      { label: 'Power', value: '577 hp Twin-Turbo V8' },
      { label: '0-60', value: '3.5s' },
      { label: 'Aero', value: 'Track Package' },
      { label: 'Finance', value: 'Structure-ready' },
    ],
  },
  {
    id: '04',
    name: 'Lamborghini Huracan STO',
    year: '2024',
    status: 'Track-focused',
    image: '/car-04.jpg',
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
    image: '/car-05.jpg',
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
    image: '/car-06.jpg',
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

const EXCHANGE_PAIRS = [
  { id: 'CNY-USD', base: 'CNY', target: 'USD', mid: 0.1412, history: [0.1401, 0.141, 0.1415, 0.141, 0.1408, 0.1412] },
  { id: 'CNY-CAD', base: 'CNY', target: 'CAD', mid: 0.1921, history: [0.191, 0.1915, 0.1922, 0.1919, 0.1912, 0.1921] },
  { id: 'CNY-EUR', base: 'CNY', target: 'EUR', mid: 0.1294, history: [0.128, 0.129, 0.1298, 0.129, 0.1292, 0.1294] },
  { id: 'CNY-GBP', base: 'CNY', target: 'GBP', mid: 0.1111, history: [0.1105, 0.111, 0.1114, 0.1112, 0.111, 0.1111] },
  { id: 'CNY-AUD', base: 'CNY', target: 'AUD', mid: 0.2156, history: [0.214, 0.2148, 0.2154, 0.2159, 0.2153, 0.2156] },
  { id: 'CAD-USD', base: 'CAD', target: 'USD', mid: 0.7425, history: [0.741, 0.7421, 0.7428, 0.7422, 0.7429, 0.7425] },
  { id: 'CAD-EUR', base: 'CAD', target: 'EUR', mid: 0.6789, history: [0.677, 0.678, 0.679, 0.6784, 0.6788, 0.6789] },
  { id: 'CAD-GBP', base: 'CAD', target: 'GBP', mid: 0.5862, history: [0.584, 0.585, 0.586, 0.5864, 0.5858, 0.5862] },
  { id: 'CAD-JPY', base: 'CAD', target: 'JPY', mid: 111.25, history: [110.8, 111.1, 111.4, 111.2, 111.0, 111.25] },
  { id: 'CAD-SGD', base: 'CAD', target: 'SGD', mid: 0.9823, history: [0.98, 0.9812, 0.982, 0.9828, 0.9821, 0.9823] },
]

const EXCHANGE_STORIES = [
  {
    title: 'Travel-ready cash in hours',
    copy: 'Reserve your destination currency before you board. Walk-in pickups in Vancouver with transparent pricing and receipt-level verification.',
    image: '/exchange-story-1.jpg',
    badge: 'Airports & hotels',
  },
  {
    title: 'Support family abroad with confidence',
    copy: 'Send CAD or CNY with real-time quotes, identity-verified processing, and clear settlement times for bank drafts or cash.',
    image: '/exchange-story-2.jpg',
    badge: 'Remittance',
  },
  {
    title: 'Students and tuition made simple',
    copy: 'Handle semester payments, housing deposits, or monthly living costs with compliant receipts and predictable settlement.',
    image: '/exchange-story-3.jpg',
    badge: 'Education',
  },
]

const SERVICES = [
  {
    id: '01',
    title: 'BESPOKE ACQUISITION',
    description: 'We secure rare allocations and off-market opportunities through our global dealer network. Every acquisition undergoes forensic due diligence, authentication, and condition assessment.',
    icon: Globe,
    image: '/car-04.jpg',
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
    image: '/service-02.jpg',
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
    image: '/service-03.jpg',
    features: [
      { label: 'Market Analysis', value: 'Real-time comparable sales data' },
      { label: 'Disposition Channels', value: 'Private treaty, auction, trade-in' },
      { label: 'Average Hold Period', value: '18.4 months' },
      { label: 'Exit Coordination', value: 'Full transaction & logistics support' },
    ],
  },
]

const TEAM = [
  {
    name: 'ALEXANDRA CHEN',
    title: 'FOUNDING PARTNER',
    id: 'PARTNER-01',
    bio: 'Former automotive finance director with 15 years structuring high-value leases. Specializes in cross-border transactions and allocation strategy.'
  },
  {
    name: 'MARCUS REID',
    title: 'HEAD OF ACQUISITIONS',
    id: 'PARTNER-02',
    bio: 'Collector and dealer network specialist. Built relationships with 400+ verified partners across North America, Europe, and the GCC.'
  },
  {
    name: 'SOPHIA LAURENT',
    title: 'CLIENT RELATIONS',
    id: 'PARTNER-03',
    bio: 'Private banking background with expertise in UHNW client service. Manages all concierge requests and ensures seamless delivery.'
  },
]

const NAV_ITEMS = ['home', 'currency', 'services', 'concierge', 'about', 'contact']

const getPageFromHash = () => {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace('#', '')
  if (hash === 'lease') return 'lease'
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
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [selectedLeaseVehicle, setSelectedLeaseVehicle] = useState(null)
  const servicesDropdownRef = useRef(null)
  const servicesTimeoutRef = useRef(null)

  useEffect(() => {
    const syncFromHash = () => setCurrentPage(getPageFromHash())
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    setServicesMenuOpen(true)
  }

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesMenuOpen(false), 150)
  }

  const navigate = (page, vehicleId = null) => {
    setMobileMenuOpen(false)
    setServicesMenuOpen(false)
    if (vehicleId) {
      setSelectedLeaseVehicle(vehicleId)
    } else if (page !== 'lease') {
      setSelectedLeaseVehicle(null)
    }
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
            <span className="font-medium">+1 (604) 674-6299</span>
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
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 relative">
              {NAV_ITEMS.map((item) => (
                item === 'services' ? (
                  <div
                    key={item}
                    className="relative"
                    ref={servicesDropdownRef}
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <button
                      onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                      className={`flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap ${
                        currentPage === 'services' || currentPage === 'lease' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {item}
                      <ChevronRight
                        size={14}
                        strokeWidth={1}
                        className={`transition-transform ${servicesMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                      />
                    </button>
                    {servicesMenuOpen && (
                      <div className="absolute left-0 mt-3 w-48 bg-white border border-zinc-200 shadow-xl z-30">
                        <button
                          onClick={() => navigate('services')}
                          className={`w-full text-left px-4 py-3 text-sm tracking-[0.12em] uppercase hover:bg-zinc-50 transition-colors ${currentPage === 'services' ? 'bg-zinc-50 font-semibold' : ''}`}
                        >
                          Services overview
                        </button>
                        <button
                          onClick={() => navigate('lease')}
                          className={`w-full text-left px-4 py-3 text-sm tracking-[0.12em] uppercase hover:bg-zinc-50 transition-colors ${currentPage === 'lease' ? 'bg-zinc-50 font-semibold' : ''}`}
                        >
                          Lease a vehicle
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item}
                    onClick={() => navigate(item)}
                    className={`text-xs tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap ${
                      currentPage === item ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    {item}
                  </button>
                )
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
            <div className="p-12 pt-24 flex flex-col gap-6">
              {NAV_ITEMS.filter(item => item !== 'services').map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  className={`text-left text-sm tracking-[0.18em] hover:text-zinc-900 transition-colors font-semibold uppercase ${
                    currentPage === item ? 'text-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 space-y-4 border-t border-zinc-200">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium">Services</p>
                <button
                  onClick={() => navigate('services')}
                  className={`text-left text-sm tracking-[0.18em] hover:text-zinc-900 transition-colors font-semibold uppercase ${
                    currentPage === 'services' ? 'text-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  Services overview
                </button>
                <button
                  onClick={() => navigate('lease')}
                  className={`text-left text-sm tracking-[0.18em] hover:text-zinc-900 transition-colors font-semibold uppercase ${
                    currentPage === 'lease' ? 'text-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  Lease a vehicle
                </button>
              </div>
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
        {currentPage === 'currency' && <CurrencyExchangePage />}
        {currentPage === 'services' && <ServicesPage onNavigate={navigate} />}
        {currentPage === 'lease' && <LeasePage onNavigate={navigate} initialVehicle={selectedLeaseVehicle} />}
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
        <div
          className="hero-poster parallax"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%), url(${MEDIA.heroPoster})`,
            transform: `translateY(${parallax * 0.08}px)`,
          }}
        />
        <div className="hero-overlay" />
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 flex flex-col gap-12">
            <Reveal>
              <p className="text-sm tracking-[0.24em] uppercase text-zinc-300 font-medium mb-4">
                Automotive assets & currency desk
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.92] tracking-tight">
                The Art
                <br />
                of Motion
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-xl text-zinc-200 max-w-3xl leading-relaxed">
                We curate and structure vehicles as an asset class for principals and family offices. Alongside
                acquisition and finance, we operate a Vancouver-based CNY/CAD exchange desk with live quotes and
                controlled handling for travel, remittance, and tuition needs.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-4 bg-white text-black uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none"
              >
                View services
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
                Live FX desk refreshed every 30s
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
              We build performance-grade automotive portfolios—and support clients with a dedicated currency desk.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl text-zinc-600 max-w-4xl leading-relaxed">
              From sourcing and financing rare vehicles to secure storage and exit strategies, we operate with the
              rigor of an investment office. We also run a Vancouver FX desk (CNY/CAD) for travel, remittance, and
              tuition clients who value the same discipline and certainty.
            </p>
          </Reveal>
          <Reveal>
            <SpecTable
              items={[
                { label: 'Off-market pipeline', value: '400+ verified dealers' },
                { label: 'Acquisition SLA', value: 'Under 48 hours' },
                { label: 'Concierge desk', value: 'Response under 24h' },
                { label: 'FX desk', value: 'CNY/CAD quotes every 30s, by appointment' },
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
              <span className="tech-data">{INVENTORY_CARDS.length} vehicles available</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INVENTORY_CARDS.slice(0, 3).map((car) => (
              <Reveal key={car.id}>
                <button
                  onClick={() => onNavigate('lease', car.id)}
                  className="group border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-left w-full"
                >
                  {/* Vehicle Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">Lease from</span>
                      <span className="text-lg font-semibold">{car.monthlyFrom}<span className="text-sm text-zinc-500">/mo</span></span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* View all link */}
          <Reveal>
            <div className="text-center">
              <button
                onClick={() => onNavigate('lease')}
                className="inline-flex items-center gap-2 px-6 py-4 bg-black text-white uppercase tracking-[0.14em] text-xs font-semibold button-primary rounded-none"
              >
                View all vehicles & leasing options
                <ChevronRight size={16} strokeWidth={1} />
              </button>
            </div>
          </Reveal>
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
                { label: 'FX desk controls', value: 'ID-verified, CCTV-monitored counter' },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}

const getSpread = (mid) => ({
  buy: mid * 0.975,
  sell: mid * 1.025,
})

const formatRate = (value) => {
  if (value >= 50) return value.toFixed(2)
  if (value >= 5) return value.toFixed(3)
  return value.toFixed(4)
}

const formatDelta = (value) => {
  const abs = Math.abs(value)
  if (abs >= 1) return abs.toFixed(2)
  if (abs >= 0.1) return abs.toFixed(3)
  return abs.toFixed(4)
}

const Sparkline = ({ data, positive }) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((value, idx) => {
    const x = (idx / Math.max(data.length - 1, 1)) * 120
    const y = 40 - ((value - min) / range) * 32
    return `${x},${y}`
  }).join(' ')

  return (
    <svg className="sparkline" viewBox="0 0 120 40" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={positive ? '#16a34a' : '#dc2626'} strokeWidth="2" />
    </svg>
  )
}

const ExchangeTicker = ({ pairs }) => {
  const [paused, setPaused] = useState(false)
  const tickerPairs = [...pairs, ...pairs]

  const handlePause = (isPaused) => setPaused(isPaused)
  const handlePointerDown = () => setPaused(true)
  const handlePointerUp = () => setPaused(false)

  return (
    <div
      className="exchange-ticker"
      onMouseEnter={() => handlePause(true)}
      onMouseLeave={() => handlePause(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <div className={`exchange-ticker-track ${paused ? 'paused' : ''}`}>
        {tickerPairs.map((pair, idx) => {
          const { buy, sell } = getSpread(pair.mid)
          return (
            <div key={`${pair.id}-${idx}`} className="exchange-ticker-item">
              <div className="exchange-ticker-pair">
                <span className="ticker-chip">{pair.base}</span>
                <span className="ticker-arrow">→</span>
                <span className="ticker-chip">{pair.target}</span>
              </div>
              <div className="exchange-ticker-rates">
                <span className="buy">Buy {formatRate(buy)}</span>
                <span className="sell">Sell {formatRate(sell)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const RateBoard = ({ base, pairs, compact = false }) => (
  <div className={`rate-board ${compact ? 'rate-board-compact' : ''}`}>
    <div className="flex items-center justify-between gap-4 mb-4">
      <div>
        <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-2">{base} desk</p>
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-zinc-900">
          {base} to major currencies in real time
        </h3>
      </div>
      <span className="tech-data hidden md:block">Refresh: 30s cadence</span>
    </div>
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-3' : 'gap-4'}`}>
      {pairs.map((pair) => {
        const { buy, sell } = getSpread(pair.mid)
        const last = pair.history[pair.history.length - 2] ?? pair.mid
        const delta = pair.mid - last
        const positive = delta >= 0

        return (
          <div key={pair.id} className="rate-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs tracking-[0.14em] uppercase text-zinc-500 mb-1">
                  {pair.base} → {pair.target}
                </p>
                <p className="text-xl font-semibold text-zinc-900">{formatRate(pair.mid)}</p>
              </div>
              <span className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {positive ? '+' : '-'}
                {formatDelta(delta)}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="rate-pill buy">Buy {formatRate(buy)}</span>
              <span className="rate-pill sell">Sell {formatRate(sell)}</span>
            </div>
            <Sparkline data={pair.history} positive={positive} />
          </div>
        )
      })}
    </div>
  </div>
)

function CurrencyExchangePage() {
  const [pairs, setPairs] = useState(() =>
    EXCHANGE_PAIRS.map((pair) => ({
      ...pair,
      history: [...pair.history],
    }))
  )
  const [activeDesk, setActiveDesk] = useState('CNY')

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((pair) => {
          const drift = 1 + (Math.random() - 0.5) * 0.002
          const decimals = pair.target === 'JPY' ? 2 : 4
          const mid = Number(Math.max(0.0001, pair.mid * drift).toFixed(decimals))
          const history = [...pair.history.slice(-11), mid]
          return { ...pair, mid, history }
        })
      )
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const cnyPairs = pairs.filter((pair) => pair.base === 'CNY')
  const cadPairs = pairs.filter((pair) => pair.base === 'CAD')

  return (
    <>
      <section className="grid-surface bg-black text-white py-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <p className="text-sm tracking-[0.18em] uppercase text-zinc-300 font-semibold mb-3">
              Currency exchange
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              CNY and CAD exchange you can trust, updated while you watch.
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-lg text-zinc-200 max-w-3xl leading-relaxed">
              Appointment-based, receipt-backed cash handling with verified ID and clear settlement times. Hover or
              touch-and-hold the ticker to pause a quote before you confirm.
            </p>
          </Reveal>
          <Reveal>
            <SpecTable
              items={[
                { label: 'Live desk', value: 'CNY to CAD, USD, EUR, GBP, AUD, JPY, SGD' },
                { label: 'Updates', value: 'Fresh quotes every 30 seconds' },
                { label: 'Settlement', value: 'Cash pickup or bank draft, Vancouver' },
                { label: 'Contact', value: '+1 (604) 674-6299 or email to book' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="grid-surface bg-white py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">
                  Live rates
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                  CNY and CAD to major currencies with rolling ticker and sparklines.
                </h2>
              </div>
              <span className="tech-data">Hover or hold to pause the ticker</span>
            </div>
          </Reveal>

          <ExchangeTicker pairs={pairs} />

          <div className="xl:hidden flex items-center gap-3">
            {['CNY', 'CAD'].map((desk) => (
              <button
                key={desk}
                onClick={() => setActiveDesk(desk)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.14em] border transition-all duration-200 ${
                  activeDesk === desk
                    ? 'bg-black text-white border-black'
                    : 'border-zinc-300 text-zinc-600 hover:border-zinc-500'
                }`}
              >
                {desk} desk
              </button>
            ))}
          </div>

          <div className="xl:hidden">
            <Reveal>
              <RateBoard
                base={activeDesk}
                pairs={activeDesk === 'CNY' ? cnyPairs : cadPairs}
                compact
              />
            </Reveal>
          </div>

          <div className="hidden xl:grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Reveal>
              <RateBoard base="CNY" pairs={cnyPairs} />
            </Reveal>
            <Reveal>
              <RateBoard base="CAD" pairs={cadPairs} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grid-surface bg-zinc-50 border-y border-zinc-200 py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <Reveal>
            <div className="text-center space-y-3">
              <p className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold">
                Why clients choose us
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                Vancouver currency exchange for every need.
              </h3>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXCHANGE_STORIES.map((story) => (
              <Reveal key={story.title} className="h-full">
                <div className="exchange-story h-full">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    <div className="story-badge">{story.badge}</div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">{story.title}</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed">{story.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-surface bg-white py-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <h3 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-3">
              Connect with the desk
            </h3>
            <h4 className="text-3xl md:text-4xl font-semibold leading-tight">
              Ready to lock a rate? Choose how you want to reach us.
            </h4>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal>
              <div className="contact-card">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">Call or text</p>
                <p className="text-lg font-semibold text-zinc-900 mb-2">+1 (604) 674-6299</p>
                <p className="text-sm text-zinc-600 mb-4">Speak directly with our Vancouver FX desk for a live quote.</p>
                <a href="tel:+16046746299" className="contact-link">
                  Call the desk
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="contact-card">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">Email</p>
                <p className="text-lg font-semibold text-zinc-900 mb-2">investmenttothemono@gmail.com</p>
                <p className="text-sm text-zinc-600 mb-4">
                  Send the currency and amount you need. We reply within one business day.
                </p>
                <a href="mailto:investmenttothemono@gmail.com" className="contact-link">
                  Email for a quote
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="contact-card">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">Visit</p>
                <p className="text-lg font-semibold text-zinc-900 mb-2">1168 W 48th Ave, Vancouver</p>
                <p className="text-sm text-zinc-600 mb-4">Book an appointment for in-person cash pickup or settlement.</p>
                <a
                  href="https://maps.google.com/?q=1168+W+48th+Ave,+Vancouver,+BC+V6M+2N7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Plan your visit
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function LeasePage({ onNavigate, initialVehicle }) {
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicle)

  useEffect(() => {
    if (initialVehicle) {
      setSelectedVehicle(initialVehicle)
    }
  }, [initialVehicle])

  const leaseSteps = [
    {
      title: 'Apply',
      copy: 'Share business/personal details, target monthly payment, and preferred vehicle class.',
      icon: '01',
      detail: '5 minutes to complete'
    },
    {
      title: 'Approve',
      copy: 'We structure terms, confirm documentation requirements, and lock in residual values.',
      icon: '02',
      detail: 'Same-day decision possible'
    },
    {
      title: 'Deliver',
      copy: 'We source and spec the vehicle, finalize paperwork, and arrange white-glove delivery.',
      icon: '03',
      detail: 'As fast as 14 days'
    },
  ]

  return (
    <section className="grid-surface py-24 px-6 lg:px-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 tracking-[0.12em] uppercase">
          <button onClick={() => onNavigate('services')} className="hover:text-zinc-900 transition-colors">
            Services
          </button>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">Lease a vehicle</span>
        </nav>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start -mt-8">
          <Reveal>
            <h1 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-4">
              Lease a vehicle
            </h1>
            <p className="text-4xl md:text-5xl font-semibold leading-tight">
              Structured leases for principals who want flexibility and speed.
            </p>
          </Reveal>
          <Reveal>
            <div className="lg:pt-8">
              <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                Tailored lease programs across supercars, SUVs, and executive vehicles. Terms from 12 to 84 months with
                same-day credit decisions where possible.
              </p>
              <SpecTable
                items={[
                  { label: 'Terms', value: '12-84 months' },
                  { label: 'Structures', value: 'TRAC / Operating / Balloon' },
                  { label: 'Rates', value: 'From 3.1% APR (OAC)' },
                  { label: 'Approval', value: 'Same-day credit committee' },
                ]}
              />
            </div>
          </Reveal>
        </div>

        {/* Featured vehicles for lease */}
        <Reveal>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold">
                Available for lease
              </h2>
              <span className="tech-data">{INVENTORY_CARDS.length} vehicles</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {INVENTORY_CARDS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedVehicle(selectedVehicle === car.id ? null : car.id)}
                  className={`p-4 border text-left transition-all duration-200 ${
                    selectedVehicle === car.id
                      ? 'border-black bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <span className="tech-data block mb-2">{car.id}</span>
                  <p className="text-sm font-medium leading-tight truncate">{car.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{car.monthlyFrom}/mo</p>
                </button>
              ))}
            </div>
            {selectedVehicle && (
              <div className="border border-zinc-200 bg-white p-6 animate-fadeIn">
                {INVENTORY_CARDS.filter(c => c.id === selectedVehicle).map(car => (
                  <div key={car.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                      <p className="text-sm text-zinc-500 mb-4">Model Year {car.year} &middot; {car.status}</p>
                      <SpecTable items={car.specs} />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Estimated lease from</p>
                        <p className="text-3xl font-semibold">{car.monthlyFrom}<span className="text-lg text-zinc-500">/mo</span></p>
                        <p className="text-xs text-zinc-400 mt-2">Based on 36-month term, 12,000 km/year. OAC.</p>
                      </div>
                      <a
                        href={`mailto:investmenttothemono@gmail.com?subject=Lease Inquiry: ${car.name}&body=Hello, I'm interested in leasing the ${car.year} ${car.name}. Please provide details on available terms.`}
                        className="mt-4 px-6 py-3 bg-black text-white uppercase tracking-[0.14em] text-xs font-semibold inline-flex items-center gap-2 button-primary rounded-none w-fit"
                      >
                        Request quote
                        <ChevronRight size={14} strokeWidth={1} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Process steps */}
        <Reveal>
          <div className="space-y-8">
            <h2 className="text-sm tracking-[0.18em] uppercase text-zinc-500 font-semibold">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
              {leaseSteps.map((item, idx) => (
                <div
                  key={item.title}
                  className={`relative border border-zinc-200 bg-white p-6 lg:p-8 flex flex-col gap-4 ${
                    idx > 0 ? 'md:-ml-px' : ''
                  }`}
                >
                  {/* Connector line on desktop */}
                  {idx < leaseSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-zinc-300 z-10" />
                  )}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border-2 border-zinc-900 flex items-center justify-center">
                      <span className="text-lg font-semibold">{item.icon}</span>
                    </div>
                    <span className="tech-data text-zinc-400">{item.detail}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA Section */}
        <Reveal>
          <div className="border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Ready to start your lease?</h3>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Share your target vehicle, budget, and preferred term. Our team will respond within one business day
                  with a tailored proposal.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <a
                  href="mailto:investmenttothemono@gmail.com?subject=Lease Request&body=Hello, I would like to start a lease.%0A%0AVehicle:%0ABudget:%0ATerm:%0A"
                  className="px-6 py-4 bg-black text-white uppercase tracking-[0.14em] text-xs font-semibold inline-flex items-center justify-center gap-2 button-primary rounded-none"
                >
                  Email leasing team
                  <ChevronRight size={14} strokeWidth={1} />
                </a>
                <a
                  href="tel:+16046746299"
                  className="px-6 py-4 button-ghost rounded-none uppercase tracking-[0.14em] text-xs font-semibold inline-flex items-center justify-center gap-2"
                >
                  Call +1 (604) 674-6299
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <p className="tech-data">
                DISCLAIMERS: On approved credit. Taxes, fees, and security deposits may apply. Terms and availability subject to change.
                Residual values and rates vary by vehicle and term length.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesPage({ onNavigate }) {
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
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:investmenttothemono@gmail.com?subject=Portfolio Consultation Request&body=Hello, I would like to schedule a consultation to discuss automotive investment opportunities."
                className="px-8 py-4 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none inline-flex items-center gap-2"
              >
                Schedule consultation
                <ChevronRight size={14} strokeWidth={1} />
              </a>
              <button
                onClick={() => onNavigate('lease')}
                className="px-8 py-4 button-ghost rounded-none uppercase tracking-[0.16em] text-xs font-semibold inline-flex items-center gap-2"
              >
                Explore leasing
                <ChevronRight size={14} strokeWidth={1} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ConciergePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO: Replace with your Formspree form ID from https://formspree.io
  // Create a free account, add a new form, and copy the form ID
  const FORMSPREE_ID = 'xyzformid' // e.g., 'xwkgjqpb'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.target)

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or contact us directly.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
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

        {submitted ? (
          <Reveal>
            <div className="border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 lg:p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-2 border-zinc-900 flex items-center justify-center mb-6">
                <ChevronRight size={24} strokeWidth={1.5} className="text-zinc-900" />
              </div>
              <h3 className="text-2xl font-semibold">Request received</h3>
              <p className="text-base text-zinc-600 leading-relaxed max-w-md mx-auto">
                A member of our concierge team will contact you within one business day to discuss your requirements.
              </p>
              <div className="pt-6">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 text-zinc-600 hover:text-zinc-900 uppercase tracking-[0.14em] text-xs font-semibold transition-colors"
                >
                  Submit another request
                </button>
              </div>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="form-field">
              <label className="block text-sm tracking-[0.14em] uppercase text-zinc-500 font-semibold mb-3">
                Full name
              </label>
              <input
                type="text"
                name="name"
                required
                className="form-input-enhanced"
                placeholder="John Smith"
              />
            </div>

            <div className="form-field">
              <label className="block text-sm tracking-[0.14em] uppercase text-zinc-500 font-semibold mb-3">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                className="form-input-enhanced"
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-field">
                <label className="block text-sm tracking-[0.14em] uppercase text-zinc-500 font-semibold mb-3">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="form-input-enhanced"
                  placeholder="+1 (604) 674-6299"
                />
              </div>
              <div className="form-field">
                <label className="block text-sm tracking-[0.14em] uppercase text-zinc-500 font-semibold mb-3">
                  Desired vehicle
                </label>
                <select name="vehicle_category" className="form-input-enhanced cursor-pointer" defaultValue="">
                  <option value="" disabled>Select category</option>
                  <option>Vintage Classics</option>
                  <option>Modern Supercars</option>
                  <option>Executive Fleets</option>
                  <option>Custom Specification</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="block text-sm tracking-[0.14em] uppercase text-zinc-500 font-semibold mb-3">
                Requirements
              </label>
              <textarea
                name="requirements"
                rows="5"
                className="form-input-enhanced resize-none"
                placeholder="Describe your acquisition criteria..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-black text-white uppercase tracking-[0.16em] text-xs font-semibold button-primary rounded-none mt-4 flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" />
                  Processing
                </>
              ) : (
                'Request consultation'
              )}
            </button>
          </form>
        )}

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
                  {member.bio}
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
                  +1 (604) 674-6299
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
            +1 (604) 674-6299
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
      <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 tracking-[0.16em]">
          &copy; {new Date().getFullYear()} Tothemono Investments Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-zinc-500 tracking-[0.12em]">
          <button className="hover:text-zinc-900 transition-colors">Privacy Policy</button>
          <button className="hover:text-zinc-900 transition-colors">Terms of Service</button>
        </div>
      </div>
    </div>
  </footer>
)

export default App
