import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-6 border-t border-silver relative overflow-hidden">
      <div className="relative z-10 flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <h5 className="font-bold text-sm uppercase tracking-widest text-navy">Menu</h5>
            <Link className="text-sm text-executive hover:text-navy transition-colors" to="/">Início</Link>
            <Link className="text-sm text-executive hover:text-navy transition-colors" to="/consultoria">Serviços</Link>
            <Link className="text-sm text-executive hover:text-navy transition-colors" to="/sobre">Sobre Mim</Link>
            <Link className="text-sm text-executive hover:text-navy transition-colors" to="/blog">Blog</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="font-bold text-sm uppercase tracking-widest text-navy">Social</h5>
            <a className="text-sm text-executive hover:text-navy transition-colors" href="#">LinkedIn</a>
            <a className="text-sm text-executive hover:text-navy transition-colors" href="https://www.instagram.com/suyanemelre/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="text-sm text-executive hover:text-navy transition-colors" href="https://wa.me/5581994018011" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="pt-8 border-t border-silver flex justify-between items-center">
          <p className="text-xs text-executive flex items-center gap-1">
            © 2026 Suyane Melre CFP® <span className="hidden sm:inline">- Todos os direitos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
