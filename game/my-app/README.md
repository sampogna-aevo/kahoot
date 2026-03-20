# QuizAoVivo

Jogo de Quiz em Tempo Real - Plataforma multiplayer para jogar quiz com amigos!

## Tecnologias

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Linguagem**: TypeScript
- **Realtime**: Supabase Realtime
- **Armazenamento**: Estado em memória (servidor)

## Getting Started

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.local.example .env.local
   ```
   Adicione suas credenciais do Supabase.

3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Como Jogar

### Para o Apresentador:
1. Clique em "Criar Sala"
2. Compartilhe o código da sala com os jogadores
3. Aguarde os jogadores entrarem
4. Clique em "Iniciar Quiz" quando todos estiverem prontos
5. Avance para a próxima pergunta após cada rodada

### Para os Jogadores:
1. Clique em "Entrar em Sala"
2. Digite o código da sala
3. Escolha seu nickname
4. Aguarde o apresentador iniciar o quiz
5. Responda as perguntas antes do tempo acabar!

## Funcionalidades

- ✅ Criação de sala com código único de 6 caracteres
- ✅ Entrada de jogadores com nickname
- ✅ Quiz com 10 perguntas de múltipla escolha
- ✅ Sistema de pontuação por velocidade
- ✅ Timer de 10 segundos por pergunta
- ✅ Ranking final com colocação
- ✅ Interface responsiva para mobile

## Scripts Disponíveis

```bash
pnpm dev      # Inicia o servidor de desenvolvimento
pnpm build    # Cria a versão de produção
pnpm start    # Inicia o servidor de produção
pnpm lint     # Executa o linter
```a
