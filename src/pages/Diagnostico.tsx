import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

// ─────────────────────────────────────
// TYPES
// ─────────────────────────────────────
type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  objetivo: string;
  tempo_investimento: string;
  carteira_estruturada: string;
  incomodo_investimentos: string;
  investimento_ano: string;
  analise_inicial: string;
};

// ─────────────────────────────────────
// OPTION CARD
// ─────────────────────────────────────
interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon: string;
  index: number;
}

const OptionCard: React.FC<OptionCardProps> = ({ label, selected, onClick, icon, index }) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2 focus:outline-none"
    style={{
      animationDelay: `${index * 55}ms`,
      background: selected
        ? 'linear-gradient(135deg, rgba(30,41,59,0.06) 0%, rgba(30,41,59,0.02) 100%)'
        : '#fff',
      borderColor: selected ? '#1E293B' : '#E2E8F0',
      boxShadow: selected
        ? '0 6px 24px -6px rgba(30,41,59,0.18)'
        : '0 1px 4px rgba(0,0,0,0.04)',
      transform: selected ? 'translateX(4px)' : 'translateX(0)',
    }}
  >
    {/* Icon badge */}
    <div
      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{ background: selected ? '#1E293B' : '#F1F5F9' }}
    >
      <span
        className="material-symbols-outlined text-[18px] transition-colors duration-200"
        style={{ fontVariationSettings: "'FILL' 1", color: selected ? '#fff' : '#64748B' }}
      >
        {icon}
      </span>
    </div>

    {/* Label */}
    <span
      className="flex-1 font-lexend font-semibold text-[15px] leading-snug transition-colors duration-200"
      style={{ color: selected ? '#1E293B' : '#374151' }}
    >
      {label}
    </span>

    {/* Custom radio */}
    <div
      className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
      style={{ borderColor: selected ? '#1E293B' : '#CBD5E1' }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full bg-navy transition-all duration-200"
        style={{
          opacity: selected ? 1 : 0,
          transform: selected ? 'scale(1)' : 'scale(0)',
        }}
      />
    </div>
  </button>
);

// ─────────────────────────────────────
// INPUT FIELD
// ─────────────────────────────────────
interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder, icon }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-inter font-semibold text-[11px] uppercase tracking-widest transition-colors duration-200"
        style={{ color: focused ? '#1E293B' : '#64748B' }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: focused ? '#fff' : '#F8FAFC',
          border: `2px solid ${focused ? '#1E293B' : hasValue ? '#CBD5E1' : '#E2E8F0'}`,
          boxShadow: focused ? '0 0 0 4px rgba(30,41,59,0.07)' : 'none',
        }}
      >
        <span
          className="material-symbols-outlined absolute left-4 text-[17px] transition-colors duration-200"
          style={{ color: focused ? '#1E293B' : '#94A3B8' }}
        >
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent font-inter text-[15px] text-navy pl-11 pr-10 py-4 outline-none rounded-xl placeholder:text-[#94A3B8]"
        />
        {hasValue && (
          <span
            className="material-symbols-outlined absolute right-4 text-[17px] text-green-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────
export const Diagnostico: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '', email: '', whatsapp: '',
    objetivo: '', tempo_investimento: '', carteira_estruturada: '',
    incomodo_investimentos: '', investimento_ano: '', analise_inicial: '',
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof FormData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  type StepDef = {
    id: string;
    label: string;
    title: string;
    subtitle: string;
    isValid: () => boolean;
    field?: keyof FormData;
    content: React.ReactNode;
  };

  const steps: StepDef[] = [
    {
      id: 'pessoal', label: 'Identificação',
      title: 'Vamos começar!',
      subtitle: 'Nos conte um pouco sobre você para podermos entrar em contato.',
      isValid: () =>
        formData.nome.trim().length > 2 &&
        formData.email.includes('@') &&
        formData.whatsapp.replace(/\D/g, '').length >= 10,
      content: (
        <div className="flex flex-col gap-5">
          <InputField label="Nome *" type="text" icon="person" value={formData.nome} onChange={v => update('nome', v)} placeholder="Seu nome completo" />
          <InputField label="Email *" type="email" icon="mail" value={formData.email} onChange={v => update('email', v)} placeholder="seu@email.com" />
          <InputField label="WhatsApp *" type="tel" icon="phone_iphone" value={formData.whatsapp} onChange={v => update('whatsapp', v)} placeholder="(00) 00000-0000" />
        </div>
      ),
    },
    {
      id: 'objetivo', label: 'Objetivo',
      title: 'Qual seu principal objetivo hoje?',
      subtitle: 'Selecione a opção que melhor representa sua prioridade.' ,
      field: 'objetivo', isValid: () => formData.objetivo !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Crescimento de patrimônio', icon: 'trending_up' },
            { label: 'Renda passiva', icon: 'account_balance' },
            { label: 'Proteção/segurança', icon: 'verified_user' },
            { label: 'Aposentadoria', icon: 'weekend' },
            { label: 'Outro', icon: 'lightbulb' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.objetivo === opt.label} onClick={() => update('objetivo', opt.label)} />
          ))}
        </div>
      ),
    },
    {
      id: 'tempo', label: 'Experiência',
      title: 'Você investe há quanto tempo?',
      subtitle: 'Isso nos ajuda a adequar nossa abordagem ao seu perfil.',
      field: 'tempo_investimento', isValid: () => formData.tempo_investimento !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Menos de 1 ano', icon: 'schedule' },
            { label: '1 a 3 anos', icon: 'event' },
            { label: 'Mais de 3 anos', icon: 'workspace_premium' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.tempo_investimento === opt.label} onClick={() => update('tempo_investimento', opt.label)} />
          ))}
        </div>
      ),
    },
    {
      id: 'carteira', label: 'Situação Atual',
      title: 'Você sente que sua carteira está bem estruturada?',
      subtitle: 'Avalie honestamente o nível de organização dos seus investimentos.',
      field: 'carteira_estruturada', isValid: () => formData.carteira_estruturada !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Sim', icon: 'check_circle' },
            { label: 'Mais ou menos', icon: 'help' },
            { label: 'Não', icon: 'cancel' },
            { label: 'Não sei avaliar', icon: 'quiz' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.carteira_estruturada === opt.label} onClick={() => update('carteira_estruturada', opt.label)} />
          ))}
        </div>
      ),
    },
    {
      id: 'incomodo', label: 'Desafio',
      title: 'O que mais te incomoda hoje nos seus investimentos?',
      subtitle: 'Selecione o principal desafio que você quer superar.',
      field: 'incomodo_investimentos', isValid: () => formData.incomodo_investimentos !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Rentabilidade baixa', icon: 'arrow_downward' },
            { label: 'Falta de estratégia', icon: 'map' },
            { label: 'Muitos produtos / confuso', icon: 'device_hub' },
            { label: 'Falta de acompanhamento', icon: 'support_agent' },
            { label: 'Outro', icon: 'more_horiz' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.incomodo_investimentos === opt.label} onClick={() => update('incomodo_investimentos', opt.label)} />
          ))}
        </div>
      ),
    },
    {
      id: 'volume', label: 'Volume',
      title: 'Quanto você investe aproximadamente por ano?',
      subtitle: 'Com esse dado, direcionamos os produtos mais adequados ao seu perfil.',
      field: 'investimento_ano', isValid: () => formData.investimento_ano !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Até R$50 mil', icon: 'savings' },
            { label: 'R$50 mil a R$200 mil', icon: 'account_balance_wallet' },
            { label: 'R$200 mil a R$500 mil', icon: 'payments' },
            { label: 'Acima de R$500 mil', icon: 'diamond' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.investimento_ano === opt.label} onClick={() => update('investimento_ano', opt.label)} />
          ))}
        </div>
      ),
    },
    {
      id: 'analise', label: 'Análise',
      title: 'Você gostaria de receber uma análise inicial da sua carteira?',
      subtitle: 'Nossa equipe pode entrar em contato para uma conversa inicial gratuita.',
      field: 'analise_inicial', isValid: () => formData.analise_inicial !== '',
      content: (
        <div className="flex flex-col gap-3">
          {[
            { label: 'Sim', icon: 'thumb_up' },
            { label: 'Talvez', icon: 'thumbs_up_down' },
            { label: 'Não', icon: 'do_not_disturb' },
          ].map((opt, i) => (
            <OptionCard key={opt.label} label={opt.label} icon={opt.icon} index={i}
              selected={formData.analise_inicial === opt.label} onClick={() => update('analise_inicial', opt.label)} />
          ))}
        </div>
      ),
    },
  ];

  const totalSteps = steps.length;
  const progressPct = Math.round((currentStep / totalSteps) * 100);
  const canProceed = steps[currentStep].isValid();

  const navigateTo = (next: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(next);
      setAnimating(false);
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 220);
  };

  const submitForm = async () => {
    setIsSending(true);
    try {
      const { error } = await supabase.from('diagnostic_leads').insert({
        nome: formData.nome,
        email: formData.email,
        whatsapp: formData.whatsapp,
        objetivo: formData.objetivo || null,
        tempo_investimento: formData.tempo_investimento || null,
        carteira_estruturada: formData.carteira_estruturada || null,
        incomodo_investimentos: formData.incomodo_investimentos || null,
        investimento_ano: formData.investimento_ano || null,
        analise_inicial: formData.analise_inicial || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err) {
      console.error('Erro ao salvar diagnóstico:', err);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (currentStep < totalSteps - 1) { setDirection('next'); navigateTo(currentStep + 1); }
    else submitForm();
  };

  const handlePrev = () => {
    if (currentStep > 0) { setDirection('prev'); navigateTo(currentStep - 1); }
  };

  // Auto-advance on radio selection (steps 1+)
  const radioKey = [
    formData.objetivo, formData.tempo_investimento, formData.carteira_estruturada,
    formData.incomodo_investimentos, formData.investimento_ano, formData.analise_inicial,
  ].join('|');
  const prevRadioKey = useRef(radioKey);

  useEffect(() => {
    if (prevRadioKey.current === radioKey) return;
    prevRadioKey.current = radioKey;
    const step = steps[currentStep];
    if (currentStep > 0 && step.field && formData[step.field] !== '') {
      const timer = setTimeout(() => {
        if (currentStep < totalSteps - 1) { setDirection('next'); navigateTo(currentStep + 1); }
        else submitForm();
      }, 380);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioKey]);

  // ── SUCCESS ───────────────────────────────────────────────────────
  if (isSubmitted) {
    const wantsContact = formData.analise_inicial === 'Sim' || formData.analise_inicial === 'Talvez';

    return (
      <section className="w-full min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-xl text-center flex flex-col items-center gap-10">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-navy flex items-center justify-center"
              style={{ boxShadow: '0 20px 60px -10px rgba(30,41,59,0.35)' }}
            >
              <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <div className="absolute -inset-3 rounded-full border-2 border-navy/20 animate-ping" style={{ animationDuration: '2s' }} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-lexend font-bold text-4xl text-navy tracking-tight">
              {wantsContact ? 'Diagnóstico e 3 E-books Enviados!' : 'Parabéns por preencher o formulário!'}
            </h2>
            <p className="font-inter text-[#475569] text-lg leading-relaxed max-w-lg">
              {wantsContact 
                ? 'Verifique seu e-mail! Acabamos de enviar os seus 3 materiais exclusivos e o resumo do seu diagnóstico. Em breve nossa equipe também entrará em contato para agendar uma conversa sobre seus objetivos.'
                : 'Seu presente exclusivo já está a caminho! Acabamos de enviar os seus 3 e-books para o e-mail informado. Aproveite este conteúdo gratuito para transformar sua inteligência financeira, sem qualquer compromisso.'
              }
            </p>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFormData({ nome:'',email:'',whatsapp:'',objetivo:'',tempo_investimento:'',carteira_estruturada:'',incomodo_investimentos:'',investimento_ano:'',analise_inicial:'' });
            }}
            className="border-2 border-[#E2E8F0] text-[#475569] font-lexend font-semibold px-8 py-3.5 rounded-full hover:border-navy hover:text-navy transition-all"
          >
            Refazer diagnóstico
          </button>
        </div>
      </section>
    );
  }

  // ── FORM ─────────────────────────────────────────────────────────
  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center px-4 py-16 md:py-24">

      {/* ── Page header ── */}
      <div className="w-full max-w-2xl text-center mb-10 flex flex-col gap-4">
        <span className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B] border border-[#E2E8F0] px-4 py-1.5 rounded-full inline-block self-center bg-white">
          Diagnóstico · Gratuito
        </span>
        <h1 className="font-lexend font-bold text-3xl md:text-4xl text-navy tracking-tight">
          Diagnóstico Financeiro Gratuito
        </h1>
        <p className="font-inter text-[#475569] text-base leading-relaxed max-w-lg mx-auto">
          Responda a este diagnóstico em menos de 2 minutos e ganhe um <strong>presente especial</strong> no seu e-mail: nossos <strong>3 e-books exclusivos</strong> para transformar sua inteligência financeira.
        </p>
      </div>

      {/* ── Progress ── */}
      <div className="w-full max-w-2xl mb-8 flex flex-col gap-3">
        {/* Step labels */}
        <div className="hidden sm:flex items-center gap-0">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-lexend font-bold text-[11px] transition-all duration-300"
                  style={{
                    background: i < currentStep ? '#1E293B' : i === currentStep ? '#fff' : '#E2E8F0',
                    border: `2px solid ${i <= currentStep ? '#1E293B' : '#E2E8F0'}`,
                    color: i < currentStep ? '#fff' : i === currentStep ? '#1E293B' : '#94A3B8',
                    boxShadow: i === currentStep ? '0 0 0 4px rgba(30,41,59,0.10)' : 'none',
                  }}
                >
                  {i < currentStep
                    ? <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    : i + 1
                  }
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 transition-all duration-500 mx-1"
                  style={{ background: i < currentStep ? '#1E293B' : '#E2E8F0' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #1E293B 0%, #475569 100%)',
            }}
          />
        </div>

        <div className="flex justify-between items-center font-inter text-[12px] text-[#64748B]">
          <span>Passo <strong className="text-navy font-semibold">{currentStep + 1}</strong> de {totalSteps}</span>
          <span className="bg-white border border-[#E2E8F0] px-3 py-0.5 rounded-full text-[11px] font-semibold">
            {progressPct}% concluído
          </span>
        </div>
      </div>

      {/* ── Form card ── */}
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px -15px rgba(30,41,59,0.12), 0 4px 20px -4px rgba(30,41,59,0.06)' }}
      >
        {/* Card body */}
        <div
          className="p-8 md:p-12"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateY(${direction === 'next' ? '10px' : '-10px'})`
              : 'translateY(0)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          {/* Step label badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
              <span className="font-lexend font-bold text-white text-[11px]">
                {String(currentStep + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="font-inter text-[11px] font-bold uppercase tracking-widest text-[#64748B]">
              {steps[currentStep].label}
            </span>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="font-lexend font-bold text-2xl md:text-[1.65rem] text-navy tracking-tight leading-tight mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="font-inter text-[#64748B] text-[14px] leading-relaxed">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Content */}
          <div className="min-h-[180px]">
            {steps[currentStep].content}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F1F5F9] mx-0" />

        {/* Card footer */}
        <div className="flex items-center justify-between px-8 md:px-12 py-5 bg-[#F8FAFC]">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 font-inter font-semibold text-[13px] px-5 py-2.5 rounded-full transition-all duration-200
              ${currentStep === 0
                ? 'text-[#CBD5E1] cursor-not-allowed'
                : 'text-[#475569] hover:bg-white hover:text-navy hover:shadow-sm border border-transparent hover:border-[#E2E8F0]'
              }`}
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Voltar
          </button>

          {/* Step 1 — explicit Continuar */}
          {currentStep === 0 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 font-lexend font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-200
                ${canProceed
                  ? 'text-white hover:opacity-90 hover:scale-[1.02]'
                  : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                }`}
              style={canProceed ? {
                background: 'linear-gradient(135deg, #091426 0%, #1E293B 100%)',
                boxShadow: '0 8px 24px -4px rgba(30,41,59,0.35)',
              } : undefined}
            >
              Continuar
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}

          {/* Last step — Finalizar */}
          {currentStep === totalSteps - 1 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || isSending}
              className={`flex items-center gap-2 font-lexend font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-200
                ${canProceed && !isSending
                  ? 'text-white hover:opacity-90 hover:scale-[1.02]'
                  : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                }`}
              style={canProceed && !isSending ? {
                background: 'linear-gradient(135deg, #091426 0%, #1E293B 100%)',
                boxShadow: '0 8px 24px -4px rgba(30,41,59,0.35)',
              } : undefined}
            >
              {isSending ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">autorenew</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              )}
              {isSending ? 'Enviando...' : 'Finalizar Diagnóstico'}
            </button>
          )}

          {/* Middle steps — auto-advance hint */}
          {currentStep > 0 && currentStep < totalSteps - 1 && (
            <span className="font-inter text-[12px] text-[#94A3B8] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">touch_app</span>
              Selecione uma opção
            </span>
          )}
        </div>
      </div>

      {/* Security note */}
      <p className="mt-8 font-inter text-[12px] text-[#94A3B8] flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[14px]">lock</span>
        Seus dados estão seguros e não serão compartilhados com terceiros.
      </p>
    </section>
  );
};
