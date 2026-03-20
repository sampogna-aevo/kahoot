# Implementation Plan: Modern UI Redesign for Quiz Application

**Branch**: `002-quiz-ui-redesign` | **Date**: 2026-03-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-quiz-ui-redesign/spec.md`

## Summary

Redesign the QuizAoVivo application with a dark-first modern visual theme. Extract monolithic UI into reusable components, implement atmospheric landing page, color-coded 2x2 answer grid with muted jewel tones, toast notifications, timer progress bar, player avatars, and smooth micro-interactions. No backend changes — frontend visual/UX only.

## Technical Context

**Language/Version**: TypeScript 5, React 19  
**Primary Dependencies**: Next.js 16.2.0, Tailwind CSS 4  
**Storage**: N/A (in-memory server state unchanged)  
**Testing**: ESLint via `npm run lint`  
**Target Platform**: Web (mobile-first, modern browsers)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Transitions < 300ms, answer feedback < 200ms, no layout shift on load  
**Constraints**: Tailwind utility classes only (no CSS modules), dark-first palette, WCAG AA contrast for answer buttons  
**Scale/Scope**: 5 pages/screens, ~8-10 new components, max 20 players per room  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Host-Driven Authority | PASS | No backend changes; UI respects host controls |
| II. Real-Time Communication | PASS | No changes to communication layer |
| III. Speed-Based Scoring | PASS | No scoring logic changes |
| IV. Minimal Persistence | PASS | No storage changes |
| V. Clear Error States | PASS | Toast notifications improve error visibility |

**Technology Constraints**: PASS
- Stack: Next.js + React 19 + TypeScript 5 + Tailwind CSS 4 ✓
- Styling: Tailwind utility classes only ✓
- Testing: ESLint linting ✓

## Project Structure

### Documentation (this feature)

```text
specs/002-quiz-ui-redesign/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (app)

```text
game/my-app/
├── app/
│   ├── globals.css              # UPDATE: dark theme tokens, animations
│   ├── layout.tsx               # UPDATE: dark background, toast container
│   └── page.tsx                 # unchanged
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # REFACTOR: split into sub-components
│   │   ├── LandingCard.tsx      # NEW: atmospheric centered card
│   │   ├── JoinForm.tsx         # NEW: extracted join form
│   │   ├── RoomLobby.tsx        # NEW: extracted lobby view
│   │   ├── PlayerCard.tsx       # NEW: player avatar + name card
│   │   ├── QuizQuestion.tsx     # NEW: question + timer + progress
│   │   ├── AnswerGrid.tsx       # NEW: 2x2 color-coded grid
│   │   ├── AnswerButton.tsx     # NEW: single answer with states
│   │   ├── TimerBar.tsx         # NEW: circular/linear progress
│   │   ├── RankingBoard.tsx     # NEW: sorted leaderboard
│   │   ├── RankingItem.tsx      # NEW: single ranking entry
│   │   ├── HostControls.tsx     # NEW: start/next/finish buttons
│   │   └── Toast.tsx            # NEW: notification system
│   ├── hooks/
│   │   └── useToast.ts          # NEW: toast state management
│   ├── app/
│   │   └── room/[code]/page.tsx # REFACTOR: compose from new components
│   ├── lib/                     # unchanged
│   └── types/                   # unchanged
└── public/                      # unchanged
```

## Implementation Phases

### Phase 0: Research & Foundation

1. Define dark-first color palette in `globals.css` using `@theme inline`
2. Define CSS animation keyframes for transitions, timer urgency, answer feedback
3. Set body background to dark (`#0f172a`)
4. Research Tailwind v4 `@theme` syntax for custom design tokens

### Phase 1: Component Extraction & Core Redesign

**Priority order (each independently deployable):**

1. **Theme & tokens** — Update `globals.css` with dark palette, animations
2. **LandingCard** — Atmospheric centered card with background pattern/gradient mesh
3. **JoinForm** — Extracted form with dark inputs, validation feedback
4. **Toast system** — `Toast.tsx` + `useToast` hook, non-blocking auto-dismiss
5. **PlayerCard** — Avatar (initials + colored bg), nickname, score display
6. **RoomLobby** — Player grid, room code display, host controls
7. **AnswerButton** — Single answer with idle/selected/correct/wrong states
8. **AnswerGrid** — 2x2 grid with ruby/sapphire/amber/emerald colors
9. **TimerBar** — Circular progress with urgency color shift at 3s
10. **QuizQuestion** — Composes question text, TimerBar, AnswerGrid, progress indicator
11. **RankingBoard** — Sorted list, top 3 medal highlights, scrollable for 20 players
12. **RankingItem** — Single row with position, avatar, name, score
13. **HostControls** — Start quiz, next question, finish quiz buttons
14. **Refactor room page** — Compose RoomLobby, QuizQuestion, RankingBoard based on state

### Phase 2: Polish & Integration

1. Wire toast notifications to all API error responses
2. Add transition animations between screen states (lobby → quiz → ranking)
3. Ensure mobile touch targets ≥ 44px
4. Truncate long nicknames with ellipsis
5. Add loading spinners/skeletons for async states
6. Test on 375px, 768px, 1024px viewports

## Design Token Reference

```css
/* Dark background layers */
--bg-base: #0f172a
--bg-card: #1e293b
--bg-elevated: #334155

/* Text hierarchy */
--text-primary: #f8fafc
--text-secondary: #94a3b8
--text-muted: #64748b

/* Accent (CTAs, primary actions) */
--accent: #6366f1
--accent-hover: #818cf8

/* Answer buttons (muted vibrant jewel tones) */
--answer-ruby: #dc2626
--answer-sapphire: #2563eb
--answer-amber: #d97706
--answer-emerald: #059669

/* Feedback */
--success: #22c55e
--error: #ef4444
--warning: #f59e0b

/* Ranking medals */
--gold: #fbbf24
--silver: #94a3b8
--bronze: #d97706
```

## Complexity Tracking

No constitution violations. This is a pure visual/UX redesign with no architectural changes.
