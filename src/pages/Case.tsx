import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { mockCasesDetails } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContentBlock {
  type: 'text' | 'quote' | 'image-text';
  title?: string;
  text: string;
  image?: string;
  imagePosition?: 'left' | 'right';
}

const StoryBlock: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const delay = (index % 2) * 100;

  if (block.type === 'text') {
    return (
      <div 
        ref={ref} 
        className={`reveal from-below ${isVisible ? 'visible' : ''} max-w-3xl mx-auto w-full`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="bg-white px-6 md:px-0">
          {block.title && (
            <h2 className="text-2xl md:text-3xl font-lexend font-bold text-navy mb-6 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-silver"></span>
              {block.title}
            </h2>
          )}
          <div className="text-[17px] md:text-xl text-executive leading-[1.8] space-y-6">
            {block.text.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (block.type === 'quote') {
    return (
      <div 
        ref={ref} 
        className={`reveal scale-in ${isVisible ? 'visible' : ''} max-w-4xl mx-auto px-4 sm:px-6 w-full`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="bg-navy rounded-3xl md:rounded-[2rem] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-4 p-8 opacity-5">
            <span className="material-symbols-outlined text-[150px] md:text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <span className="material-symbols-outlined text-4xl md:text-5xl text-white/30 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="text-xl md:text-3xl lg:text-4xl font-lexend font-medium text-white leading-relaxed italic">
              "{block.text}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (block.type === 'image-text') {
    const isImageLeft = block.imagePosition === 'left';
    return (
      <div 
        ref={ref} 
        className={`reveal ${isImageLeft ? 'from-left' : 'from-right'} ${isVisible ? 'visible' : ''} max-w-6xl mx-auto px-6 w-full`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-20 items-center`}>
          <div className="flex-1 w-full max-w-lg md:max-w-none">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-silver/50 relative bg-silver/10">
              <img 
                src={block.image} 
                alt={block.title || 'Case representation'} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" 
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col justify-center">
            {block.title && (
              <h2 className="text-2xl md:text-4xl font-lexend font-bold text-navy mb-6">
                {block.title}
              </h2>
            )}
            <div className="text-[17px] md:text-xl text-executive leading-[1.8] space-y-6">
              {block.text.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const Case: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  if (!id || !mockCasesDetails[id]) {
    return <Navigate to="/" replace />;
  }

  const caseData = mockCasesDetails[id];
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <section className="px-6 py-16 md:py-24 bg-[#F8FAFC] border-b border-silver/50 relative overflow-hidden">
        <div className="absolute top-0 right-10 -z-0 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-silver/20 blur-3xl" />
        </div>

        <div 
          ref={headerRef} 
          className={`max-w-4xl mx-auto flex flex-col items-center text-center gap-6 reveal from-below relative z-10 ${isHeaderVisible ? 'visible' : ''}`}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-executive hover:text-navy hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-widest border border-silver bg-white px-5 py-2 rounded-full mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Voltar para o Início
          </Link>
          
          <span className="text-[11px] font-bold uppercase tracking-widest text-navy bg-navy/5 px-3 py-1 rounded-full inline-block border border-navy/10">
            Estudo de Caso 0{id}
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-lexend font-bold text-navy leading-[1.15] text-balance">
            {caseData.title}
          </h1>
          
          {caseData.subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl text-executive max-w-3xl leading-relaxed mt-2 text-balance">
              {caseData.subtitle}
            </p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white flex-1">
        <div className="flex flex-col gap-24 md:gap-32 w-full">
          {caseData.blocks?.map((block: ContentBlock, index: number) => (
            <StoryBlock key={index} block={block} index={index} />
          ))}
        </div>
      </section>

      <section className="py-24 px-6 border-t border-silver bg-navy text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 relative z-10 w-full">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 border border-white/20 px-4 py-1.5 rounded-full inline-block">
            Sua Vez
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-lexend font-bold text-white leading-tight text-balance px-2">
            Queremos que a próxima história de sucesso seja a sua.
          </h2>
          <p className="text-white/70 text-base md:text-xl max-w-xl leading-relaxed px-4">
            Agende uma sessão gratuita e descubra como uma estratégia personalizada pode trazer clareza e segurança para o seu futuro.
          </p>
          <div className="mt-8 w-full md:w-auto px-6 md:px-0">
            <a href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-white text-navy px-10 py-4 rounded-full font-bold text-center hover:scale-105 transition-transform shadow-2xl inline-flex items-center justify-center gap-3">
              Agendar Diagnóstico <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Case;
