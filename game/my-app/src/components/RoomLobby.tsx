'use client';

import PlayerCard from './PlayerCard';
import HostControls from './HostControls';

interface RoomLobbyProps {
  roomCode: string;
  players: Array<{
    id: string;
    nickname: string;
    score: number;
    isConnected: boolean;
  }>;
  isHost: boolean;
  onStartQuiz: () => void;
  onCloseRoom: () => void;
}

export default function RoomLobby({ roomCode, players, isHost, onStartQuiz, onCloseRoom }: RoomLobbyProps) {
  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-1">QuizAoVivo</h1>
          <p className="text-text-secondary text-sm">Código da Sala</p>
          <p className="text-5xl sm:text-6xl font-mono font-bold text-accent tracking-[0.3em] mt-2 select-all">
            {roomCode}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 mb-6 border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Jogadores</h2>
            <span className="text-sm text-text-secondary bg-card-elevated px-3 py-1 rounded-full">
              {players.length}/20
            </span>
          </div>

          {players.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-text-muted">Aguardando jogadores...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  nickname={player.nickname}
                  isHost={false}
                  size="sm"
                />
              ))}
            </div>
          )}
        </div>

        {isHost && (
          <HostControls
            state="AWAITING"
            playerCount={players.length}
            currentQuestion={0}
            totalQuestions={10}
            onStartQuiz={onStartQuiz}
            onNextQuestion={() => {}}
            onFinishQuiz={() => {}}
            onCloseRoom={onCloseRoom}
          />
        )}

        {!isHost && (
          <p className="text-text-secondary text-center text-sm">Aguardando o host iniciar o quiz...</p>
        )}
      </div>
    </div>
  );
}
