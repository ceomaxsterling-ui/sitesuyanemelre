import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ──────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────
type ServiceKey = keyof typeof mockData.services;

// ──────────────────────────────────────────────
// ANIMATED STAT CARD
// ──────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}
const StatCard: React.FC<Readonly<StatCardProps>> = ({ value, label, delay }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`reveal from-below ${isVisible ? 'visible' : ''} bg-white rounded-2xl border border-silver p-8 text-center shadow-sm`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-lexend font-bold text-4xl text-navy mb-1">{value}</p>
      <p className="text-xs uppercase tracking-widest text-executive">{label}</p>
    </div>
  );
};

// ──────────────────────────────────────────────
// FEATURE CARD
// ──────────────────────────────────────────────
interface FeatureData { icon: string; title: string; description: string }
interface FeatureCardProps { feature: FeatureData; delay: number }
const FeatureCard: React.FC<Readonly<FeatureCardProps>> = ({ feature, delay }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`reveal from-right ${isVisible ? 'visible' : ''} bg-white rounded-2xl border border-silver p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="size-10 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-xl">{feature.icon}</span>
      </div>
      <div>
        <h4 className="font-lexend font-bold text-navy mb-1">{feature.title}</h4>
        <p className="text-executive text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FOR WHOM CARD
// ──────────────────────────────────────────────
interface ForWhomData { icon: string; title: string; description: string }
interface ForWhomCardProps { item: ForWhomData; delay: number }
const ForWhomCard: React.FC<Readonly<ForWhomCardProps>> = ({ item, delay }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`reveal from-below ${isVisible ? 'visible' : ''} bg-white rounded-3xl border border-silver p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="size-12 rounded-full bg-navy text-white flex items-center justify-center">
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
      </div>
      <h4 className="font-lexend font-bold text-navy text-lg">{item.title}</h4>
      <p className="text-executive text-sm leading-relaxed">{item.description}</p>
    </div>
  );
};

// ──────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────
export const Servico: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? mockData.services[id as ServiceKey] : undefined;

  if (!service) return <Navigate to="/" replace />;

  // Scroll reveal hooks for main sections
  const heroText   = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const heroImg    = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const statsRef   = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const methLeft   = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const forWhomHdr = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const testimonial = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const ctaRef     = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const { tag, icon, hero, stats, methodology, forWhom, testimonial: quote } = service;

  return (
    <div className="bg-white">

      {/* ─── HERO ─────────────────────────── */}
      <section className="px-6 py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left text */}
          <div
            ref={heroText.ref}
            className={`flex-1 flex flex-col gap-8 reveal from-left ${heroText.isVisible ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-silver bg-white shadow-sm w-fit">
              <span className="material-symbols-outlined text-navy text-lg">{icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-executive">{tag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-lexend font-bold text-navy leading-tight">
              {hero.title}
            </h1>
            <p className="text-lg text-executive max-w-xl leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer" className="bg-navy text-white px-8 py-4 rounded-full font-bold text-center hover:scale-105 transition-transform shadow-lg">
                {hero.ctaPrimary}
              </a>
              <Link to="/consultoria" className="bg-white text-navy border border-silver px-8 py-4 rounded-full font-bold text-center hover:bg-slate-50 transition-colors shadow-sm">
                {hero.ctaSecondary}
              </Link>
            </div>
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-executive hover:text-navy transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Voltar para a página inicial
            </Link>
          </div>

          {/* Right image */}
          <div
            ref={heroImg.ref}
            className={`flex-1 w-full reveal from-right scale-in ${heroImg.isVisible ? 'visible' : ''}`}
            style={{ transitionDuration: '900ms' }}
          >
            <div className="w-full max-w-lg mx-auto aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-silver">
              <img src={hero.image} alt={tag} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────── */}
      <section className="py-16 px-6 border-t border-silver bg-[#F8FAFC]">
        <div
          ref={statsRef.ref}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} value={stat.value} label={stat.label} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* ─── METHODOLOGY ─────────────────── */}
      <section className="py-24 px-6 border-t border-silver bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div
            ref={methLeft.ref}
            className={`flex-1 reveal from-left ${methLeft.isVisible ? 'visible' : ''}`}
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">
              Minha Metodologia
            </span>
            <h2 className="text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight mb-6">
              {methodology.title}
            </h2>
            <p className="text-executive leading-relaxed mb-8 max-w-md">
              {methodology.description}
            </p>
            <ul className="flex flex-col gap-4">
              {methodology.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="text-executive">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: feature cards */}
          <div className="flex-1 flex flex-col gap-4">
            {methodology.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR WHOM ────────────────────── */}
      <section className="py-24 px-6 border-t border-silver bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div
            ref={forWhomHdr.ref}
            className={`reveal from-below ${forWhomHdr.isVisible ? 'visible' : ''} text-center max-w-2xl mx-auto`}
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">
              Para Quem é Este Serviço
            </span>
            <h2 className="text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight">
              Desenvolvido para Quem Valoriza Resultados Reais
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forWhom.map((item, i) => (
              <ForWhomCard key={i} item={item} delay={i * 130} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─────────────────── */}
      <section className="py-24 px-6 border-t border-silver bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            ref={testimonial.ref}
            className={`reveal scale-in ${testimonial.isVisible ? 'visible' : ''} bg-[#F8FAFC] rounded-3xl p-10 border border-silver flex flex-col gap-8`}
          >
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="font-lexend text-2xl text-navy leading-relaxed italic">
              "{quote.text}"
            </p>
            <div className="flex items-center gap-4">
              <img src={quote.avatar} alt={quote.author} className="size-14 rounded-full object-cover grayscale border-2 border-silver" />
              <div>
                <p className="font-lexend font-bold text-navy">{quote.author}</p>
                <p className="text-sm text-executive uppercase tracking-wider">{quote.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────── */}
      <section className="py-24 px-6 border-t border-silver bg-navy">
        <div
          ref={ctaRef.ref}
          className={`max-w-3xl mx-auto flex flex-col items-center text-center gap-8 reveal from-below ${ctaRef.isVisible ? 'visible' : ''}`}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 rounded-full">
            Próximo Passo
          </span>
          <h2 className="text-3xl md:text-5xl font-lexend font-bold text-white leading-tight">
            Vamos Construir Sua Estratégia Juntos?
          </h2>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Agende uma sessão de diagnóstico gratuita e descubra o potencial real do seu patrimônio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer" className="bg-white text-navy px-10 py-4 rounded-full font-bold text-center hover:scale-105 transition-transform shadow-xl">
              Agendar Consultoria
            </a>
            <Link to="/" className="border border-white/30 text-white px-10 py-4 rounded-full font-bold text-center hover:bg-white/10 transition-colors">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
