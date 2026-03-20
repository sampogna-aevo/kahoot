'use client';

interface HostControlsProps {
  state: 'AWAITING' | 'IN_PROGRESS' | 'FINISHED';
  playerCount: number;
  currentQuestion: number;
  totalQuestions: number;
  onStartQuiz: () => void;
  onNextQuestion: () => void;
  onFinishQuiz: () => void;
  onCloseRoom: () => void;
}

export default function HostControls({
  state,
  playerCount,
  currentQuestion,
  totalQuestions,
  onStartQuiz,
  onNextQuestion,
  onFinishQuiz,
  onCloseRoom,
}: HostControlsProps) {
  if (state === 'AWAITING') {
    return (
      <div className="space-y-3">
        <button
          onClick={onStartQuiz}
          disabled={playerCount === 0}
          className="w-full bg-success text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 min-h-[44px]"
        >
          Iniciar Quiz
        </button>
        <button
          onClick={onCloseRoom}
          className="w-full bg-error text-white py-3 rounded-xl font-semibold hover:brightness-110 transition-all active:scale-95 min-h-[44px]"
        >
          Encerrar Sala
        </button>
      </div>
    );
  }

  if (state === 'IN_PROGRESS') {
    const isLast = currentQuestion >= totalQuestions - 1;
    return (
      <div className="space-y-3">
        <button
          onClick={isLast ? onFinishQuiz : onNextQuestion}
          className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-accent-hover transition-all active:scale-95 min-h-[44px]"
        >
          {isLast ? 'Finalizar Quiz' : 'Próxima Pergunta'}
        </button>
      </div>
    );
  }

  return null;
}
