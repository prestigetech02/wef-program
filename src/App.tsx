import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import ApplyPage from './ApplyPage';

const phases = [
  {
    number: '01',
    month: 'June 2026',
    title: 'Foundation & Training',
    description:
      'Identifying, registering, and training 200 women across Lagos. Participants learn mindset, entrepreneurship, financial literacy, customer service, and business growth fundamentals.',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    number: '02',
    month: 'July 2026',
    title: 'Business Diagnostic',
    description:
      'Every participant receives a personalised business health check. Each woman is categorised as Startup, Growth, or Established — determining the tailored support she receives.',
    icon: TrendingUp,
    color: 'from-wef-purple to-wef-pink',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    number: '03',
    month: 'August 2026',
    title: 'Mentorship & Coaching',
    description:
      'Participants join the WEF Business Circle — intimate groups of 20–25 women with dedicated mentors, group leaders, bi-weekly coaching sessions, and accountability tracking.',
    icon: Users,
    color: 'from-wef-pink to-wef-purple',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    number: '04',
    month: 'October 2026',
    title: 'Capital & Equipment Support',
    description:
      'Eligible women access micro-grants (₦50K–₦250K), growth loans (₦500K–₦5M), and equipment like sewing machines, solar fridges, grinding machines, and POS devices.',
    icon: DollarSign,
    color: 'from-rose-500 to-wef-purple',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    number: '05',
    month: 'December 2026',
    title: 'Market Access',
    description:
      'Participants showcase and sell at the WEF Marketplace Trade Fair, gaining exposure to corporates, government agencies, buyers, and distributors — turning skills into sustainable income.',
    icon: ShoppingBag,
    color: 'from-wef-purple to-pink-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    number: '06',
    month: 'January 2027',
    title: 'Impact Measurement & Scale',
    description:
      'Measuring real outcomes: businesses started, jobs created, revenue growth, families supported, and community leaders developed — building a case for continued scale.',
    icon: BarChart3,
    color: 'from-wef-pink-dark to-wef-purple-dark',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
];

const clusters = [
  { name: 'Food & Agriculture', desc: 'Catering, Food Processing, Farming, Snacks', emoji: '🌾' },
  { name: 'Fashion & Beauty', desc: 'Tailoring, Hairdressing, Makeup & Fashion Design', emoji: '✂️' },
  { name: 'Retail & Trading', desc: 'Market Women, Shops & Resellers', emoji: '🛍️' },
  { name: 'Services', desc: 'Cleaning, Event Services, Domestic Services', emoji: '⚡' },
];

const stats = [
  { value: '200+', label: 'Women Trained', sub: 'per cohort' },
  { value: '6', label: 'Month Programme', sub: 'full journey' },
  { value: '₦250K', label: 'Micro-Grants', sub: 'up to' },
  { value: '₦5M', label: 'Growth Loans', sub: 'up to' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`section-reveal ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'apply'>('home');

  const goApply = () => {
    setPage('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'apply') {
    return <ApplyPage onBack={() => setPage('home')} />;
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/images/WhatsApp_Image_2026-06-18_at_11.52.46_AM.jpeg"
                alt="WEF Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'About', id: 'about' },
                { label: 'Programme', id: 'programme' },
                { label: 'Who We Serve', id: 'who' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-medium text-gray-600 hover:text-wef-pink transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={goApply}
                className="bg-gradient-to-r from-wef-pink to-wef-purple text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-wef-pink transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 flex flex-col gap-4">
            {[
              { label: 'About', id: 'about' },
              { label: 'Programme', id: 'programme' },
              { label: 'Who We Serve', id: 'who' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-base font-medium text-gray-700 hover:text-wef-pink transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={goApply}
              className="bg-gradient-to-r from-wef-pink to-wef-purple text-white font-semibold px-5 py-3 rounded-full text-center"
            >
              Apply Now
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-16">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-700/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wef-pink/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <Star size={13} className="text-wef-rose fill-current" />
              <span className="text-wef-rose text-xs font-semibold tracking-wider uppercase">
                6-Month Empowerment Programme — June 2026
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              From Survival to{' '}
              <span className="text-gradient-light italic">Wealth Creation</span>
            </h1>

            <p className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              The Women Empowerment Fund equips women in underserved communities with
              the skills, mentorship, capital, and market access needed to build
              financially independent, sustainable businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goApply}
                className="group inline-flex items-center justify-center gap-2 bg-white text-wef-pink font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Apply to Join the Programme
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('programme')}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">{s.value}</div>
                <div className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                <div className="text-white/50 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl opacity-60" />
                <div className="relative bg-white rounded-2xl p-8 border border-pink-100 shadow-lg">
                  <img
                    src="/images/WhatsApp_Image_2026-06-18_at_11.52.46_AM.jpeg"
                    alt="Women Empowerment Fund"
                    className="w-40 mx-auto mb-6 object-contain"
                  />
                  <blockquote className="text-center">
                    <p className="font-display text-xl text-wef-charcoal italic leading-relaxed mb-4">
                      "To empower women with the skills, capital, mentorship, and market access needed to
                      become financially independent."
                    </p>
                    <cite className="text-sm text-wef-gray font-medium not-italic">
                      — WEF Vision Statement
                    </cite>
                  </blockquote>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="delay-100">
              <div className="space-y-6">
                <div>
                  <span className="text-wef-pink text-xs font-bold uppercase tracking-widest">Our Story</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-wef-charcoal mt-2 leading-tight">
                    Founded to Close the Gap
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  The Women Empowerment Fund was founded by <strong className="text-wef-charcoal">Ms. Chantelle Abdul</strong>,
                  Group Managing Director of MOJEC Group. Her mission: equip women — particularly those in underserved
                  and informal sectors — with everything they need to achieve lasting economic independence.
                </p>
                <p className="text-gray-600 leading-relaxed text-base">
                  Since inception, WEF has empowered hundreds of women across Lagos through practical training,
                  business support, and access to tools and capital that enable them to start, grow, and sustain
                  profitable ventures.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Entrepreneurship & financial literacy training',
                    'Business diagnostics and personalised mentorship',
                    'Grants, loans, and equipment support',
                    'Market access and corporate procurement connections',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-wef-pink mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section id="who" className="py-20 lg:py-24 bg-section-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-14">
              <span className="text-wef-pink text-xs font-bold uppercase tracking-widest">Who We Serve</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-wef-charcoal mt-2">
                Women Across Every Sector
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
                Whether you are just starting out or already running a small business, WEF has a
                place for you.
              </p>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clusters.map((c, i) => (
              <RevealSection key={c.name} className={`delay-${i * 75}`}>
                <div className="group bg-white rounded-2xl p-6 border border-pink-100 hover:border-wef-pink hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {c.emoji}
                  </div>
                  <h3 className="font-display font-semibold text-wef-charcoal text-lg mb-2">{c.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME PHASES ── */}
      <section id="programme" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="text-wef-pink text-xs font-bold uppercase tracking-widest">The Journey</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-wef-charcoal mt-2">
                Your 6-Month Roadmap
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
                A structured, end-to-end programme designed to move you from where you are today
                to where you deserve to be.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <RevealSection key={phase.number} className={`delay-${(i % 3) * 100}`}>
                  <div className={`group relative bg-white rounded-2xl border ${phase.border} p-6 hover:shadow-xl transition-all duration-400 hover:-translate-y-1 h-full flex flex-col`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-4xl font-bold font-display text-gray-100 group-hover:text-pink-100 transition-colors">
                        {phase.number}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-wef-pink uppercase tracking-wider mb-1">
                      {phase.month}
                    </div>
                    <h3 className="font-display font-bold text-wef-charcoal text-lg mb-3">{phase.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{phase.description}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GAIN ── */}
      <section className="py-20 lg:py-24 bg-cta-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-14">
              <span className="text-pink-200 text-xs font-bold uppercase tracking-widest">What You Gain</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                More Than Just Training
              </h2>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Business Education',
                desc: 'Mindset, entrepreneurship, financial literacy, customer service & record keeping.',
              },
              {
                icon: Users,
                title: 'Community & Mentorship',
                desc: 'Join the WEF Business Circle — 20–25 women with a dedicated mentor and group leader.',
              },
              {
                icon: DollarSign,
                title: 'Grants & Loans',
                desc: 'Access micro-grants from ₦50,000 and growth loans up to ₦5 Million for eligible participants.',
              },
              {
                icon: TrendingUp,
                title: 'Equipment Support',
                desc: 'Sewing machines, grinding machines, solar fridges, POS devices and more to cut production costs.',
              },
              {
                icon: ShoppingBag,
                title: 'Market Access',
                desc: 'Showcase and sell at the WEF Marketplace Trade Fair with corporates, buyers, and distributors.',
              },
              {
                icon: Heart,
                title: 'Lasting Impact',
                desc: 'Be part of a movement that lifts families, communities, and future generations out of poverty.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <RevealSection key={item.title}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 h-full">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section id="apply" className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <div className="bg-section-gradient rounded-3xl border border-pink-200 p-10 sm:p-14 shadow-xl shadow-pink-50">
              <div className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-1.5 mb-6">
                <Star size={13} className="text-wef-pink fill-current" />
                <span className="text-wef-pink text-xs font-bold uppercase tracking-wider">Applications Open</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-wef-charcoal leading-tight mb-5">
                Ready to Transform{' '}
                <span className="text-gradient">Your Business?</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                Join 200 women this June and begin your journey from survival to wealth creation.
                Seats are limited — apply today.
              </p>

              <button
                onClick={goApply}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-wef-pink to-wef-purple text-white font-bold text-base sm:text-lg px-10 py-4 rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-1 transition-all duration-300"
              >
                Apply Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-gray-400 text-xs mt-5">
                Programme begins June 2026 &bull; Lagos, Nigeria &bull; Free to participate
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-wef-charcoal py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/WhatsApp_Image_2026-06-18_at_11.52.46_AM.jpeg"
              alt="WEF Logo"
              className="h-10 w-auto object-contain brightness-0 invert opacity-80"
            />
            <div>
              <p className="text-white font-semibold text-sm">Women Empowerment Fund</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-xs">
              &copy; 2026 Women Empowerment Fund &bull; An initiative of MOJEC Group
            </p>
            <p className="text-gray-500 text-xs mt-1">Founded by Ms. Chantelle Abdul, GMD MOJEC Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
