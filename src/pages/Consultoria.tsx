import React from 'react';
import { mockData } from '../data/mockData';

export const Consultoria: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-navy py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold font-lexend">Uma Abordagem Global para o seu Patrimônio</h1>
          <p className="text-silver mt-6 text-lg max-w-2xl mx-auto">Nossa consultoria resolve pontas soltas, conectando sua carteira de investimentos ao seu planejamento sucessório e tributário.</p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockData.home.services.map(service => (
            <div key={service.id} className="bg-white border border-silver p-10 rounded-3xl shadow-sm hover:shadow-lg transition-all group">
              <div className="size-16 rounded-full bg-navy text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
              </div>
              <h2 className="text-2xl font-lexend text-navy mb-4 font-bold">{service.title}</h2>
              <p className="text-executive">{service.description}</p>
              <ul className="mt-6 space-y-2">
                <li className="flex gap-2 items-center text-sm text-executive font-medium">
                  <span className="material-symbols-outlined text-[16px] text-navy">check_circle</span> Mapeamento global
                </li>
                <li className="flex gap-2 items-center text-sm text-executive font-medium">
                  <span className="material-symbols-outlined text-[16px] text-navy">check_circle</span> Estratégia isenta
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>
      
      <section className="py-20 bg-white border-y border-silver text-center">
        <h2 className="text-3xl font-lexend text-navy font-bold">Agende seu Diagnóstico</h2>
        <button className="mt-8 bg-navy text-white px-8 py-4 rounded-full font-bold">Solicitar Contato</button>
      </section>
    </div>
  );
};

export default Consultoria;
