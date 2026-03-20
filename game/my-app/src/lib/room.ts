import type { Room, Player, RoomWithPlayers } from '@/types';

const rooms = new Map<string, Room>();
const players = new Map<string, Player>();
const roomPlayers = new Map<string, Set<string>>();

export function createRoom(code: string, hostId: string): Room {
  const now = Date.now();
  const room: Room = {
    code,
    hostId,
    state: 'AWAITING',
    currentQuestion: -1,
    createdAt: now,
    updatedAt: now,
  };
  rooms.set(code, room);
  roomPlayers.set(code, new Set());
  return room;
}

export function getRoom(code: string): Room | undefined {
  return rooms.get(code);
}

export function updateRoom(code: string, updates: Partial<Room>): Room | undefined {
  const room = rooms.get(code);
  if (!room) return undefined;
  const updated = { ...room, ...updates, updatedAt: Date.now() };
  rooms.set(code, updated);
  return updated;
}

export function deleteRoom(code: string): void {
  const playerIds = roomPlayers.get(code);
  if (playerIds) {
    playerIds.forEach((playerId) => players.delete(playerId));
    roomPlayers.delete(code);
  }
  rooms.delete(code);
}

export function addPlayer(player: Player): void {
  players.set(player.id, player);
  const roomPlayerSet = roomPlayers.get(player.roomCode);
  if (roomPlayerSet) {
    roomPlayerSet.add(player.id);
  }
}

export function getPlayer(id: string): Player | undefined {
  return players.get(id);
}

export function updatePlayer(id: string, updates: Partial<Player>): Player | undefined {
  const player = players.get(id);
  if (!player) return undefined;
  const updated = { ...player, ...updates };
  players.set(id, updated);
  return updated;
}

export function removePlayer(id: string): Player | undefined {
  const player = players.get(id);
  if (!player) return undefined;
  const roomPlayerSet = roomPlayers.get(player.roomCode);
  if (roomPlayerSet) {
    roomPlayerSet.delete(id);
  }
  players.delete(id);
  return player;
}

export function getRoomPlayers(roomCode: string): Player[] {
  const playerIds = roomPlayers.get(roomCode);
  if (!playerIds) return [];
  return Array.from(playerIds)
    .map((id) => players.get(id))
    .filter((p): p is Player => p !== undefined);
}

export function getRoomWithPlayers(code: string): RoomWithPlayers | undefined {
  const room = rooms.get(code);
  if (!room) return undefined;
  return { ...room, players: getRoomPlayers(code) };
}

export function getPlayerByNickname(roomCode: string, nickname: string): Player | undefined {
  return getRoomPlayers(roomCode).find(
    (p) => p.nickname.toLowerCase() === nickname.toLowerCase()
  );
}

export function getPlayerById(playerId: string): Player | undefined {
  return players.get(playerId);
}

export function clearAllRooms(): void {
  rooms.clear();
  players.clear();
  roomPlayers.clear();
}
