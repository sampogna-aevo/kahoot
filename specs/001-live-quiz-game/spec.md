# Feature Specification: QuizAoVivo - Jogo de Quiz em Tempo Real

**Feature Branch**: `001-live-quiz-game`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "Jogo de quiz ao vivo inspirado no Kahoot com Apresentador e Jogadores, pontuação por velocidade, perguntas pré-definidas"

## User Scenarios & Testing

### User Story 1 - Criação de Sala pelo Apresentador (Priority: P1)

O Apresentador acessa a página inicial, cria uma nova sala e recebe um código único de 4-6 caracteres alfanuméricos para compartilhar com os jogadores. A sala permanece disponível até que o Apresentador a encerre explicitamente ou até expiração por inatividade.

**Why this priority**: Sem a criação de sala, nenhuma partida pode ocorrer. Este é o ponto de entrada obrigatório para todo o fluxo do jogo.

**Independent Test**: Pode ser testado isoladamente criando uma sala e verificando que um código válido é gerado e a sala existe no servidor.

**Acceptance Scenarios**:

1. **Given** o Apresentador está na página inicial, **When** clica em "Criar Sala", **Then** recebe um código alfanumérico único de 4-6 caracteres e a sala fica visível no servidor.

2. **Given** o Apresentador criou uma sala, **When** copia e compartilha o código com jogadores, **Then** os jogadores conseguem ingressar usando esse código.

---

### User Story 2 - Ingresso do Jogador na Sala (Priority: P1)

O Jogador acessa a página inicial, insere o código da sala e um apelido único. Se o código for válido e a sala estiver aberta, entra na sala e vê o estado atual. Se o apelido já existir na sala, recebe mensagem de rejeição clara.

**Why this priority**: Jogadores precisam entrar nas salas para participar. Este fluxo deve funcionar de forma confiável para garantir a experiência multiplayer.

**Independent Test**: Pode ser testado isoladamente verificando que jogadores conseguem entrar com códigos válidos e recebem erros claros para códigos inválidos ou salas fechadas.

**Acceptance Scenarios**:

1. **Given** o Jogador está na página inicial, **When** insere um código válido de sala existente e um apelido único, **Then** entra na sala e vê a tela de aguardar.

2. **Given** o Jogador tenta entrar com código inexistente, **When** submete o formulário, **Then** recebe mensagem de erro "Código de sala inválido".

3. **Given** o Jogador tenta entrar com apelido já utilizado na sala, **When** submete o formulário, **Then** recebe mensagem de erro "Este apelido já está em uso na sala".

4. **Given** o Jogador tenta entrar em sala encerrada, **When** submete o formulário, **Then** recebe mensagem de erro "Esta sala já foi encerrada".

---

### User Story 3 - Realização do Quiz Completo (Priority: P1)

O Apresentador inicia a rodada. Cada pergunta é exibida com temporizador configurado. Jogadores escolhem uma alternativa e confirmam (ou a resposta é enviada automaticamente ao fim do tempo). Após cada pergunta, a resposta correta é revelada. Ao final, o ranking é exibido.

**Why this priority**: Este é o coração da experiência do jogo - a competição em tempo real com pontuação por velocidade.

**Independent Test**: Pode ser testado como fluxo completo: criar sala, entrar com múltiplos jogadores, avançar perguntas e verificar pontuação e ranking final.

**Acceptance Scenarios**:

1. **Given** jogadores estão na sala aguardando, **When** o Apresentador clica em "Iniciar Quiz", **Then** a primeira pergunta é exibida para todos com o temporizador started.

2. **Given** uma pergunta está ativa com temporizador rodando, **When** o Jogador seleciona uma alternativa e confirma, **Then** a resposta é registrada com o timestamp exato.

3. **Given** uma pergunta está ativa, **When** o Jogador não envia resposta antes do fim do tempo, **Then** recebe 0 pontos naquela pergunta.

4. **Given** o Jogador enviou uma resposta válida, **When** tenta enviar outra resposta, **Then** a segunda resposta é rejeitada pelo servidor.

5. **Given** uma pergunta acabou (tempo esgotado ou todos responderam), **When** o Apresentador avança, **Then** a resposta correta é revelada para todos.

6. **Given** todas as perguntas foram respondidas, **When** o Apresentador encerra o jogo, **Then** o ranking final é exibido para todos.

---

### User Story 4 - Sistema de Pontuação por Velocidade (Priority: P2)

Quem acerta a pergunta ganha pontos proporcionais à velocidade da resposta. Quanto mais rápido, mais pontos. A fórmula deve ser simples e explicada na interface: `pontos = base × (tempo_restante / tempo_total)`. Quem erra ou não responde ganha 0.

**Why this priority**: A mecânica de pontuação é o diferencial competitivo que motiva os jogadores a responderem rápido.

**Independent Test**: Pode ser testado verificando que jogadores que acertam mais rápido recebem mais pontos que jogadores que acertam mais devagar.

**Acceptance Scenarios**:

1. **Given** dois jogadores acertam a mesma pergunta, **When** o primeiro enviou resposta em 2s e o segundo em 8s (tempo total 10s), **Then** o primeiro recebe mais pontos que o segundo.

2. **Given** o Jogador responde corretamente nos últimos segundos, **When** o tempo chega a zero, **Then** recebe pontuação mínima (proporcional ao tempo restante).

3. **Given** o Jogador responde incorretamente, **When** a pergunta termina, **Then** recebe 0 pontos naquela pergunta.

4. **Given** o Jogador não responde a tempo, **When** o tempo acaba, **Then** recebe 0 pontos naquela pergunta.

---

### User Story 5 - Visão de Controle do Apresentador (Priority: P2)

O Apresentador vê em tempo real: qual pergunta está ativa, quantos jogadores estão na sala, quantos já responderam. Pode avançar para próxima pergunta quando todos responderam ou quando o tempo acabar.

**Why this priority**: Permite ao Apresentador conduzir a dinâmica do jogo de forma informada e controlar o ritmo da partida.

**Independent Test**: Pode ser testado verificando que o painel do Apresentador atualiza em tempo real conforme jogadores entram e respondem.

**Acceptance Scenarios**:

1. **Given** o Apresentador está no painel de controle, **When** um jogador entra na sala, **Then** o contador de jogadores aumenta imediatamente.

2. **Given** uma pergunta está ativa, **When** jogadores enviam respostas, **Then** o contador de respostas aumenta em tempo real.

3. **Given** todos os jogadores já responderam, **When** o Apresentador clica em "Próxima Pergunta", **Then** avança imediatamente para próxima pergunta.

---

### User Story 6 - Desconexão de Jogador (Priority: P3)

Se um Jogador perde conexão durante a partida, recebe mensagem compreensível ao tentar reingressar (reconexão perfeita não é obrigatória no MVP).

**Why this priority**: Melhora a experiência do usuário em caso de problemas de rede, mesmo sem reconexão automática.

**Independent Test**: Pode ser testado simulando desconexão e verificando que a mensagem exibida é clara.

**Acceptance Scenarios**:

1. **Given** o Jogador perde conexão durante o jogo, **When** tenta reingressar na mesma sala, **Then** recebe mensagem "Conexão perdida. Por favor, aguarde a próxima rodada."

---

### Edge Cases

- O que acontece quando o Apresentador fecha o navegador durante a partida? O servidor encerra a sala e jogadores recebem notificação.
- Como lidar com jogadores que entram bem no meio de uma pergunta? Podem assistir mas não participam daquela pergunta.
- O que acontece se o Apresentador tenta avançar antes do tempo mínimo? Deve haver um botão "Avançar Manualmente" disponível.
- Como garantir que a sala não fica "órfã" se o Apresentador sai sem encerrar? Timeout de inatividade de 30 minutos.

## Requirements

### Functional Requirements

- **FR-001**: Sistema DEVE permitir ao Apresentador criar uma sala e receber código alfanumérico único de 4-6 caracteres.
- **FR-002**: Sistema DEVE permitir ao Jogador ingressar em sala existente usando código e apelido único.
- **FR-003**: Sistema DEVE validar apelidos e rejeitar duplicatas com mensagem clara.
- **FR-004**: Sistema DEVE validar códigos de sala e rejeitar códigos inválidos ou salas encerradas.
- **FR-005**: Sistema DEVE permitir ao Apresentador iniciar a rodada, avançando entre perguntas.
- **FR-006**: Sistema DEVE exibir cada pergunta com temporizador configurável (default 10 segundos).
- **FR-007**: Sistema DEVE registrar resposta do Jogador com timestamp exato no servidor.
- **FR-008**: Sistema DEVE permitir apenas uma resposta válida por pergunta por Jogador.
- **FR-009**: Sistema DEVE calcular pontuação baseada na velocidade: `pontos = 1000 × (tempo_restante / tempo_total)`.
- **FR-010**: Sistema DEVE atribuir 0 pontos para respostas incorretas ou não enviadas.
- **FR-011**: Sistema DEVE revelar a resposta correta após cada pergunta para todos os participantes.
- **FR-012**: Sistema DEVE exibir ranking final ordenado por pontuação total ao encerrar o jogo.
- **FR-013**: Sistema DEVE mostrar ao Apresentador: pergunta atual, total de jogadores, contagem de respostas.
- **FR-014**: Sistema DEVE ser autoridade central para todas as decisões (validade de resposta, fim de tempo, fase atual).
- **FR-015**: Sistema DEVE notificar jogadores quando a sala for encerrada.

### Key Entities

- **Sala**: Identificador único, código de acesso, estado (aguardando, ativa, encerrada), Apresentador associado, timestamp de criação.
- **Jogador**: Identificador único na sala, apelido, pontuação atual, conexão ativa.
- **Pergunta**: Texto da pergunta, 4 alternativas (A, B, C, D), índice da alternativa correta, tempo limite em segundos.
- **Resposta**: Jogador associated, pergunta associated, alternativa escolhida, timestamp de envio, se foi correta.
- **Rodada**: Lista de perguntas, índice da pergunta atual, estado (não_iniciada, em_andamento, finalizada).

## Clarifications

### Session 2026-03-20

- Q: Como funciona autenticação/identificação? → A: Sessão simples no navegador (localStorage) para recall de apelido, sem login formal.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Jogadores conseguem ingressar em sala e ver a pergunta em até 3 segundos após conexão estabelecida.
- **SC-002**: Sistema suporta pelo menos 50 jogadores simultâneos em uma mesma sala sem degradação perceptível de performance.
- **SC-003**: Pontuação é calculada e exibida corretamente para 100% das respostas válidas.
- **SC-004**: Ranking final reflete precisamente a pontuação acumulada de todos os jogadores.
- **SC-005**: Estados de erro (código inválido, sala encerrada, apelido duplicado) são comunicados ao usuário em até 1 segundo com mensagem compreensível.
- **SC-006**: Temporizador é sincronizado entre Apresentador e Jogadores com diferença máxima de 500ms.
- **SC-007**: Uma partida completa (10 perguntas) pode ser jogada do início ao fim sem erros técnicos.

## Assumptions

- O MVP utiliza perguntas pré-definidas embutidas no código (não há editor de perguntas).
- O número de perguntas é fixo em 10 para o MVP.
- O tempo padrão por pergunta é 10 segundos.
- A conexão é feita via WebSocket para tempo real.
- Não há persistência de dados após o encerramento da sala.
- Apelos devem ter entre 2-20 caracteres.
- Código da sala é gerado automaticamente e não pode ser escolhido pelo Apresentador.
- Sessão do Jogador é mantida via localStorage para recall de apelido em futuras sessões.
