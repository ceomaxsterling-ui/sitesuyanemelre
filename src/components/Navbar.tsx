import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbarH = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarH - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => scrollToSection(id), 120);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const isActive = (path: string) => location.pathname === path && !location.hash;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      window.history.pushState(null, '', `/#${sectionId}`);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const navItems = [
    { label: 'Início',    to: '/',              sectionId: null,         icon: 'home' },
    { label: 'Serviços',  to: '/#servicos',      sectionId: 'servicos',   icon: 'business_center' },
    { label: 'Diagnóstico', to: '/#diagnostico', sectionId: 'diagnostico', icon: 'assignment' },
    { label: 'Processo',  to: '/#processo',      sectionId: 'processo',   icon: 'route' },
    { label: 'Blog',      to: '/blog',           sectionId: null,         icon: 'newspaper' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-silver shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="size-9 md:size-10 rounded-full bg-navy text-white flex items-center justify-center font-bold font-lexend text-lg group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-lexend font-bold text-navy leading-none text-sm md:text-base">Suyane Melre</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-executive">Consultora CFP®</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, to, sectionId }) =>
              sectionId ? (
                <a
                  key={label}
                  href={to}
                  onClick={e => handleAnchorClick(e, sectionId)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location.hash === `#${sectionId}`
                      ? 'text-navy font-bold'
                      : 'text-executive hover:text-navy'
                  }`}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className={`text-sm font-medium transition-colors ${
                    isActive(to) ? 'text-navy font-bold' : 'text-executive hover:text-navy'
                  }`}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer"
              className="bg-navy text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 hidden md:block"
            >
              Falar com Suyane
            </a>

            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-silver bg-white gap-1.5 shrink-0"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <span className={`block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-navy transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="bg-white border-t border-silver/60 px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ label, to, sectionId, icon }) => {
              const isItemActive = sectionId
                ? location.hash === `#${sectionId}`
                : location.pathname === to && !location.hash;

              return sectionId ? (
                <a
                  key={label}
                  href={to}
                  onClick={e => handleAnchorClick(e, sectionId)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-colors ${
                    isItemActive ? 'bg-navy/5 text-navy font-bold' : 'text-executive hover:bg-slate-50 hover:text-navy'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-colors ${
                    isItemActive ? 'bg-navy/5 text-navy font-bold' : 'text-executive hover:bg-slate-50 hover:text-navy'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  {label}
                </Link>
              );
            })}

            <div className="pt-2 mt-1 border-t border-silver">
              <a
                href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-navy text-white py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Falar com Suyane
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
