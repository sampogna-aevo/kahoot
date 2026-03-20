import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RoomRow {
  code: string;
  hostId: string;
  state: 'AWAITING' | 'IN_PROGRESS' | 'FINISHED';
  currentQuestion: number;
  createdAt: number;
  updatedAt: number;
}

export interface PlayerRow {
  id: string;
  nickname: string;
  roomCode: string;
  score: number;
  isConnected: boolean;
}

export async function createRoom(code: string, hostId: string) {
  const now = Date.now();
  const { data, error } = await supabase
    .from('rooms')
    .insert({
      code,
      hostId,
      state: 'AWAITING',
      currentQuestion: -1,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single();

  if (error) throw error;
  return data as RoomRow;
}

export async function getRoom(code: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('code', code)
    .single();

  if (error) return null;
  return data as RoomRow;
}

export async function updateRoom(code: string, updates: Partial<RoomRow>) {
  const { data, error } = await supabase
    .from('rooms')
    .update({ ...updates, updatedAt: Date.now() })
    .eq('code', code)
    .select()
    .single();

  if (error) return null;
  return data as RoomRow;
}

export async function deleteRoom(code: string) {
  await supabase.from('rooms').delete().eq('code', code);
}

export async function addPlayer(player: Omit<PlayerRow, 'isConnected'> & { isConnected?: boolean }) {
  const { data, error } = await supabase
    .from('players')
    .insert({
      ...player,
      isConnected: player.isConnected ?? true,
    })
    .select()
    .single();

  if (error) throw error;
  return data as PlayerRow;
}

export async function getPlayer(id: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as PlayerRow;
}

export async function updatePlayer(id: string, updates: Partial<PlayerRow>) {
  const { data, error } = await supabase
    .from('players')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return data as PlayerRow;
}

export async function removePlayer(id: string) {
  const { data } = await supabase.from('players').delete().eq('id', id).select().single();
  return data as PlayerRow | null;
}

export async function getRoomPlayers(roomCode: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('roomCode', roomCode);

  if (error) return [];
  return data as PlayerRow[];
}

export async function getRoomWithPlayers(code: string) {
  const room = await getRoom(code);
  if (!room) return null;

  const players = await getRoomPlayers(code);
  return { ...room, players };
}

export async function getPlayerByNickname(roomCode: string, nickname: string) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('roomCode', roomCode)
    .ilike('nickname', nickname)
    .single();

  if (error) return null;
  return data as PlayerRow;
}

export async function getPlayerById(playerId: string) {
  return getPlayer(playerId);
}
