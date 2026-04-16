import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const ExportLeads: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('export-leads', {
        method: 'GET',
      });

      if (fnError) throw fnError;

      // data is already parsed, we need the raw response
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Erro ao exportar:', err);
      setError('Não foi possível exportar os leads. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-8">
        <div
          className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center"
          style={{ boxShadow: '0 16px 48px -8px rgba(30,41,59,0.3)' }}
        >
          <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            download
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-lexend font-bold text-3xl text-navy tracking-tight">
            Exportar Leads
          </h1>
          <p className="font-inter text-[#475569] text-base leading-relaxed">
            Baixe todos os dados dos leads do diagnóstico em formato CSV para importar no Excel, Google Sheets ou qualquer CRM.
          </p>
        </div>

        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-inter">
            {error}
          </div>
        )}

        <button
          onClick={handleExport}
          disabled={loading}
          className="w-full bg-navy text-white font-lexend font-semibold text-base px-8 py-4 rounded-full hover:bg-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          style={{ boxShadow: '0 8px 32px -8px rgba(30,41,59,0.4)' }}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {loading ? 'hourglass_empty' : 'table_chart'}
          </span>
          {loading ? 'Gerando arquivo...' : 'Baixar CSV dos Leads'}
        </button>

        <a href="/" className="font-inter text-sm text-[#64748B] hover:text-navy transition-colors underline">
          ← Voltar para o site
        </a>
      </div>
    </section>
  );
};
