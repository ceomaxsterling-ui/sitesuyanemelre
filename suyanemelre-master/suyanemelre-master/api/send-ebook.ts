import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Inicializa Supabase apenas se houver credenciais
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!supabase) {
    console.error('❌ ERRO CRÍTICO: Credenciais do Supabase não configuradas no ambiente (Vercel).');
    // Não paramos o fluxo para não prejudicar o usuário final, 
    // mas o log acima aparecerá no dashboard da Vercel para o desenvolvedor.
  }

  const {
    nome,
    email,
    whatsapp,
    objetivo,
    tempo_investimento,
    carteira_estruturada,
    incomodo_investimentos,
    investimento_ano,
    analise_inicial
  } = req.body;

  try {
    // 1. Salvar no Supabase (apenas se configurado)
    if (supabase) {
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            nome,
            email,
            whatsapp,
            objetivo,
            tempo_investimento,
            carteira_estruturada,
            incomodo_investimentos,
            investimento_ano,
            analise_inicial
          }
        ]);

      if (dbError) {
        console.error('Erro ao salvar no Supabase:', dbError.message);
      }
    }

    // 2. Enviar E-mail para o Cliente (E-books)
    const { error: clientEmailError } = await resend.emails.send({
      from: 'Suyane Melre <contato@suyanemelre.com.br>',
      to: email,
      subject: '🎁 [ACESSO LIBERADO] Seus 3 E-books + Diagnóstico',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B; background-color: #ffffff; padding: 40px; border: 1px solid #E2E8F0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #091426; margin: 0; font-size: 24px;">Diagnóstico Concluído 🎉</h1>
            <p style="color: #64748B; font-size: 16px; margin-top: 8px;">Aqui está o seu presente especial!</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">Olá <strong>${nome}</strong>, obrigado por realizar o nosso diagnóstico! Já liberei o seu acesso aos nossos 3 e-books exclusivos.</p>
          
          <div style="background-color: #F8FAFC; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #091426;">
            <h3 style="margin-top: 0; font-size: 18px; color: #091426;">📚 Seus materiais liberados:</h3>
            <ul style="color: #475569; font-size: 15px; margin-bottom: 20px; line-height: 1.8;">
              <li><strong>E-book 01</strong>: Efeito Manada</li>
              <li><strong>E-book 02</strong>: Os 5 erros silenciosos</li>
              <li><strong>E-book 03</strong>: Consultoria para a Vida</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://drive.google.com/drive/u/4/folders/1ChGxEAHAuJEHJdw6vGeIvq6Cn_OvmQnZ" target="_blank" style="display: inline-block; background-color: #091426; color: #ffffff; text-decoration: none; font-weight: bold; padding: 16px 32px; border-radius: 8px; font-size: 16px;">
                📥 ACESSAR PASTA COM OS E-BOOKS
              </a>
            </div>
          </div>
          
          <p style="font-size: 16px; font-weight: bold; color: #091426; margin-top: 30px;">Abs,<br>Suyane Melre</p>
        </div>
      `,
    });

    // 3. Enviar E-mail de Notificação (Lead Completo para o Dono)
    await resend.emails.send({
      from: 'Sistema Leads <contato@suyanemelre.com.br>',
      to: 'contato@suyanemelre.com.br',
      bcc: 'saviomaxwell088@gmail.com',
      subject: `🚀 NOVO LEAD: ${nome}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #1e293b;">
          <h2>Novo Lead Interessado! 🎉</h2>
          <p>Um novo diagnóstico foi preenchido no site.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Nome</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${nome}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">E-mail</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${email}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">WhatsApp</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${whatsapp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Objetivo</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${objetivo}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Tempo Investindo</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${tempo_investimento}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Carteira Estruturada</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${carteira_estruturada}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Maior Incômodo</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${incomodo_investimentos}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Investimento Anual</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${investimento_ano}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Deseja Análise?</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${analise_inicial}</td>
            </tr>
          </table>
          
          <p style="font-size: 12px; color: #64748b;">Este lead foi automaticamente salvo no Supabase.</p>
        </div>
      `,
    });

    if (clientEmailError) {
      console.error('Resend error:', clientEmailError);
      return res.status(500).json({ error: clientEmailError.message });
    }

    return res.status(200).json({ ok: true });
    
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Falha ao processar diagnóstico' });
  }
}