# Data Model: UI Visual Entities

> Note: This redesign does not change backend data structures. The entities below represent visual/UI concepts that the components manage internally.

## UI State Entities

### ScreenState
Represents the current view the user sees.

| Field | Type | Description |
|-------|------|-------------|
| current | `'landing' \| 'join' \| 'lobby' \| 'quiz' \| 'ranking'` | Active screen |
| previous | `'landing' \| 'join' \| 'lobby' \| 'quiz' \| 'ranking' \| null` | For transition direction |
| isLoading | `boolean` | Whether async operation is in progress |

**Transitions**: landing → join, landing → lobby (create), join → lobby, lobby → quiz, quiz → ranking, ranking → landing

### ToastState
Represents a notification message.

| Field | Type | Description |
|-------|------|-------------|
| id | `string` | Unique identifier for dismissal |
| message | `string` | Display text |
| type | `'error' \| 'success' \| 'info'` | Visual style |
| action | `{ label: string, onClick: () => void } \| null` | Optional retry button |
| duration | `number` | Auto-dismiss ms (default 4000) |

### TimerVisualState
Represents the timer's visual appearance.

| Field | Type | Description |
|-------|------|-------------|
| remaining | `number` | Seconds remaining (0-10) |
| total | `number` | Total seconds (10) |
| percentage | `number` | 0-100 for progress bar |
| urgency | `'normal' \| 'warning' \| 'critical'` | Color state (>3s, ≤3s, ≤1s) |

**Urgency thresholds**: normal (>3s), warning (1-3s), critical (<1s)

### AnswerButtonState
Represents a single answer option's visual state.

| Field | Type | Description |
|-------|------|-------------|
| index | `0 \| 1 \| 2 \| 3` | Position in grid |
| color | `'ruby' \| 'sapphire' \| 'amber' \| 'emerald'` | Assigned jewel tone |
| text | `string` | Answer text |
| state | `'idle' \| 'selected' \| 'correct' \| 'incorrect' \| 'disabled'` | Visual state |

**Color mapping**: 0=ruby, 1=sapphire, 2=amber, 3=emerald (fixed per position)

### PlayerAvatar
Represents a player's visual identifier.

| Field | Type | Description |
|-------|------|-------------|
| initials | `string` | First 2 chars of nickname, uppercased |
| bgColor | `string` | Deterministic hash-based color from nickname |
| nickname | `string` | Display name (truncated at 15 chars in compact views) |
| score | `number` | Current score |
| isHost | `boolean` | Visual host indicator |

### RankingEntry
Represents a position on the leaderboard.

| Field | Type | Description |
|-------|------|-------------|
| position | `number` | 1-indexed rank |
| player | `PlayerAvatar` | Player visual data |
| score | `number` | Final score |
| medal | `'gold' \| 'silver' \| 'bronze' \| null` | Top 3 indicator |

## Component Composition Map

```
LandingPage
├── LandingCard (atmospheric background + card)
│   ├── Logo
│   ├── Tagline
│   └── [CreateRoomBtn, JoinRoomBtn]

JoinForm
├── Input (room code)
├── Input (nickname)
└── SubmitBtn

RoomLobby
├── RoomCode (large display)
├── PlayerCard[] (grid, max 20)
└── HostControls (start/close)

QuizQuestion
├── ProgressIndicator (3/10)
├── QuestionText
├── TimerBar (circular SVG)
├── AnswerGrid
│   └── AnswerButton[4] (2x2, jewel tones)
└── HostControls (next/finish)

RankingBoard
├── RankingItem[0..2] (medal highlights)
├── RankingItem[3..n] (scrollable list)
└── ActionBtn (play again)
```
