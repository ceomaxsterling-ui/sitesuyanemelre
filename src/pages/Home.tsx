import React from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { CertificationsMarquee } from '../components/CertificationsMarquee';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BrandReveal } from '../components/BrandReveal';
import { Diagnostico } from './Diagnostico';

type ServiceData     = typeof mockData.home.services[0];
type ProcessStepData = typeof mockData.home.process[0];
type ArticleData     = typeof mockData.home.articles[0];

interface AnimatedServiceCardProps { service: ServiceData; index: number }
const AnimatedServiceCard: React.FC<Readonly<AnimatedServiceCardProps>> = ({ service, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.12 });
  return (
    <div
      ref={ref}
      className={`reveal from-below ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <Link
        to={`/servico/${service.id}`}
        className="group bg-white rounded-3xl border border-silver shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2"
      >
        <div className="w-full aspect-[4/3] overflow-hidden relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 size-9 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-sm">
            <span className="font-lexend font-bold text-navy text-xs">0{index + 1}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="text-white font-bold text-sm flex items-center gap-2">
              Saiba Mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="size-10 rounded-full bg-navy/5 text-navy flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">{service.icon}</span>
          </div>
          <h3 className="font-lexend font-bold text-lg text-navy group-hover:text-navy/80 transition-colors">{service.title}</h3>
          <p className="text-executive text-sm leading-relaxed">{service.description}</p>
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-silver">
            <span className="text-xs font-bold uppercase tracking-widest text-executive">Ver Detalhes</span>
            <div className="size-8 rounded-full border border-silver flex items-center justify-center group-hover:bg-navy group-hover:border-navy group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ServicosHeader: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} className={`reveal from-below ${isVisible ? 'visible' : ''} flex flex-col md:flex-row justify-between items-start md:items-end gap-6`}>
      <div className="max-w-xl">
        <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">Meus Serviços</span>
        <h2 className="text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight">
          Ofereço Consultoria Financeira Sob Medida para Você
        </h2>
        <p className="text-executive mt-3 max-w-md leading-relaxed">
          Clique em cada serviço para conhecer minha abordagem completa.
        </p>
      </div>
      <Link to="/consultoria" className="flex items-center gap-2 text-sm font-bold text-navy hover:underline shrink-0">
        Ver todos os serviços <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  );
};

interface AnimatedProcessStepProps {
  step: ProcessStepData;
  isLast: boolean;
  delay: number;
}
const AnimatedProcessStep: React.FC<Readonly<AnimatedProcessStepProps>> = ({ step, isLast, delay }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`flex gap-6 items-start reveal from-left ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`size-14 rounded-full border-2 flex items-center justify-center font-lexend font-bold text-lg shadow-md transition-all duration-700 ${
            isVisible ? 'bg-navy border-navy text-white scale-100' : 'bg-white border-silver text-silver scale-75'
          }`}
          style={{ transitionDelay: `${delay + 100}ms` }}
        >
          {step.step}
        </div>
        {!isLast && (
          <div className="relative w-px flex-1 overflow-hidden mt-2 min-h-[4rem]">
            <div className="absolute inset-0 bg-silver" />
            <div
              className="absolute inset-x-0 top-0 bg-navy transition-all duration-1000"
              style={{ height: isVisible ? '100%' : '0%', transitionDelay: `${delay + 400}ms` }}
            />
          </div>
        )}
      </div>
      <div className="pb-10 pt-1">
        <h4 className="font-lexend font-bold text-navy text-xl mb-2">{step.title}</h4>
        <p className="text-executive text-sm leading-relaxed max-w-sm">{step.description}</p>
      </div>
    </div>
  );
};

interface ArticleCardProps { article: ArticleData }
const ArticleCard: React.FC<Readonly<ArticleCardProps>> = ({ article }) => (
  <Link to="/post" className="flex flex-col gap-4 group cursor-pointer bg-white p-4 rounded-3xl border border-silver shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
    <div className="w-full aspect-video rounded-2xl overflow-hidden relative">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
        <span className="text-[10px] font-bold uppercase tracking-widest text-navy">{article.category}</span>
      </div>
    </div>
    <div className="flex flex-col gap-2 px-2 pb-2">
      <p className="text-xs text-executive flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">calendar_today</span> {article.date}
      </p>
      <h4 className="font-lexend font-bold text-navy group-hover:text-navy/80 transition-colors line-clamp-2">{article.title}</h4>
      <p className="text-sm text-executive line-clamp-2">{article.excerpt}</p>
    </div>
  </Link>
);

export const Home: React.FC = () => {
  const { hero, services, process, articles } = mockData.home;

  const processHeader   = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const processCtaRef   = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const processImageRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  const heroRef1 = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const heroRef2 = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  
  const blogHeaderRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const casesHeaderRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <section className="px-6 py-20 lg:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div 
            ref={heroRef1.ref} 
            className={`flex-1 flex flex-col gap-6 md:gap-8 relative z-10 w-full max-w-2xl reveal from-below ${heroRef1.isVisible ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-silver bg-white shadow-sm w-fit self-start">
              <span className="size-2 rounded-full bg-navy animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-executive">Consultoria Financeira Pessoal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-lexend font-bold text-navy leading-tight">
              {hero.title}
            </h1>
            <p className="text-base md:text-xl text-executive max-w-xl leading-relaxed">{hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full md:w-auto">
              <a href="#diagnostico" onClick={(e) => { e.preventDefault(); document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-navy text-white px-8 py-3.5 md:py-4 rounded-full font-bold text-center hover:scale-105 transition-transform shadow-lg w-full sm:w-auto">
                Solicitar Diagnóstico
              </a>
              <Link to="/consultoria" className="bg-white text-navy border border-silver px-8 py-3.5 md:py-4 rounded-full font-bold text-center hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto">
                Saiba Mais
              </Link>
            </div>
          </div>
          <div ref={heroRef2.ref} className={`flex-1 w-full flex justify-center lg:justify-end relative reveal scale-in ${heroRef2.isVisible ? 'visible' : ''}`} style={{transitionDuration: '1000ms'}}>
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-silver/30 blur-3xl" />
            </div>

            <div className="relative w-full max-w-[380px] mx-auto lg:max-w-[420px]">
              <div className="w-full aspect-[3/4] max-h-[420px] lg:max-h-none rounded-[2.5rem] overflow-hidden shadow-2xl border border-silver/60 bg-[#f4f4f4]">
                <img
                  src={hero.image}
                  alt="Suyane Melre — Consultora CFP®"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="absolute -top-3 -right-3 bg-navy text-white rounded-xl px-3 py-2 shadow-lg text-center">
                <p className="font-lexend font-bold text-xs">CFP®</p>
                <p className="text-[9px] uppercase tracking-wider text-white/70">Certificada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificationsMarquee />

      {/* 2. MEU PROCESSO */}
      <section id="processo" className="py-24 px-6 border-t border-silver bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="flex-1 flex flex-col gap-4">
              <div
                ref={processHeader.ref}
                className={`reveal from-left ${processHeader.isVisible ? 'visible' : ''} mb-6`}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">
                  Como Trabalho
                </span>
                <h2 className="text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight">
                  Meu Processo de Consultoria, Simplificado
                </h2>
                <p className="text-executive mt-4 leading-relaxed max-w-md">
                  Um método estruturado e transparente para transformar sua realidade financeira com clareza e segurança.
                </p>
              </div>
              <div className="flex flex-col">
                {process.map((step, index) => (
                  <AnimatedProcessStep
                    key={step.id}
                    step={step}
                    isLast={index === process.length - 1}
                    delay={index * 120}
                  />
                ))}
              </div>
              <div
                ref={processCtaRef.ref}
                className={`reveal from-below ${processCtaRef.isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '200ms' }}
              >
                <a
                  href="#diagnostico"
                  onClick={(e) => { e.preventDefault(); document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-navy text-white px-8 py-3.5 md:py-4 rounded-full font-bold justify-center sm:justify-start inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg mt-2 w-full sm:w-auto"
                >
                  Agendar Diagnóstico
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>

            <div className="flex-1 w-full lg:sticky lg:top-24 self-start">
              <div
                ref={processImageRef.ref}
                className={`reveal from-right scale-in ${processImageRef.isVisible ? 'visible' : ''}`}
                style={{ transitionDuration: '900ms' }}
              >
                <div className="relative">
                  <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-silver/60 bg-[#f0f0f0]">
                    <img
                      src="/images/suyane-processo.jpg"
                      alt="Suyane Melre — Consultora CFP®"
                      className={`w-full h-full object-cover object-top transition-all duration-1000 ${processImageRef.isVisible ? 'scale-100' : 'scale-105'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS */}
      <section id="servicos" className="py-24 px-6 border-t border-silver bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <ServicosHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <a
              href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center bg-navy text-white px-6 md:px-10 py-3.5 md:py-4 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-xl hover:shadow-navy/20"
            >
              Falar com Suyane sobre meus objetivos
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. CASES DE SUCESSO */}
      <section className="py-24 px-6 border-t border-silver bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div ref={casesHeaderRef.ref} className={`mb-16 md:mb-24 text-center flex flex-col items-center reveal from-left ${casesHeaderRef.isVisible ? 'visible' : ''}`}>
            <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">
              Cases de Sucesso
            </span>
            <div className="w-full flex justify-center pb-1">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-lexend font-bold text-navy leading-tight md:whitespace-nowrap px-4 md:px-0 inline-block text-balance">
                Mais do que teoria, resultados reais.
              </h2>
            </div>
            <p className="text-executive mt-6 max-w-3xl text-base md:text-xl px-2">
              Conheça as histórias de clientes que já transformaram sua realidade financeira com o nosso método.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-24 relative">
            {mockData.home.cases.map((caseItem, index) => {
              const stickyTopMobile = `calc(6rem + ${index * 1.5}rem)`;
              const stickyTopDesktop = `calc(6rem + ${index * 2}rem)`;
              
              return (
                <div 
                  key={caseItem.id}
                  className="sticky flex flex-col md:flex-row bg-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl border border-silver/50"
                  style={{ top: typeof window !== 'undefined' && window.innerWidth < 768 ? stickyTopMobile : stickyTopDesktop }}
                >
                  <div className="w-full aspect-[16/9] md:hidden relative overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6 sm:p-8 md:p-16 flex flex-col justify-center gap-4 md:gap-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-navy bg-navy/5 px-3 py-1 rounded-full inline-block w-fit">
                      Estudo de Caso 0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight">
                      {caseItem.title}
                    </h3>
                    <div className="flex items-center gap-3 py-4 border-y border-silver/50">
                      <div className="size-10 rounded-full bg-silver flex items-center justify-center">
                        <span className="material-symbols-outlined text-executive">person</span>
                      </div>
                      <p className="font-lexend font-bold text-navy text-sm md:text-base">
                        {caseItem.client}
                      </p>
                    </div>
                    <p className="text-executive text-sm md:text-lg leading-relaxed">
                      {caseItem.summary}
                    </p>
                    <div className="pt-2">
                      <Link 
                        to={`/case/${caseItem.id}`}
                        className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-navy text-white px-8 py-3.5 md:py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                      >
                        Ver estudo completo
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1 min-h-full relative overflow-hidden">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 px-6 border-t border-silver bg-navy overflow-hidden">
        <div ref={ctaRef.ref} className={`max-w-3xl mx-auto flex flex-col items-center text-center gap-8 reveal from-below scale-in ${ctaRef.isVisible ? 'visible' : ''}`}>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 rounded-full inline-block">
            Próximo Passo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-lexend font-bold text-white leading-tight">
            O próximo passo para sua segurança financeira começa aqui
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            Agende uma sessão de diagnóstico gratuita e descubra como podemos transformar sua relação com o dinheiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full md:w-auto">
            <a href="#diagnostico" onClick={(e) => { e.preventDefault(); document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-white text-navy px-8 py-3.5 md:py-4 rounded-full font-bold text-center hover:scale-105 transition-transform shadow-xl w-full sm:w-auto">
              Agendar Diagnóstico Gratuito
            </a>
            <Link to="/consultoria" className="border border-white/30 text-white px-8 py-3.5 md:py-4 rounded-full font-bold text-center hover:bg-white/10 transition-colors w-full sm:w-auto">
              Conhecer a Metodologia
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BLOG */}
      <section className="py-24 px-6 border-t border-silver bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div ref={blogHeaderRef.ref} className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 reveal from-left ${blogHeaderRef.isVisible ? 'visible' : ''}`}>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-executive border border-silver px-3 py-1 rounded-full inline-block mb-4">Conteúdo Educativo</span>
              <h2 className="text-3xl md:text-4xl font-lexend font-bold text-navy leading-tight">Conteúdo Educativo</h2>
              <p className="text-executive mt-2">Artigos e análises para expandir sua inteligência financeira.</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold text-navy hover:underline shrink-0">
              Ver todos os artigos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => <ArticleCard key={article.id} article={article} />)}
          </div>
          <Link to="/blog" className="md:hidden self-center border border-silver bg-white px-6 py-3 rounded-full text-sm font-bold text-navy">
            Ver todos os artigos
          </Link>
        </div>
      </section>

      {/* 8. DIAGNÓSTICO */}
      <section id="diagnostico" className="bg-[#F8FAFC]">
          <Diagnostico />
      </section>

      {/* 9. BRAND REVEAL */}
      <BrandReveal />
    </div>
  );
};

export default Home;
