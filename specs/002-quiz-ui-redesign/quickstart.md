# Quickstart: Visual Redesign Implementation

## Prerequisites
- Node.js 18+
- pnpm installed
- Repository cloned on branch `002-quiz-ui-redesign`

## Setup

```bash
cd game/my-app
pnpm install
```

## Implementation Order

### Step 1: Theme Foundation
Update `app/globals.css`:
- Replace CSS custom properties with dark-first tokens
- Add `@theme inline` block for Tailwind v4 design tokens
- Add `@keyframes` for: fadeIn, slideUp, pulse, timerUrgency, correctFlash, incorrectShake
- Set `body` background to `#0f172a`

### Step 2: Toast System
Create `src/components/Toast.tsx` and `src/hooks/useToast.ts`:
- Fixed bottom-center container
- Auto-dismiss after 4 seconds
- Support error, success, info variants
- Optional action button (for retry)
- Add `<ToastContainer />` to `app/layout.tsx`

### Step 3: Landing Page Redesign
Refactor `src/components/LandingPage.tsx`:
- Create `LandingCard.tsx` — centered card on animated dark background
- Add gradient mesh or floating shape animation as background
- Logo + tagline + two full-width buttons
- Create `JoinForm.tsx` — extracted form with dark-styled inputs

### Step 4: Player Components
Create `src/components/PlayerCard.tsx`:
- Circle avatar with initials and deterministic color from nickname hash
- Nickname text (truncated at 15 chars)
- Score display (in quiz mode)
- Host badge indicator

### Step 5: Lobby Redesign
Create `src/components/RoomLobby.tsx`:
- Large room code display (3rem+ font size)
- Player card grid (2 columns on mobile, 3 on tablet)
- Empty state: "Waiting for players..."
- Host controls: Start Quiz (green), Close Room (red)

### Step 6: Answer Grid
Create `src/components/AnswerGrid.tsx` and `src/components/AnswerButton.tsx`:
- 2x2 CSS grid layout
- Four distinct jewel tone colors: ruby, sapphire, amber, emerald
- States: idle (colored card), selected (glow + scale), correct (green flash), incorrect (red shake), disabled (dimmed)
- Min 44px touch targets
- Optional position label (A, B, C, D or shape icons)

### Step 7: Timer
Create `src/components/TimerBar.tsx`:
- Circular SVG progress ring
- `stroke-dasharray` / `stroke-dashoffset` animation synced to timer
- Color transition: accent → warning → error based on remaining time
- Numeric countdown in center

### Step 8: Quiz Screen
Create `src/components/QuizQuestion.tsx`:
- Progress indicator (e.g., "3 / 10" with dot indicators)
- Question text (large, centered)
- TimerBar
- AnswerGrid
- Compose into room page conditional rendering

### Step 9: Ranking Screen
Create `src/components/RankingBoard.tsx` and `src/components/RankingItem.tsx`:
- Sorted list by score descending
- Top 3: gold/silver/bronze medal accents, larger avatar
- Remaining: compact list, scrollable
- "Play Again" button

### Step 10: Room Page Refactor
Refactor `src/app/room/[code]/page.tsx`:
- Replace monolithic conditional blocks with component composition
- Import and render: RoomLobby (AWAITING), QuizQuestion (IN_PROGRESS), RankingBoard (FINISHED)
- Wire toast notifications to all API error handling

## Verification

```bash
pnpm run lint    # No ESLint errors
pnpm run build   # Successful production build
pnpm run dev     # Visual check on localhost:3000
```

## Visual QA Checklist
- [ ] Landing page shows atmospheric dark background with centered card
- [ ] Create Room → Lobby shows room code prominently
- [ ] Join form has clear labels and dark input styling
- [ ] Player cards show colored avatar initials
- [ ] Quiz shows 2x2 answer grid with 4 jewel tone colors
- [ ] Timer is circular with color urgency shift at 3s
- [ ] Correct answer shows green flash animation
- [ ] Incorrect answer shows red shake animation
- [ ] Ranking shows top 3 with medal highlights
- [ ] Toast notifications appear bottom-center and auto-dismiss
- [ ] All screens readable on 375px mobile viewport
- [ ] Touch targets ≥ 44px on all buttons
