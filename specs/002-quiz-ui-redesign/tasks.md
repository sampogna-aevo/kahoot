# Tasks: Modern UI Redesign for Quiz Application

**Input**: Design documents from `/specs/002-quiz-ui-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-interfaces.md

**Tests**: Not requested. Tests are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

All source files are under `game/my-app/` (Next.js App Router project).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization — no changes needed, project already exists.

No setup tasks required. The existing Next.js 16 + Tailwind CSS 4 project is ready.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Dark theme foundation and toast system that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T001 Define dark-first design tokens in `game/my-app/app/globals.css` using `@theme inline` (backgrounds: #0f172a, #1e293b, #334155; text: #f8fafc, #94a3b8, #64748b; accent: #6366f1; answer colors: #dc2626, #2563eb, #d97706, #059669; feedback: #22c55e, #ef4444; medals: #fbbf24, #94a3b8, #d97706)
- [x] T002 Define CSS animation keyframes in `game/my-app/app/globals.css` for: fadeIn, slideUp, pulse, timerUrgency, correctFlash, incorrectShake
- [x] T003 Set body background to dark and update base styles in `game/my-app/app/globals.css`
- [x] T004 [P] Create `game/my-app/src/components/Toast.tsx` — fixed bottom-center toast with auto-dismiss (4s), error/success/info variants, optional action button
- [x] T005 [P] Create `game/my-app/src/hooks/useToast.ts` — toast state management hook with add/remove/clear
- [x] T006 Add `<ToastContainer />` to `game/my-app/app/layout.tsx` and wire useToast

**Checkpoint**: Dark theme applied, toast system functional — user story implementation can now begin.

---

## Phase 3: User Story 1 — Host Creates and Manages Quiz Room (Priority: P1) 🎯 MVP

**Goal**: Host sees atmospheric landing page, creates room, sees lobby with player cards, starts quiz, views questions with timer and answer grid, advances questions, sees final ranking.

**Independent Test**: Open landing page → click "Criar Sala" → verify dark-themed lobby with room code → see player cards → start quiz → view question with timer and 2x2 answer grid → advance to ranking with medal highlights.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create `game/my-app/src/components/LandingCard.tsx` — atmospheric centered card with gradient mesh background, logo placeholder, tagline, two full-width buttons (Create Room / Join Room), loading state
- [x] T008 [US1] Refactor `game/my-app/src/components/LandingPage.tsx` — extract mode switching logic, delegate "home" view to LandingCard, delegate "join" view to JoinForm
- [x] T009 [P] [US1] Create `game/my-app/src/components/PlayerCard.tsx` — circle avatar with deterministic colored background from nickname hash, initials (first 2 chars uppercased), nickname text (truncated at 15 chars), optional score, host badge
- [x] T010 [P] [US1] Create `game/my-app/src/components/HostControls.tsx` — start quiz button (green), close room button (red), next question button, finish quiz button, all with dark theme styling
- [x] T011 [US1] Create `game/my-app/src/components/RoomLobby.tsx` — large room code display (3rem+ font), player card grid (2 cols mobile, 3 tablet), empty state message, host controls integration
- [x] T012 [P] [US1] Create `game/my-app/src/components/AnswerButton.tsx` — single answer with jewel tone colors (ruby/sapphire/amber/emerald by index), states: idle, selected (glow + scale), correct (green flash), incorrect (red shake), disabled (dimmed), min 44px touch target
- [x] T013 [US1] Create `game/my-app/src/components/AnswerGrid.tsx` — 2x2 CSS grid layout composing 4 AnswerButton components, maps color by index position
- [x] T014 [P] [US1] Create `game/my-app/src/components/TimerBar.tsx` — circular SVG progress ring with stroke-dasharray animation, color transitions: accent → warning (amber at 3s) → error (red at 1s), numeric countdown in center
- [x] T015 [US1] Create `game/my-app/src/components/QuizQuestion.tsx` — progress indicator ("3/10" with dot indicators), question text, TimerBar, AnswerGrid, host controls (next/finish)
- [x] T016 [P] [US1] Create `game/my-app/src/components/RankingItem.tsx` — single ranking row with position number, player avatar, nickname, score, medal accent (gold/silver/bronze for top 3)
- [x] T017 [US1] Create `game/my-app/src/components/RankingBoard.tsx` — sorted list of RankingItem, top 3 pinned with medal highlights, remaining scrollable, empty state, "Jogar Novamente" button
- [x] T018 [US1] Refactor `game/my-app/src/app/room/[code]/page.tsx` — replace monolithic conditional blocks with RoomLobby (AWAITING), QuizQuestion (IN_PROGRESS), RankingBoard (FINISHED) composition
- [x] T019 [US1] Wire toast notifications to all API error responses in `game/my-app/src/app/room/[code]/page.tsx` and `game/my-app/src/components/LandingPage.tsx`

**Checkpoint**: Host flow fully functional with dark theme — landing → lobby → quiz → ranking all visually redesigned.

---

## Phase 4: User Story 2 — Player Joins and Plays Quiz (Priority: P1)

**Goal**: Player sees join form with dark inputs, joins room, sees lobby with their avatar, answers questions in color-coded grid with visual feedback, sees timer urgency, views final ranking.

**Independent Test**: Click "Entrar em Sala" → enter code and nickname → verify lobby shows player card with avatar → answer questions in 2x2 grid → see correct/incorrect feedback → view ranking.

### Implementation for User Story 2

- [x] T020 [US2] Create `game/my-app/src/components/JoinForm.tsx` — room code input, nickname input (2-20 chars validation), dark-styled inputs with labels, submit button, back button, error display via toast
- [x] T021 [US2] Integrate JoinForm into `game/my-app/src/components/LandingPage.tsx` — replace inline join form with JoinForm component, wire onSubmit and onBack callbacks
- [x] T022 [US2] Wire answer submission feedback in `game/my-app/src/app/room/[code]/page.tsx` — set AnswerButton states (selected → correct/incorrect) based on quiz/answer API response, trigger toast on late submission

**Checkpoint**: Player flow fully functional — join → lobby → answer questions → see feedback → ranking.

---

## Phase 5: User Story 3 — Responsive Mobile Experience (Priority: P2)

**Goal**: All screens adapt to mobile viewports, touch targets meet 44px minimum, layouts work without horizontal scrolling on 375px+ screens.

**Independent Test**: Open app on 375px viewport → verify all screens fit → verify buttons are tappable → verify answer grid is usable → verify ranking scrolls properly.

### Implementation for User Story 3

- [x] T023 [US3] Audit and fix touch targets in `game/my-app/src/components/AnswerButton.tsx` — ensure minimum 44px height, add `active:scale-95` press feedback
- [x] T024 [US3] Audit and fix touch targets in `game/my-app/src/components/HostControls.tsx` — ensure all buttons ≥ 44px
- [x] T025 [US3] Audit and fix touch targets in `game/my-app/src/components/JoinForm.tsx` — ensure inputs and submit ≥ 44px height
- [x] T026 [US3] Verify responsive grid in `game/my-app/src/components/RoomLobby.tsx` — 2 columns on mobile (375px), 3 on tablet (768px), fits 20 player cards without horizontal scroll
- [x] T027 [US3] Add responsive padding and font sizing to `game/my-app/src/components/LandingCard.tsx` — full-width buttons on mobile, scaled typography

**Checkpoint**: All screens usable on 375px mobile viewport with proper touch targets.

---

## Phase 6: User Story 4 — Visual Feedback and Micro-interactions (Priority: P3)

**Goal**: Smooth transitions between screen states, animated answer feedback, timer urgency animations, button press effects.

**Independent Test**: Navigate between all screens → verify fade/slide transitions → answer correctly → see green flash → answer incorrectly → see red shake → watch timer color shift.

### Implementation for User Story 4

- [x] T028 [US4] Add screen transition animations in `game/my-app/src/app/room/[code]/page.tsx` — fade or slide transition when switching between lobby/quiz/ranking states using CSS classes from T002
- [x] T029 [US4] Implement correct answer animation in `game/my-app/src/components/AnswerButton.tsx` — apply `correctFlash` keyframe (scale pulse + green glow) when state is 'correct'
- [x] T030 [US4] Implement incorrect answer animation in `game/my-app/src/components/AnswerButton.tsx` — apply `incorrectShake` keyframe (horizontal shake + red highlight) when state is 'incorrect'
- [x] T031 [US4] Implement timer urgency animation in `game/my-app/src/components/TimerBar.tsx` — apply `timerUrgency` keyframe (pulse effect) when urgency is 'critical' (≤1s)
- [x] T032 [US4] Add button press animation in `game/my-app/src/components/LandingCard.tsx` — `active:scale-95` transition on Create/Join buttons
- [x] T033 [US4] Add loading spinner in `game/my-app/src/components/LandingPage.tsx` — replace plain text "Carregando..." with animated spinner for async states

**Checkpoint**: All micro-interactions and transitions are smooth and provide clear visual feedback.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements that span multiple user stories.

- [x] T034 [P] Verify WCAG AA contrast ratios for all answer button colors against dark card backgrounds in `game/my-app/src/components/AnswerButton.tsx`
- [x] T035 [P] Verify room code display is large enough (3rem+) for arm's-length readability in `game/my-app/src/components/RoomLobby.tsx`
- [x] T036 Truncate long player nicknames with ellipsis in all display locations: `game/my-app/src/components/PlayerCard.tsx`, `game/my-app/src/components/RankingItem.tsx`
- [x] T037 [P] Run `npm run lint` from `game/my-app/` and fix any errors
- [x] T038 [P] Run `npm run build` from `game/my-app/` to verify production build succeeds
- [x] T039 Verify "Jogar Novamente" clears localStorage keys (hostId, playerId, roomCode) in `game/my-app/src/components/RankingBoard.tsx`

**Checkpoint**: All polish items complete. Feature ready for review.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2 (Foundational)**: No dependencies — start immediately. BLOCKS all user stories.
- **Phase 3 (US1 - Host)**: Depends on Phase 2 completion. MVP target.
- **Phase 4 (US2 - Player)**: Depends on Phase 2 completion. Can run parallel to US1 (different components) but JoinForm integrates into LandingPage which US1 also touches.
- **Phase 5 (US3 - Mobile)**: Depends on Phase 3 + Phase 4 (needs components to exist before auditing touch targets).
- **Phase 6 (US4 - Micro-interactions)**: Depends on Phase 3 + Phase 4 (needs components to add animations to).
- **Phase 7 (Polish)**: Depends on all user stories complete.

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on other stories
- **US2 (P2)**: Can start after Phase 2 — shares LandingPage with US1, coordinate T020-T021 with T008
- **US3 (P3)**: Requires US1 + US2 components to exist (audit existing components)
- **US4 (P4)**: Requires US1 + US2 components to exist (add animations to existing components)

### Parallel Opportunities

```bash
# Phase 2 — all foundational tasks (different files):
T001 + T002 + T003 (all in globals.css — sequential)
T004 + T005 (Toast.tsx + useToast.ts — parallel)

# Phase 3 — US1 independent component creation:
T007 + T009 + T010 + T012 + T014 + T016 (all different files — parallel)

# Phase 4 — US2 components:
T020 (JoinForm.tsx — independent)

# Phase 5 — US3 audits (all different files):
T023 + T024 + T025 + T026 + T027 (parallel)

# Phase 6 — US4 animations (all different files):
T029 + T030 + T031 + T032 + T033 (parallel)

# Phase 7 — Polish (all different files):
T034 + T035 + T037 + T038 (parallel)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (dark theme + toasts)
2. Complete Phase 3: User Story 1 (host flow)
3. **STOP and VALIDATE**: Test host flow independently — landing → lobby → quiz → ranking
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Phase 2 → dark theme + toasts ready
2. Add US1 (Host) → test independently → **MVP!**
3. Add US2 (Player) → test independently
4. Add US3 (Mobile) → audit and fix
5. Add US4 (Animations) → polish
6. Phase 7 (Polish) → final pass

### Parallel Team Strategy

With multiple developers:
1. Team completes Phase 2 together
2. Once Phase 2 done:
   - Developer A: US1 (T007-T019)
   - Developer B: US2 (T020-T022) — coordinate on LandingPage.tsx
3. After US1 + US2:
   - Developer A: US3 (T023-T027)
   - Developer B: US4 (T028-T033)
4. Team: Phase 7 Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No backend changes — all tasks are frontend component creation/refactoring
- Portuguese (pt-BR) text must be preserved in all components
