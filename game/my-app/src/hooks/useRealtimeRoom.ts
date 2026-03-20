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

    const channel = subscribeToRoom(`room:${roomCode}`, (event) => {
      callbackRef.current(event);
    });

    return () => {
      unsubscribeFromRoom(channel);
    };
  }, [roomCode]);
}
