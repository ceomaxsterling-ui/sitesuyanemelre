import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from("diagnostic_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const headers = [
      "Nome", "Email", "WhatsApp", "Objetivo", "Tempo de Investimento",
      "Carteira Estruturada", "Incômodo nos Investimentos", "Investimento/Ano",
      "Análise Inicial", "Data de Envio"
    ];

    const fields: (keyof typeof data[0])[] = [
      "nome", "email", "whatsapp", "objetivo", "tempo_investimento",
      "carteira_estruturada", "incomodo_investimentos", "investimento_ano",
      "analise_inicial", "created_at"
    ];

    const escape = (v: string | null) => {
      if (v == null) return "";
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n")
        ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const csv = [
      headers.join(","),
      ...data.map((row: any) => fields.map(f => escape(row[f])).join(","))
    ].join("\n");

    return new Response(csv, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
