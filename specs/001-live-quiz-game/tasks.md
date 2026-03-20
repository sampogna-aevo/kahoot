# Tasks: 001-live-quiz-game

**Input**: Design documents from `/specs/001-live-quiz-game/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js app**: `app/src/` for source code
- API routes in `app/src/app/api/`
- Components in `app/src/components/`
- Lib utilities in `app/src/lib/`
- Hooks in `app/src/hooks/`
- Types in `app/src/types/`

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize Next.js project with dependencies

- [x] T001 Initialize Next.js 14 project with TypeScript in `app/` directory
- [x] T002 Configure Tailwind CSS 4 in tailwind.config.ts
- [x] T003 [P] Install Supabase dependencies: `@supabase/supabase-js`
- [x] T004 [P] Create environment template `.env.local.example` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] T005 Create TypeScript config in `app/tsconfig.json`
- [x] T006 [P] Configure ESLint in `.eslintrc.json`
- [x] T007 Run `npm run lint` and fix any errors

---

## Phase 2: Foundational (Core Infrastructure)

**Purpose**: Shared types, utilities, and Supabase client setup

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Create shared types in `app/src/types/index.ts` (Room, Player, Question, Answer, Round, RoomState)
- [x] T009 Create Room type definition matching data-model.md
- [x] T010 Create Player type definition matching data-model.md
- [x] T011 Create Question type definition with options array and correctIndex
- [x] T012 Create Answer type definition with responseTime and points
- [x] T013 [P] Create Supabase client in `app/src/lib/supabase.ts`
- [x] T014 Create Room state management in `app/src/lib/room.ts` (in-memory store)
- [x] T015 Create room code generator utility in `app/src/lib/room-code.ts`
- [x] T016 Create error codes enum in `app/src/lib/error-codes.ts` (ROOM_NOT_FOUND, NICKNAME_TAKEN, etc.)
- [ ] T017 [P] Create Supabase Realtime client in `app/src/lib/realtime.ts`
- [ ] T018 Create useRealtime hook in `app/src/hooks/useRealtime.ts`

---

## Phase 3: User Story 1 - Criação de Sala pelo Apresentador (Priority: P1) 🎯 MVP

**Goal**: Host creates a room and receives a unique 6-character alphanumeric code

**Independent Test**: Create a room via API and verify a valid 6-char code is returned

### Implementation for User Story 1

- [x] T019 [US1] Create POST /api/room route handler in `app/src/app/api/room/route.ts`
- [x] T020 [US1] Create GET /api/room/[code] route handler in `app/src/app/api/room/[code]/route.ts`
- [x] T021 [US1] Create LandingPage component in `app/src/components/LandingPage.tsx`
- [ ] T022 [US1] Create CreateRoomButton component in `app/src/components/CreateRoomButton.tsx`
- [ ] T023 [US1] Implement room code display in `app/src/components/RoomCodeDisplay.tsx`
- [x] T024 [US1] Create RoomPage for host in `app/src/app/room/[code]/page.tsx`
- [ ] T025 [US1] Create LobbyView component for host waiting room in `app/src/components/LobbyView.tsx`
- [ ] T026 [US1] Create HostPanel component in `app/src/components/HostPanel.tsx`
- [ ] T027 [US1] Add Supabase realtime subscription for room updates in room page
- [x] T028 [US1] Implement room close functionality in `app/src/app/api/room/[code]/close/route.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Ingresso do Jogador na Sala (Priority: P1)

**Goal**: Players join a room using a code and unique nickname

**Independent Test**: Join a room with valid code and verify player appears in room

### Implementation for User Story 2

- [x] T029 [US2] Create POST /api/room/[code]/join route handler in `app/src/app/api/room/[code]/join/route.ts`
- [x] T030 [US2] Create JoinRoomForm component in `app/src/components/JoinRoomForm.tsx`
- [ ] T031 [US2] Create NicknameInput component in `app/src/components/NicknameInput.tsx`
- [x] T032 [US2] Add nickname validation (2-20 chars) in JoinRoomForm
- [ ] T033 [US2] Create PlayerList component in `app/src/components/PlayerList.tsx`
- [x] T034 [US2] Add localStorage for nickname recall in `app/src/lib/storage.ts`
- [ ] T035 [US2] Create error message component for invalid code in `app/src/components/ErrorMessage.tsx`
- [ ] T036 [US2] Create error message component for nickname taken in `app/src/components/ErrorMessage.tsx`
- [ ] T037 [US2] Create error message component for room closed in `app/src/components/ErrorMessage.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Realização do Quiz Completo (Priority: P1)

**Goal**: Quiz flow with questions, timer, and answer submission

**Independent Test**: Create room, join with players, start quiz, answer questions, verify final ranking

### Implementation for User Story 3

- [x] T038 [US3] Create hardcoded questions data in `app/src/data/questions.ts` (10 questions)
- [x] T039 [US3] Create POST /api/quiz/start route handler in `app/src/app/api/quiz/start/route.ts`
- [x] T040 [US3] Create POST /api/quiz/answer route handler in `app/src/app/api/quiz/answer/route.ts`
- [x] T041 [US3] Create POST /api/quiz/next route handler in `app/src/app/api/quiz/next/route.ts`
- [x] T042 [US3] Create QuestionCard component in `app/src/components/QuestionCard.tsx`
- [x] T043 [US3] Create AnswerOptions component with A, B, C, D buttons in `app/src/components/AnswerOptions.tsx`
- [x] T044 [US3] Create Timer component in `app/src/components/Timer.tsx`
- [x] T045 [US3] Create PlayerView component in `app/src/components/PlayerView.tsx`
- [x] T046 [US3] Create AnswerReveal component in `app/src/components/AnswerReveal.tsx`
- [x] T047 [US3] Create FinalRanking component in `app/src/components/FinalRanking.tsx`
- [x] T048 [US3] Implement server-side timestamp recording for answer submission
- [x] T049 [US3] Implement one-answer-per-question enforcement on server
- [ ] T050 [US3] Broadcast quiz events via Supabase Realtime (question:show, question:answer_revealed)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work as a complete game

---

## Phase 6: User Story 4 - Sistema de Pontuação por Velocidade (Priority: P2)

**Goal**: Points awarded based on speed formula: points = 1000 × (timeRemaining / timeTotal)

**Independent Test**: Two players answer correctly, faster player has more points

### Implementation for User Story 4

- [x] T051 [US4] Create scoring formula utility in `app/src/lib/scoring.ts`
- [x] T052 [US4] Implement score calculation on answer submission in `/api/quiz/answer`
- [ ] T053 [US4] Create ScoreDisplay component in `app/src/components/ScoreDisplay.tsx`
- [ ] T054 [US4] Create ScoreBoard component in `app/src/components/ScoreBoard.tsx`
- [ ] T055 [US4] Broadcast score updates via Supabase Realtime (score:updated)
- [ ] T056 [US4] Display score explanation in PlayerView component

**Checkpoint**: Scoring system is functional and transparent to players

---

## Phase 7: User Story 5 - Visão de Controle do Apresentador (Priority: P2)

**Goal**: Host sees real-time stats: current question, player count, response count

**Independent Test**: Verify host panel updates in real-time as players join and answer

### Implementation for User Story 5

- [x] T057 [US5] Enhance HostPanel with real-time stats in `app/src/components/HostPanel.tsx`
- [ ] T058 [US5] Create ResponseCounter component in `app/src/components/ResponseCounter.tsx`
- [ ] T059 [US5] Create QuestionProgress component in `app/src/components/QuestionProgress.tsx`
- [x] T060 [US5] Create NextQuestionButton component in `app/src/components/NextQuestionButton.tsx`
- [x] T061 [US5] Implement host-only actions: start quiz, next question, close room
- [ ] T062 [US5] Add waiting indicator when host clicks next before all answers

**Checkpoint**: Host has full control visibility and can manage game pace

---

## Phase 8: User Story 6 - Desconexão de Jogador (Priority: P3)

**Goal**: Clear message when player loses connection

**Independent Test**: Simulate disconnect and verify clear error message

### Implementation for User Story 6

- [ ] T063 [US6] Implement connection status tracking in `app/src/lib/realtime.ts`
- [ ] T064 [US6] Create ConnectionStatus component in `app/src/components/ConnectionStatus.tsx`
- [ ] T065 [US6] Display "Conexão perdida" message when player disconnects in `app/src/components/ErrorMessage.tsx`
- [ ] T066 [US6] Create ReconnectPrompt component in `app/src/components/ReconnectPrompt.tsx`
- [ ] T067 [US6] Broadcast player:left events via Supabase Realtime

**Checkpoint**: Players understand connection issues and have guidance

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T068 Add loading states to all API calls
- [ ] T069 Add loading spinner component in `app/src/components/LoadingSpinner.tsx`
- [x] T070 [P] Add responsive styling for mobile devices
- [ ] T071 [P] Add accessibility attributes (ARIA labels) to interactive elements
- [ ] T072 Create README.md in `app/` with setup instructions
- [x] T073 Run `npm run lint` and fix all issues
- [ ] T074 Test complete game flow end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1, US2, US3 can proceed in parallel after Foundational
  - US4, US5 depend on US3 (need quiz flow)
  - US6 depends on US2 (need player join)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational - No dependencies on other stories
- **US2 (P1)**: Can start after Foundational - Depends on US1 API (room creation)
- **US3 (P1)**: Can start after Foundational - Depends on US1 and US2
- **US4 (P2)**: Can start after US3 - Scoring built on quiz flow
- **US5 (P2)**: Can start after US3 - Host panel built on quiz flow
- **US6 (P3)**: Can start after US2 - Connection handling built on player join

### Within Each User Story

- API routes before UI components
- Core types before services
- Services before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- US1, US2, US3 can start in parallel after Foundational completes
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch these tasks together (different files, no dependencies):
Task: T019 - Create POST /api/room route handler
Task: T021 - Create LandingPage component
Task: T022 - Create CreateRoomButton component

# Then launch these after above complete:
Task: T023 - Create RoomCodeDisplay component
Task: T024 - Create RoomPage for host
Task: T025 - Create LobbyView component
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test room creation independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Room creation works
3. Add US2 → Test independently → Players can join
4. Add US3 → Test independently → Complete game playable
5. Add US4 → Test independently → Scoring works
6. Add US5 → Test independently → Host control works
7. Add US6 → Test independently → Disconnect handled

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
