# API Contracts: Room Management

## REST Endpoints

### POST /api/room

Create a new room.

**Request**: None required

**Response** (201 Created):
```json
{
  "code": "ABC123",
  "hostId": "uuid-v4",
  "state": "AWAITING"
}
```

**Errors**:
- 500: Server error

---

### GET /api/room/[code]

Get room state.

**Response** (200 OK):
```json
{
  "code": "ABC123",
  "state": "AWAITING",
  "players": [
    { "id": "uuid", "nickname": "Player1", "score": 0, "isConnected": true }
  ],
  "currentQuestion": 0
}
```

**Errors**:
- 404: Room not found (`ROOM_NOT_FOUND`)

---

### POST /api/room/[code]/join

Join a room as a player.

**Request**:
```json
{
  "nickname": "Player1"
}
```

**Response** (200 OK):
```json
{
  "playerId": "uuid-v4",
  "roomCode": "ABC123",
  "state": "AWAITING"
}
```

**Errors**:
- 400: Nickname invalid (`NICKNAME_INVALID`)
- 404: Room not found (`ROOM_NOT_FOUND`)
- 409: Nickname taken (`NICKNAME_TAKEN`)
- 410: Room closed (`ROOM_CLOSED`)

---

### POST /api/room/[code]/close

Close a room (host only).

**Request**:
```json
{
  "hostId": "uuid-v4"
}
```

**Response** (200 OK):
```json
{
  "success": true
}
```

**Errors**:
- 403: Not the host (`NOT_HOST`)
- 404: Room not found (`ROOM_NOT_FOUND`)
