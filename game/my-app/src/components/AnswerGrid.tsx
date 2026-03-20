'use client';

import AnswerButton from './AnswerButton';

interface AnswerGridProps {
  answers: string[];
  selectedIndex: number | null;
  correctIndex: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export default function AnswerGrid({ answers, selectedIndex, correctIndex, answered, onSelect, disabled }: AnswerGridProps) {
  function getState(index: number): 'idle' | 'selected' | 'correct' | 'incorrect' | 'disabled' {
    if (disabled) return 'disabled';
    if (answered && correctIndex !== null) {
      if (index === correctIndex) return 'correct';
      if (index === selectedIndex) return 'incorrect';
      return 'disabled';
    }
    if (selectedIndex === index) return 'selected';
    if (selectedIndex !== null) return 'disabled';
    return 'idle';
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {answers.map((answer, index) => (
        <AnswerButton
          key={index}
          index={index as 0 | 1 | 2 | 3}
          text={answer}
          state={getState(index)}
          onPress={onSelect}
        />
      ))}
    </div>
  );
}
