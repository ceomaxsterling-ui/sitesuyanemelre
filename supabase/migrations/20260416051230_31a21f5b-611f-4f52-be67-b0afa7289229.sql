
DROP POLICY IF EXISTS "Anyone can insert diagnostic leads" ON public.diagnostic_leads;

CREATE POLICY "Anyone can insert diagnostic leads"
ON public.diagnostic_leads
FOR INSERT TO anon, authenticated
WITH CHECK (true);
