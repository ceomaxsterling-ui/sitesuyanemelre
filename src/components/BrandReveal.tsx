import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const WORDS = ['Suyane Melre', 'Liberdade', 'Segurança', 'Prosperidade'];

const SWEEP_MS = 1000;
const HOLD_MS  = 1600;
const EXIT_MS  = 450;
const CYCLE_MS = SWEEP_MS + HOLD_MS + EXIT_MS;
const CHAR_FLASH_MS = 380;

const CSS = `
@keyframes brand-char-flash {
  0%   { color: #1E293B; }
  40%  { color: #3B82F6; }
  100% { color: #1E293B; }
}
@keyframes brand-word-in {
  0%   { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes brand-word-out {
  0%   { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-12px); }
}
.brand-char {
  display: inline-block;
  color: #1E293B;
  transition: color 80ms;
  white-space: pre;
}
.brand-char.flashing {
  animation: brand-char-flash ${CHAR_FLASH_MS}ms ease-in-out forwards;
}
.brand-enter {
  animation: brand-word-in ${Math.round(SWEEP_MS * 0.8)}ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
}
.brand-exit {
  animation: brand-word-out ${EXIT_MS}ms ease-in forwards;
}
`;

if (typeof document !== 'undefined' && !document.getElementById('brand-reveal-css')) {
  const el = document.createElement('style');
  el.id = 'brand-reveal-css';
  el.textContent = CSS;
  document.head.appendChild(el);
}

interface CharSpanProps { char: string; delay: number; sweeping: boolean }
const CharSpan: React.FC<CharSpanProps> = ({ char, delay, sweeping }) => {
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (!sweeping) { setFlashing(false); return; }
    const timer = setTimeout(() => {
      setFlashing(true);
      const reset = setTimeout(() => setFlashing(false), CHAR_FLASH_MS);
      return () => clearTimeout(reset);
    }, delay);
    return () => clearTimeout(timer);
  }, [sweeping, delay]);

  return (
    <span className={`brand-char${flashing ? ' flashing' : ''}`}>
      {char}
    </span>
  );
};

type WordState = 'entering' | 'sweeping' | 'holding' | 'exiting';

export const BrandReveal: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.35, once: true });

  const [started, setStarted]     = useState(false);
  const [index, setIndex]         = useState(0);
  const [wordState, setWordState] = useState<WordState>('entering');

  useEffect(() => {
    if (isVisible && !started) setStarted(true);
  }, [isVisible, started]);

  useEffect(() => {
    if (!started) return;

    const t1 = setTimeout(() => setWordState('sweeping'), 60);
    const t2 = setTimeout(() => setWordState('holding'), SWEEP_MS + 60);
    const t3 = setTimeout(() => setWordState('exiting'), SWEEP_MS + HOLD_MS + 60);
    const t4 = setTimeout(() => {
      setIndex(i => (i + 1) % WORDS.length);
      setWordState('entering');
    }, CYCLE_MS + 60);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [started, index]);

  const word   = WORDS[index];
  const chars  = word.split('');
  const isSweeping = wordState === 'sweeping';

  const charDelay = (i: number) => {
    const gap = SWEEP_MS / (chars.length > 1 ? chars.length - 1 : 1);
    return Math.round(i * gap);
  };

  const fontSize = word.length <= 9
    ? 'clamp(2.5rem, 9vw, 9rem)'
    : word.length <= 12
      ? 'clamp(1.9rem, 7vw, 7.5rem)'
      : 'clamp(1.7rem, 5.5vw, 6.5rem)';

  const wordClass = [
    'font-lexend font-black leading-none tracking-tight select-none',
    wordState === 'entering' || wordState === 'sweeping' ? 'brand-enter' : '',
    wordState === 'exiting' ? 'brand-exit' : '',
  ].filter(Boolean).join(' ');

  return (
    <section
      ref={ref}
      className="bg-white border-t border-silver py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <p
        className="text-[11px] font-bold uppercase tracking-[0.22em] text-executive mb-10 transition-all duration-700"
        style={{
          opacity:   isVisible ? 1 : 0,
          transform: isVisible ? 'none' : 'translateY(10px)',
        }}
      >
        Consultoria · Patrimônio · Legado
      </p>

      <div
        className="min-h-[1.15em] flex items-center justify-center w-full px-6 md:px-12"
        aria-live="polite"
        aria-atomic="true"
      >
        {started ? (
          <div key={`${index}-${wordState}`} className={wordClass} style={{ fontSize }}>
            {chars.map((ch, i) => (
              <CharSpan
                key={i}
                char={ch}
                delay={charDelay(i)}
                sweeping={isSweeping}
              />
            ))}
          </div>
        ) : (
          <div
            className="font-lexend font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(1.9rem, 7.5vw, 8.5rem)', color: 'transparent' }}
            aria-hidden
          >
            Suyane Melre
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2 items-center">
        {WORDS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width:      i === index ? '28px' : '8px',
              height:     '8px',
              background: i === index ? '#1E293B' : '#E2E8F0',
            }}
          />
        ))}
      </div>
    </section>
  );
};
