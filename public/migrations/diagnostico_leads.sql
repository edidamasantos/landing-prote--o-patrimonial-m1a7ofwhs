-- Migração: Criação da tabela de leads do Diagnóstico Patrimonial
-- Escritório Damasceno Santos Advocacia
--
-- Instruções:
-- Quando o Supabase for conectado ao projeto, execute este script no SQL Editor
-- do painel do Supabase. Ele cria a tabela com tipos estritos e ativa o
-- Row Level Security (RLS) permitindo exclusivamente INSERT por usuários anônimos (anon),
-- sem permissão pública de SELECT, UPDATE ou DELETE, garantindo a proteção dos dados dos clientes.

CREATE TABLE IF NOT EXISTS public.diagnostico_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    escolha TEXT NOT NULL,
    respostas JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ativar Row Level Security (RLS)
ALTER TABLE public.diagnostico_leads ENABLE ROW LEVEL SECURITY;

-- Política de RLS: apenas INSERT anônimo é permitido para os visitantes do site
CREATE POLICY "Permitir inserção anônima de leads do diagnóstico"
    ON public.diagnostico_leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Nenhuma política pública de SELECT/UPDATE/DELETE é criada para a role 'anon',
-- impedindo que visitantes consultem ou alterem dados de outros interessados.
-- O acesso de leitura fica restrito à role de serviço (service_role) e administradores autenticados.

COMMENT ON TABLE public.diagnostico_leads IS 'Leads capturados através do funil da Matriz de Decisão do Diagnóstico Patrimonial.';
COMMENT ON COLUMN public.diagnostico_leads.escolha IS 'Prevalência do próximo passo escolhido pelo interessado na pergunta 7.';
COMMENT ON COLUMN public.diagnostico_leads.respostas IS 'Objeto JSON com as respostas completas das 7 perguntas e os resultados calculados.';
