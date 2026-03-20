'use client';

import TimerBar from './TimerBar';
import AnswerGrid from './AnswerGrid';
import HostControls from './HostControls';

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  answers: string[];
  selectedIndex: number | null;
  correctIndex: number | null;
  answered: boolean;
  timeRemaining: number;
  timeTotal: number;
  onSelectAnswer: (index: number) => void;
  isHost: boolean;
  onNext?: () => void;
  onFinish?: () => void;
  answerResult?: { isCorrect: boolean; points: number } | null;
}

export default function QuizQuestion({
  questionNumber,
  totalQuestions,
  questionText,
  answers,
  selectedIndex,
  correctIndex,
  answered,
  timeRemaining,
  timeTotal,
  onSelectAnswer,
  isHost,
  onNext,
  onFinish,
  answerResult,
}: QuizQuestionProps) {
  return (
    <div className="min-h-screen bg-background p-4 animate-slide-up">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-xs text-text-muted uppercase tracking-wide">Pergunta</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-text-primary">{questionNumber + 1}</span>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">{totalQuestions}</span>
            </div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-4 rounded-full transition-colors ${
                    i < questionNumber ? 'bg-accent' : i === questionNumber ? 'bg-accent/50' : 'bg-card-elevated'
                  }`}
                />
              ))}
            </div>
          </div>
          <TimerBar remaining={timeRemaining} total={timeTotal} />
        </div>

        <div className="bg-card rounded-2xl p-6 mb-6 border border-white/5">
          <h2 className="text-xl font-semibold text-text-primary mb-6">{questionText}</h2>

          <AnswerGrid
            answers={answers}
            selectedIndex={selectedIndex}
            correctIndex={answered ? correctIndex : null}
            answered={answered}
            onSelect={onSelectAnswer}
            disabled={!isHost && selectedIndex === null && timeRemaining === 0}
          />

          {answerResult && (
            <div className="mt-4 text-center animate-fade-in">
              <p className={`text-lg font-semibold ${answerResult.isCorrect ? 'text-success' : 'text-error'}`}>
                {answerResult.isCorrect ? `Correto! +${answerResult.points} pontos` : 'Incorreto!'}
              </p>
            </div>
          )}
        </div>

        {isHost && (
          <HostControls
            state="IN_PROGRESS"
            playerCount={1}
            currentQuestion={questionNumber}
            totalQuestions={totalQuestions}
            onStartQuiz={() => {}}
            onNextQuestion={onNext || (() => {})}
            onFinishQuiz={onFinish || (() => {})}
            onCloseRoom={() => {}}
          />
        )}

        {!isHost && answered && (
          <p className="text-text-secondary text-center text-sm">Aguardando o host avançar...</p>
        )}
      </div>
    </div>
  );
}
