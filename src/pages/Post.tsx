import React from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';

export const Post: React.FC = () => {
  const article = mockData.home.articles[0];

  return (
    <div className="bg-white pb-20">
      <article className="max-w-3xl mx-auto px-6 pt-12">
        <header className="mb-10 text-center flex flex-col items-center">
          <span className="px-3 py-1 bg-white border border-silver rounded-full text-[10px] font-bold uppercase tracking-widest text-executive mb-6">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-lexend font-bold text-navy mb-6">
            O impacto da Selic no seu portfólio de longo prazo
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-executive font-medium">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">account_circle</span> Suyane Melre</span>
            <span>•</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {article.date}</span>
          </div>
        </header>

        <figure className="w-full aspect-[21/9] md:aspect-video rounded-3xl overflow-hidden mb-12 shadow-sm border border-silver">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale" />
        </figure>

        <div className="prose prose-lg max-w-none text-executive font-inter">
          <p className="text-xl text-navy font-medium mb-8 leading-relaxed">
            A oscilação das taxas de juros é um dos fatores mais determinantes na estruturação de carteiras de alta renda. Compreender essa dinâmica exige mais do que uma visão temporal, mas uma estratégia estrutural.
          </p>

          <p className="mb-6">
            Historicamente, o mercado brasileiro se acostumou com rentabilidades nominais expressivas em produtos de Renda Fixa com baixo risco. Isso formou uma geração de investidores que, por vezes, negligencia a necessidade de diversificação em ativos imobiliários, renda variável ou exposição internacional.
          </p>

          <blockquote className="border-l-4 border-navy bg-white shadow-sm p-6 rounded-r-2xl my-10 italic text-navy border-y border-r border-silver">
            "Não existe portfólio blindado se a sua alocação está 100% concentrada em indexadores atrelados à mesma decisão política local."
          </blockquote>

          <h3 className="text-2xl font-lexend font-bold text-navy mt-10 mb-6">Como agir neste cenário?</h3>
          <ul className="space-y-4 mb-10 list-disc pl-6">
             <li>Rebalanceie portfólios buscando juros reais em vez de retornos nominais ilusórios.</li>
             <li>Avalie produtos isentos e como eles dialogam com a inflação de longo prazo.</li>
             <li>Dolarize parte da sua reserva de forma inteligente, fugindo do chamado "risco-país".</li>
          </ul>
        </div>
        
        <section className="mt-16 p-8 bg-white border border-silver rounded-3xl flex items-center gap-6 shadow-sm">
           <img src={mockData.home.hero.image} alt="Suyane Melre" className="size-20 rounded-full object-cover grayscale" />
           <div>
             <h4 className="font-lexend font-bold text-navy text-lg">Suyane Melre CFP®</h4>
             <p className="text-sm text-executive">Consultora de Investimentos especialista em Wealth Management e perpetuidade de patrimônio independente.</p>
           </div>
        </section>
      </article>

      <section className="max-w-7xl mx-auto px-6 py-20 mt-20 border-t border-silver">
        <h3 className="font-lexend text-2xl font-bold text-navy mb-10">Leia Também</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {mockData.home.articles.slice(1, 4).map(relArticle => (
             <Link key={relArticle.id} to="/post" className="group">
                <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-silver">
                   <img src={relArticle.image} alt={relArticle.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="font-lexend font-bold text-navy group-hover:underline">{relArticle.title}</h4>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Post;
