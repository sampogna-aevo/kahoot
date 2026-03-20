# Research: 001-live-quiz-game

## Realtime Service Selection

### Decision: Supabase Realtime

**Chosen**: Supabase Realtime (Broadcast + Presence)

**Rationale**:
1. Free tier: 200 concurrent connections, included with Supabase (no separate service needed)
2. Already aligned with "no self-hosted WebSocket" constraint
3. TypeScript SDK quality is excellent (`@supabase/supabase-js`)
4. Works well with Next.js on Vercel (serverless compatible)
5. Channel scoping per room is straightforward: `room:{code}`
6. Similar stack to known quiz game projects (e.g., supaquiz)
7. Presence feature useful for showing connected players

**Alternatives Considered**:

| Service | Free Tier | Pros | Cons |
|---------|-----------|------|------|
| Pusher | 100 concurrent, 200K msg/day | Simple API, reliable | Limited free tier, separate service |
| Ably | 200 concurrent, 6M msg/month | Best delivery guarantees | More complex, separate service |
| PartyKit | Pay per request | Edge-native, persistent rooms | Requires Cloudflare, pay tier |
| Supabase Realtime | 200 concurrent | Integrated, generous | Tied to Supabase ecosystem |

### Room Code Generation

**Decision**: 6-character alphanumeric, uppercase, URL-safe

```
Charset: ABCDEFGHJKLMNPQRSTUVWXYZ23456789 (excludes confusing chars: 0, O, I, 1, L)
Pattern: XXXXXX (6 digits)
Collision probability: ~1 in 2.7 billion (sufficient for MVP)
```

**Rationale**:
- 6 chars gives better UX than 4 (reduces typos)
- Excludes visually similar characters (0/O, I/1, L/1)
- Uppercase-only simplifies typing on mobile

### Vercel Serverless + In-Memory State

**Challenge**: Vercel serverless functions are stateless; in-memory storage doesn't persist.

**Solution for MVP**:
1. Use Supabase for state persistence (rooms table, presence for live state)
2. Realtime broadcasts handle the "in-memory feel"
3. This aligns with Minimal Persistence principle (no DB required for logic, but state survives restarts)

**Note**: For production, consider:
- Supabase for persistent state
- Or Redis for session state
- Or sticky sessions with dedicated server

---

## Additional Research

### Error Handling Strategy

| Error Case | User Message | Technical Code |
|------------|--------------|----------------|
| Room not found | "Código de sala inválido" | `ROOM_NOT_FOUND` |
| Room closed | "Esta sala já foi encerrada" | `ROOM_CLOSED` |
| Nickname taken | "Este apelido já está em uso na sala" | `NICKNAME_TAKEN` |
| Connection lost | "Conexão perdida. Por favor, aguarde a próxima rodada." | `CONNECTION_LOST` |

### Room Lifecycle States

```
AWAITING → IN_PROGRESS → FINISHED
   ↑           |
   |___________| (host closes early)
```

- **AWAITING**: Host created room, waiting for players
- **IN_PROGRESS**: Quiz started
- **FINISHED**: Quiz completed or host closed
