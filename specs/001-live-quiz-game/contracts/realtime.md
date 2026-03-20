# Realtime Contracts: Supabase Realtime

## Channel Structure

```
Channel: room:{code}
- All room participants subscribe to this channel
- Host and Players receive same events
```

## Events

### Server → Client Events

#### `player:joined`
Broadcast when a new player enters the room.
```json
{
  "type": "player:joined",
  "player": {
    "id": "uuid",
    "nickname": "Player1",
    "isConnected": true
  }
}
```

#### `player:left`
Broadcast when a player disconnects.
```json
{
  "type": "player:left",
  "playerId": "uuid"
}
```

#### `room:closed`
Broadcast when host closes the room.
```json
{
  "type": "room:closed",
  "reason": "HOST_CLOSED"
}
```

#### `quiz:started`
Broadcast when host begins the quiz.
```json
{
  "type": "quiz:started",
  "totalQuestions": 10
}
```

#### `question:show`
Broadcast when a new question is displayed.
```json
{
  "type": "question:show",
  "questionIndex": 0,
  "question": {
    "text": "What is 2+2?",
    "options": ["3", "4", "5", "6"],
    "timeLimit": 10
  }
}
```

#### `question:answer_revealed`
Broadcast after question time ends.
```json
{
  "type": "question:answer_revealed",
  "questionIndex": 0,
  "correctIndex": 1
}
```

#### `score:updated`
Broadcast after each answer is processed.
```json
{
  "type": "score:updated",
  "scores": {
    "player-uuid-1": 850,
    "player-uuid-2": 720
  }
}
```

#### `quiz:finished`
Broadcast when quiz completes.
```json
{
  "type": "quiz:finished",
  "ranking": [
    { "nickname": "Player1", "score": 8500 },
    { "nickname": "Player2", "score": 7200 }
  ]
}
```

### Client → Server Events (via Supabase RPC)

#### `answer:submit`
Submit player's answer to a question.
```json
{
  "type": "answer:submit",
  "questionIndex": 0,
  "selectedIndex": 1
}
```

#### `quiz:next`
Host requests next question.
```json
{
  "type": "quiz:next"
}
```

---

## Presence (Optional for MVP)

Track connected players using Supabase Presence:
```json
{
  "user_id": "uuid",
  "nickname": "Player1",
  "online_at": "2026-03-20T10:00:00Z"
}
```
