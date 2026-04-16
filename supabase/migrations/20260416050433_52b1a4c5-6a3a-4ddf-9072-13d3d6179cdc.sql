
CREATE TABLE public.diagnostic_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  objetivo TEXT,
  tempo_investimento TEXT,
  carteira_estruturada TEXT,
  incomodo_investimentos TEXT,
  investimento_ano TEXT,
  analise_inicial TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostic_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert diagnostic leads"
ON public.diagnostic_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "No public read access"
ON public.diagnostic_leads
FOR SELECT
USING (false);
