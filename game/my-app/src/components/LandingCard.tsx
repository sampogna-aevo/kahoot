'use client';

interface LandingCardProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  isLoading?: boolean;
}

export default function LandingCard({ onCreateRoom, onJoinRoom, isLoading }: LandingCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-card" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-answer-sapphire/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center animate-fade-in">
        <div className="mb-2">
          <span className="text-6xl">🎯</span>
        </div>
        <h1 className="text-5xl font-bold text-text-primary mb-3 tracking-tight">QuizAoVivo</h1>
        <p className="text-lg text-text-secondary mb-10">Jogue quiz em tempo real com seus amigos!</p>

        <div className="space-y-4 w-72 mx-auto">
          <button
            onClick={onCreateRoom}
            disabled={isLoading}
            className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-accent-hover disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-accent/25"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin-slow h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Criando...
              </span>
            ) : (
              'Criar Sala'
            )}
          </button>

          <button
            onClick={onJoinRoom}
            disabled={isLoading}
            className="w-full bg-card border-2 border-text-muted/30 text-text-primary py-4 rounded-xl font-bold text-lg hover:border-accent/50 hover:bg-card-elevated disabled:opacity-50 transition-all active:scale-95"
          >
            Entrar em Sala
          </button>
        </div>
      </div>
    </div>
  );
}
