import React from 'react';
import { mockData } from '../data/mockData';

export const Sobre: React.FC = () => {
  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-lexend text-navy font-bold">10+ Anos de Excelência no Mercado Financeiro</h1>
          <p className="text-executive text-lg">
            Minha missão é trazer clareza e perpetuidade para o seu patrimônio, através de um aconselhamento totalmente isento de conflitos de interesse.
          </p>
        </div>
        
        <div className="flex gap-4 items-center flex-wrap">
            {['CFP®', 'Anbima CEA', 'CVM Registrada'].map(cert => (
              <div key={cert} className="px-4 py-2 border border-silver rounded-full">
                <span className="text-navy font-bold text-sm tracking-widest">{cert}</span>
              </div>
            ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12 bg-white rounded-3xl p-8 border border-silver shadow-sm">
          <div>
            <h2 className="text-2xl font-lexend text-navy mb-6">Minha Linha do Tempo</h2>
            <div className="border-l-2 border-silver pl-6 space-y-8">
               <div className="relative">
                 <div className="absolute -left-[31px] top-1 size-4 rounded-full bg-navy"></div>
                 <h4 className="font-bold text-navy">Início no Varejo Alta Renda</h4>
                 <p className="text-executive text-sm mt-1">Compreendendo as dinâmicas bancárias.</p>
               </div>
               <div className="relative">
                 <div className="absolute -left-[31px] top-1 size-4 rounded-full bg-navy/60"></div>
                 <h4 className="font-bold text-navy">Wealth Management</h4>
                 <p className="text-executive text-sm mt-1">Gestão de grandes fortunas e portfólios globais.</p>
               </div>
               <div className="relative">
                 <div className="absolute -left-[31px] top-1 size-4 rounded-full bg-silver"></div>
                 <h4 className="font-bold text-navy">Consultoria Independente</h4>
                 <p className="text-executive text-sm mt-1">Livre de metas de produtos. 100% focada no cliente.</p>
               </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-lexend text-navy">A Filosofia Independente</h2>
            <p className="text-executive">Ao atuar como consultora CVM independente, minha remuneração não é atrelada a comissões por produtos que eu recomendo.</p>
            <p className="text-executive">Isso garante que toda estratégia de alocação seja montada única e exclusivamente com base no que é matematicamente e conceitualmente melhor para você.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
