# Implementation Plan: 001-live-quiz-game

**Branch**: `001-live-quiz-game` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-live-quiz-game/spec.md`

## Summary

User Story 1: Criação de Sala pelo Apresentador (P1) - Host creates a room and receives a unique 4-6 character alphanumeric code. The room remains available until the host explicitly ends it or an inactivity timeout occurs.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 14+ (App Router), React 19, Tailwind CSS 4  
**Storage**: In-memory server state (per Minimal Persistence principle)  
**Testing**: ESLint via `npm run lint`  
**Target Platform**: Vercel (free tier), browser-based clients  
**Project Type**: Web application (frontend + API routes in single Next.js deployment)  
**Performance Goals**: Room creation < 500ms response time  
**Constraints**: No self-hosted WebSocket; must use Pusher, Ably, Supabase Realtime, or PartyKit  
**Scale/Scope**: MVP supports single room per session; 50 concurrent players per room

## Constitution Check

*GATE: Must pass before Phase 0 research.*

| Principle | Requirement | Status |
|-----------|-------------|--------|
| I. Host-Driven Authority | Host is authoritative source for room state | ✅ No conflict |
| II. Real-Time Communication | Use realtime service (Pusher/Ably/Supabase/PartyKit) | ⚠️ NEEDS CLARIFICATION: Which service? |
| IV. Minimal Persistence | Room state in server memory only | ✅ No conflict |
| V. Clear Error States | Friendly error messages required | ⚠️ NEEDS CLARIFICATION: Specific error codes? |

**Gate Result**: PARTIAL PASS - Realtime service choice pending research

## Project Structure

### Documentation (this feature)

```text
specs/001-live-quiz-game/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output (realtime service research)
├── data-model.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
app/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page (Host creates room / Player joins)
│   │   ├── room/[code]/page.tsx     # Room page (Host or Player view)
│   │   └── api/
│   │       └── room/
│   │           ├── route.ts         # POST: Create room
│   │           └── [code]/
│   │               └── route.ts     # GET: Get room state
│   ├── components/
│   │   ├── CreateRoomForm.tsx
│   │   ├── RoomCard.tsx
│   │   └── LobbyWaiting.tsx
│   ├── lib/
│   │   ├── room.ts                  # Room state management
│   │   ├── realtime.ts             # Realtime service abstraction
│   │   └── types.ts                # Shared TypeScript types
│   └── hooks/
│       └── useRealtime.ts           # Realtime subscription hook
server/
├── src/
│   ├── index.ts                     # Server entry point
│   ├── room.ts                     # Room state (in-memory)
│   └── realtime.ts                 # Realtime service adapter
types/
├── index.ts                         # Shared types between client/server
```

**Structure Decision**: Monorepo with `app/` (Next.js frontend/API) and `server/` (realtime event handler). Realtime service handles WebSocket abstraction externally (per constitution: no self-hosted WS).

## Phase 0: Research (Realtime Service Selection)

### Research Tasks

1. **Realtime Service Comparison**: Evaluate Pusher vs Ably vs Supabase Realtime vs PartyKit for this use case
   - Cost on free tier
   - Channel scoping per room
   - TypeScript SDK quality
   - Serverless/edge compatibility with Vercel

2. **Room Code Generation**: Best practices for generating unique 4-6 character alphanumeric codes
   - Collision probability
   - URL-safe characters
   - Case sensitivity considerations

3. **Vercel Serverless Limitations**: How to handle in-memory state with serverless functions
   - Cold start considerations
   - Room state persistence strategy

**Decision needed**: Which realtime service to use?

## Complexity Tracking

> Fill only if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

---

## Phase 1: Design & Contracts

### Deliverables Completed

- [x] research.md - Realtime service research (Supabase Realtime chosen)
- [x] data-model.md - Entity definitions (Room, Host, Player, Answer, Round)
- [x] contracts/api.md - REST API endpoints for room management
- [x] contracts/realtime.md - Supabase Realtime events and channels
- [x] quickstart.md - Development setup instructions

### Constitution Check (Post-Design)

| Principle | Requirement | Status |
|-----------|-------------|--------|
| I. Host-Driven Authority | Host is authoritative source for room state | ✅ Consistent |
| II. Real-Time Communication | Supabase Realtime (channels per room) | ✅ Consistent |
| IV. Minimal Persistence | In-memory + Supabase for state survival | ✅ Consistent |
| V. Clear Error States | Error codes defined in API contract | ✅ Consistent |

**Gate Result**: PASS - All constitution principles satisfied

---

## Next Steps

1. Run `/speckit.tasks` to generate `tasks.md` from this plan
2. Implement Phase 1: Setup (project initialization)
3. Implement Phase 2: User Story 1 (room creation)
