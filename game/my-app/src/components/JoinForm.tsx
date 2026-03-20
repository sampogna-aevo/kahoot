'use client';

import { useState, FormEvent } from 'react';

interface JoinFormProps {
  onSubmit: (roomCode: string, nickname: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function JoinForm({ onSubmit, onBack, isLoading }: JoinFormProps) {
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(roomCode.toUpperCase(), nickname.trim());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="bg-card rounded-2xl p-8 w-full max-w-md border border-white/5">
        <button
          onClick={onBack}
          className="text-text-secondary hover:text-text-primary transition-colors mb-6 flex items-center gap-1 text-sm"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold text-text-primary mb-6">Entrar na Sala</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Código da Sala
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="w-full px-4 py-3 bg-card-elevated border border-white/10 rounded-xl text-text-primary text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-text-muted min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Seu Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Seu nome (2-20 caracteres)"
              minLength={2}
              maxLength={20}
              className="w-full px-4 py-3 bg-card-elevated border border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder-text-muted min-h-[44px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-hover disabled:opacity-50 transition-all active:scale-95 min-h-[44px]"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
