import React from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';

export const Blog: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-navy py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold font-lexend">Insights & Educação Financeira</h1>
          <p className="text-silver mt-4 text-lg">Análises exclusivas sobre as principais tendências de mercado para otimização de portfólios.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4">
          <span className="px-6 py-2 rounded-full bg-navy text-white text-sm font-bold cursor-pointer">Todos</span>
          <span className="px-6 py-2 rounded-full border border-silver text-executive text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Macroeconomia</span>
          <span className="px-6 py-2 rounded-full border border-silver text-executive text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">Planejamento Sucessório</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockData.home.articles.map(article => (
            <Link key={article.id} to="/post" className="flex flex-col gap-4 group cursor-pointer bg-white p-4 rounded-3xl border border-silver shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy">{article.category}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-2">
                <p className="text-xs text-executive flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {article.date}</p>
                <h4 className="font-lexend font-bold text-navy group-hover:text-navy/80 transition-colors line-clamp-2">{article.title}</h4>
                <p className="text-sm text-executive line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
