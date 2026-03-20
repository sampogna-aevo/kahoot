'use client';

const COLOR_MAP = [
  'bg-answer-ruby',
  'bg-answer-sapphire',
  'bg-answer-amber',
  'bg-answer-emerald',
];

const LABELS = ['A', 'B', 'C', 'D'];

interface AnswerButtonProps {
  index: 0 | 1 | 2 | 3;
  text: string;
  state: 'idle' | 'selected' | 'correct' | 'incorrect' | 'disabled';
  onPress: (index: number) => void;
}

export default function AnswerButton({ index, text, state, onPress }: AnswerButtonProps) {
  const baseColor = COLOR_MAP[index];

  let stateClasses = '';
  let animation = '';

  switch (state) {
    case 'idle':
      stateClasses = `${baseColor} text-white hover:brightness-110 cursor-pointer`;
      break;
    case 'selected':
      stateClasses = `${baseColor} text-white ring-2 ring-white/50 animate-pulse-glow cursor-default`;
      break;
    case 'correct':
      stateClasses = 'bg-success text-white ring-2 ring-success cursor-default';
      animation = 'animate-correct-flash';
      break;
    case 'incorrect':
      stateClasses = 'bg-error/60 text-white/70 cursor-default';
      animation = 'animate-incorrect-shake';
      break;
    case 'disabled':
      stateClasses = 'bg-card-elevated text-text-muted cursor-default opacity-60';
      break;
  }

  return (
    <button
      onClick={() => state === 'idle' && onPress(index)}
      disabled={state !== 'idle'}
      className={`relative flex items-center gap-3 p-4 rounded-xl font-semibold text-left transition-all min-h-[56px] sm:min-h-[44px] ${stateClasses} ${animation}`}
    >
      <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
        {LABELS[index]}
      </span>
      <span className="flex-1 truncate">{text}</span>
    </button>
  );
}
