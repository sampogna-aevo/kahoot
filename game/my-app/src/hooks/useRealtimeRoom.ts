'use client';

import { useEffect, useRef } from 'react';
import { subscribeToRoom, unsubscribeFromRoom, type RealtimeRoomEvent } from '@/lib/supabase';

export function useRealtimeRoom(
  roomCode: string,
  onEvent: (event: RealtimeRoomEvent) => void
) {
  const callbackRef = useRef(onEvent);

  useEffect(() => {
    callbackRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    if (!roomCode) return;

    const channelName = `room:${roomCode}`;
    console.log(`Setting up realtime subscription for room: ${roomCode}`);

    const channel = subscribeToRoom(channelName, (event) => {
      console.log(`useRealtimeRoom received event:`, event);
      callbackRef.current(event);
    });

    return () => {
      console.log(`Cleaning up realtime subscription for room: ${roomCode}`);
      unsubscribeFromRoom(channel);
    };
  }, [roomCode]);
}
