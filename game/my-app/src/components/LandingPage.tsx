'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingCard from './LandingCard';
import JoinForm from './JoinForm';
import { useToastContext } from './ToastProvider';

export default function LandingPage() {
  const router = useRouter();
  const { addToast } = useToastContext();
  const [mode, setMode] = useState<'home' | 'join'>('home');
  const [loading, setLoading] = useState(false);

  async function handleCreateRoom() {
    setLoading(true);

    try {
      const res = await fetch('/api/room', { method: 'POST' });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao criar sala', 'error');
        return;
      }

      localStorage.setItem('hostId', data.data.hostId);
      localStorage.setItem('roomCode', data.data.code);
      router.push(`/room/${data.data.code}`);
    } catch {
      addToast('Erro de conexão', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinRoom(roomCode: string, nickname: string) {
    setLoading(true);

    try {
      const res = await fetch(`/api/room/${roomCode}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao entrar na sala', 'error');
        return;
      }

      localStorage.setItem('playerId', data.data.playerId);
      localStorage.setItem('roomCode', data.data.roomCode);
      localStorage.setItem('nickname', data.data.nickname);
      router.push(`/room/${data.data.roomCode}`);
    } catch {
      addToast('Erro de conexão', 'error');
    } finally {
      setLoading(false);
    }
  }

  if (mode === 'join') {
    return (
      <JoinForm
        onSubmit={handleJoinRoom}
        onBack={() => setMode('home')}
        isLoading={loading}
      />
    );
  }

  return (
    <LandingCard
      onCreateRoom={handleCreateRoom}
      onJoinRoom={() => setMode('join')}
      isLoading={loading}
    />
  );
}
