# Data Model: 001-live-quiz-game

## Entities

### Room

Represents a quiz game session created by a Host.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `code` | string | 6 chars, uppercase, alphanumeric | Unique room identifier |
| `hostId` | string | UUID | Host's connection/session ID |
| `state` | enum | `AWAITING`, `IN_PROGRESS`, `FINISHED` | Current room phase |
| `currentQuestion` | number | 0-indexed | Current question index |
| `createdAt` | timestamp | | When room was created |
| `updatedAt` | timestamp | | Last state change |

### Player

Represents a participant in a room.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | string | UUID | Unique player identifier |
| `nickname` | string | 2-20 chars | Display name in room |
| `roomCode` | string | FK to Room | Associated room |
| `score` | number | >= 0 | Current accumulated score |
| `isConnected` | boolean | | Live connection status |

### Question (MVP: Hardcoded)

Pre-defined questions loaded from code.

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | Question text |
| `options` | string[4] | Answer choices A, B, C, D |
| `correctIndex` | 0-3 | Index of correct answer |
| `timeLimit` | number | Seconds to answer (default: 10) |

### Answer

Records a player's response to a question.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `playerId` | string | FK to Player | Who answered |
| `questionIndex` | number | | Which question |
| `selectedIndex` | 0-3 | | Selected answer |
| `isCorrect` | boolean | | Whether correct |
| `responseTime` | number | ms | Time from question start |
| `points` | number | | Calculated score |

### Round

Groups questions into a quiz session.

| Field | Type | Description |
|-------|------|-------------|
| `questions` | Question[] | List of 10 questions |
| `currentIndex` | number | Current question position |

---

## State Transitions

### Room State Machine

```
[AWAITING] ──(host starts quiz)──> [IN_PROGRESS]
    │                                  │
    │                                  │
    +──(host closes)───────────────────┼──> [FINISHED]
    │                                  │
    +──(inactivity 30min)──────────────┘
```

### Player Connection States

```
[CONNECTED] ──(disconnect)──> [DISCONNECTED]
     │                              │
     │                              │
     +──(reconnect in same session)─┘
```

---

## Validation Rules

1. **Room Code**: 6 chars, uppercase A-Z + 2-9, unique
2. **Nickname**: 2-20 chars, unique within room
3. **One answer per player per question**: Enforced by server
4. **Timestamp accuracy**: Server records responseTime (not client)

---

## Relationships

```
Room (1) ──< (N) Player
Player (1) ──< (N) Answer
Room (1) ──< (N) Question (via Round)
```
