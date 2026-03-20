'use client';

import RankingItem from './RankingItem';

interface RankingBoardProps {
  players: Array<{
    nickname: string;
    score: number;
  }>;
  onPlayAgain: () => void;
}

export default function RankingBoard({ players, onPlayAgain }: RankingBoardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  function handlePlayAgain() {
    localStorage.removeItem('hostId');
    localStorage.removeItem('playerId');
    localStorage.removeItem('roomCode');
    onPlayAgain();
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md border border-white/5">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="text-3xl font-bold text-text-primary">Ranking Final</h1>
        </div>

        {sorted.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-text-muted">Nenhum jogador participou.</p>
          </div>
        ) : (
          <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
            {sorted.map((player, index) => (
              <RankingItem
                key={index}
                position={index + 1}
                nickname={player.nickname}
                score={player.score}
              />
            ))}
          </div>
        )}

        <button
          onClick={handlePlayAgain}
          className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-accent-hover transition-all active:scale-95 min-h-[44px]"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}
