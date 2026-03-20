import { createClient, type RealtimeChannel } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yzpclsfxpqdlxvtbdqjb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6cGNsc2Z4cHFkbHh2dGJkcWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjg1MzAsImV4cCI6MjA4OTYwNDUzMH0._bDa3G6uiWs11PiLPh9WUWDnnyzGqM9NPn72Ajv29As';

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  }
  return supabaseInstance;
}

export async function broadcastEvent(
  channelName: string,
  payload: Record<string, unknown>
) {
  try {
    const url = `${supabaseUrl}/realtime/v1/api/broadcast`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        messages: [{ topic: channelName, event: 'room-event', payload }],
      }),
    });

    if (!response.ok) {
      console.error('Failed to broadcast event:', response.status, await response.text());
      return false;
    }

    console.log(`Broadcasted event to ${channelName}:`, payload.type);
    return true;
  } catch (error) {
    console.error('Error broadcasting event:', error);
    return false;
  }
}

export type RealtimeRoomEvent =
  | { type: 'player:joined'; player: { id: string; nickname: string; score: number; isConnected: boolean } }
  | { type: 'quiz:started'; questionIndex: number; question: { text: string; options: string[]; timeLimit: number }; totalQuestions: number }
  | { type: 'question:next'; questionIndex: number; question: { text: string; options: string[]; timeLimit: number }; totalQuestions: number }
  | { type: 'quiz:finished' }
  | { type: 'room:closed' };

export function subscribeToRoom(
  channelName: string,
  callback: (event: RealtimeRoomEvent) => void
): RealtimeChannel {
  const supabase = getSupabase();
  const channel = supabase.channel(channelName);

  channel.on('broadcast', { event: 'room-event' }, (payload) => {
    console.log(`Received event on ${channelName}:`, payload);
    callback(payload.payload as RealtimeRoomEvent);
  });

  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log(`Successfully subscribed to channel: ${channelName}`);
    } else if (status === 'CHANNEL_ERROR') {
      console.error(`Error subscribing to channel: ${channelName}`);
    } else if (status === 'TIMED_OUT') {
      console.error(`Subscription timed out for channel: ${channelName}`);
    } else {
      console.log(`Channel ${channelName} status:`, status);
    }
  });

  return channel;
}

export function unsubscribeFromRoom(channel: RealtimeChannel) {
  const supabase = getSupabase();
  supabase.removeChannel(channel);
  console.log('Unsubscribed from channel');
}
