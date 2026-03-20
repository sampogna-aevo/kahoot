<!--
Sync Impact Report
==================
Version: 1.0.0 → 1.1.0
- MINOR bump: Added deployment and realtime technology constraints

Modified Principles: None (principles unchanged)

Sections Modified:
  - Technology Constraints: Updated realtime and deployment requirements

Added Sections: None

Removed Sections: None

Templates Requiring Updates: ✅ All templates consistent (no changes needed)
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
  - .specify/templates/checklist-template.md
  - .specify/templates/agent-file-template.md

Follow-up TODOs: None
-->

# QuizLive Constitution

## Core Principles

### I. Host-Driven Authority

The Host is the authoritative source of truth for all game state: current phase, current question index, and timer start/end timestamps. The server MUST enforce this authority by rejecting submissions that arrive after the timer expires or after the question has advanced. Each player MAY submit at most one answer per question; subsequent submissions for the same question MUST be rejected.

Rationale: Prevents cheating, ensures fairness, and keeps the game loop deterministic for all players.

### II. Real-Time Communication

All clients (Host and Players) receive live game state updates via WebSocket. The server MUST broadcast phase transitions, question changes, answer reveals, and score updates to all connected clients immediately. Clients MUST implement reconnection logic with graceful degradation (e.g., rejoin the current game on disconnect).

Rationale: The quiz experience is fundamentally synchronous; without real-time updates the game loop breaks.

### III. Speed-Based Scoring

Points are awarded using the formula: `basePoints × (1 − responseTime / maxTime)`. `basePoints` is a fixed constant (e.g., 1000); `responseTime` is the elapsed milliseconds from question display to submission; `maxTime` is the total question timer in milliseconds. Minimum award is 0 for correct answers, and 0 for incorrect answers regardless of speed. The formula MUST be documented and consistent.

Rationale: Rewards both correctness and speed without creating an impossibly tight winner-take-all dynamic.

### IV. Minimal Persistence

All game state lives in server memory for the duration of a session. No persistent storage is required beyond what is needed to survive a server restart of the active session. No authentication providers, no user profiles, no payment systems. A game session ends when the Host closes it or the last player disconnects.

Rationale: Keeps the demo simple and focused; persistence is out of scope unless explicitly added later.

### V. Clear Error States

Every client-facing error condition MUST display a friendly, actionable message. Specifically: invalid game codes must report "Game not found"; disconnected players must see a reconnection prompt; the Host must see if fewer than 2 players have joined. No silent failures; no raw stack traces exposed to end users.

Rationale: A quiz game with unclear errors destroys the experience for non-technical users.

## Technology Constraints

- **Stack**: Next.js (React 19, TypeScript 5) with Tailwind CSS 4
- **Deployment**: Vercel (free tier); single Next.js deployment (frontend + API routes)
- **Realtime**: Pusher, Ably, Supabase Realtime, or PartyKit; channels scoped per game room; no self-hosted WebSocket server in the repository
- **Styling**: Tailwind CSS utility classes only; no CSS modules or styled-components
- **Testing**: ESLint linting via `npm run lint`; no mandatory TDD for this project

## Development Workflow

- All features start from user stories in `specs/<feature>/spec.md`
- Implementation follows the speckit workflow: specify → plan → tasks → implement → analyze
- Every feature branch MUST have a corresponding spec before planning begins
- Complexity trade-offs MUST be documented in `plan.md` if they deviate from these principles
- README.md lives at `game/my-app/README.md` and documents how to run locally

## Governance

The Constitution is the highest-priority project document. All speckit artifacts (specs, plans, tasks, checklists) and all source code MUST comply with its principles. Deviations MUST be explicitly justified in the relevant artifact and approved by the project owner.

**Amendment Procedure**: To amend this constitution, update the `.specify/memory/constitution.md` file with a version bump, document the change in the Sync Impact Report comment at the top, and update all affected templates.

**Compliance Review**: The `/speckit.analyze` command validates that spec, plan, and tasks align with these principles. CRITICAL violations block implementation.

**Versioning Policy**: MAJOR bumps for principle removals or redefinitions; MINOR for additions or expanded guidance; PATCH for wording/typo fixes.

**Version**: 1.1.0 | **Ratified**: 2026-03-20 | **Last Amended**: 2026-03-20
