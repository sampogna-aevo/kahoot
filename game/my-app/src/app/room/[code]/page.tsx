'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RoomLobby from '@/components/RoomLobby';
import QuizQuestion from '@/components/QuizQuestion';
import RankingBoard from '@/components/RankingBoard';
import { useToastContext } from '@/components/ToastProvider';
import { useRealtimeRoom } from '@/hooks/useRealtimeRoom';
import type { RealtimeRoomEvent } from '@/lib/supabase';

interface RoomData {
  code: string;
  hostId: string;
  state: 'AWAITING' | 'IN_PROGRESS' | 'FINISHED';
  currentQuestion: number;
  players: Array<{
    id: string;
    nickname: string;
    score: number;
    isConnected: boolean;
  }>;
}

export default function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const router = useRouter();
  const { addToast } = useToastContext();
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomCode, setRoomCode] = useState<string>('');
  const [isHost, setIsHost] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<{
    text: string;
    options: string[];
    timeLimit: number;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    points: number;
    correctIndex: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [finalRankings, setFinalRankings] = useState<Array<{ nickname: string; score: number }>>([]);
  const [showRanking, setShowRanking] = useState(false);

  const handleRealtimeEvent = useCallback(async (event: RealtimeRoomEvent) => {
    switch (event.type) {
      case 'player:joined':
        setRoomData((prev) => {
          if (!prev) return prev;
          if (prev.players.some((p) => p.id === event.player.id)) return prev;
          return { ...prev, players: [...prev.players, event.player] };
        });
        break;

      case 'quiz:started': {
        const timeLimitSec = Math.floor(event.question.timeLimit / 1000);
        setRoomData((prev) => prev ? { ...prev, state: 'IN_PROGRESS', currentQuestion: event.questionIndex } : prev);
        setQuestion(event.question);
        setCurrentQuestionIndex(event.questionIndex);
        setQuizStarted(true);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setTimeLeft(timeLimitSec);
        break;
      }

      case 'question:next': {
        const timeLimitSec = Math.floor(event.question.timeLimit / 1000);
        setRoomData((prev) => prev ? { ...prev, currentQuestion: event.questionIndex } : prev);
        setQuestion(event.question);
        setCurrentQuestionIndex(event.questionIndex);
        setSelectedAnswer(null);
        setAnswerResult(null);
        setTimeLeft(timeLimitSec);
        break;
      }

      case 'quiz:finished': {
        setRoomData((prev) => prev ? { ...prev, state: 'FINISHED' } : prev);
        if (roomCode) {
          try {
            const res = await fetch(`/api/room/${roomCode}`);
            const data = await res.json();
            if (data.success) {
              const rankings = data.data.players
                .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
                .map((p: { nickname: string; score: number }) => ({ nickname: p.nickname, score: p.score }));
              setFinalRankings(rankings);
              setShowRanking(true);
            }
          } catch {
            // ignore fetch error
          }
        }
        break;
      }

      case 'room:closed':
        router.push('/');
        break;
    }
  }, [roomCode, router]);

  useRealtimeRoom(roomCode, handleRealtimeEvent);

  const fetchRoom = useCallback(async (code: string) => {
    try {
      const res = await fetch(`/api/room/${code}`);
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao carregar sala', 'error');
        setError(data.error?.message || 'Erro ao carregar sala');
        return;
      }

      setRoomData(data.data);

      if (data.data.state === 'IN_PROGRESS') {
        setQuizStarted(true);
        const storedQuestion = sessionStorage.getItem(`question_${data.data.currentQuestion}`);
        if (storedQuestion) {
          setQuestion(JSON.parse(storedQuestion));
          setCurrentQuestionIndex(data.data.currentQuestion);
        }
      }
    } catch {
      addToast('Erro de conexão', 'error');
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    params.then(({ code }) => {
      setRoomCode(code.toUpperCase());
      fetchRoom(code.toUpperCase());
    });
  }, [params, fetchRoom]);

  useEffect(() => {
    const storedHostId = localStorage.getItem('hostId');
    const storedPlayerId = localStorage.getItem('playerId');

    if (storedHostId && roomData?.hostId === storedHostId) {
      setIsHost(true);
    }
    if (storedPlayerId) {
      setPlayerId(storedPlayerId);
    }
  }, [roomData]);

  useEffect(() => {
    if (roomData?.state === 'IN_PROGRESS' && question) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roomData?.state, question, currentQuestionIndex]);

  async function startQuiz() {
    const hostId = localStorage.getItem('hostId');
    if (!hostId) return;

    try {
      const res = await fetch(`/api/quiz/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId }),
      });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao iniciar', 'error');
      }
    } catch {
      addToast('Erro de conexão', 'error');
    }
  }

  async function submitAnswer(index: number) {
    if (selectedAnswer !== null || !playerId) return;

    setSelectedAnswer(index);

    try {
      const res = await fetch(`/api/quiz/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          selectedIndex: index,
          questionIndex: currentQuestionIndex,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao enviar resposta', 'error');
        setSelectedAnswer(null);
        return;
      }

      setAnswerResult(data.data);
    } catch {
      addToast('Erro de conexão', 'error');
      setSelectedAnswer(null);
    }
  }

  async function nextQuestion() {
    const hostId = localStorage.getItem('hostId');
    if (!hostId) return;

    try {
      const res = await fetch(`/api/quiz/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId }),
      });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao avançar', 'error');
      }
    } catch {
      addToast('Erro de conexão', 'error');
    }
  }

  async function closeRoom() {
    const hostId = localStorage.getItem('hostId');
    if (!hostId) return;

    try {
      const res = await fetch(`/api/room/${roomCode}/close`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostId }),
      });
      const data = await res.json();

      if (!data.success) {
        addToast(data.error?.message || 'Erro ao fechar', 'error');
        return;
      }

      localStorage.removeItem('hostId');
      localStorage.removeItem('roomCode');
      router.push('/');
    } catch {
      addToast('Erro de conexão', 'error');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin-slow h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-text-secondary">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error && !roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <p className="text-error mb-4">{error}</p>
          <button onClick={() => router.push('/')} className="text-accent hover:text-accent-hover transition-colors">
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  if (showRanking) {
    return (
      <RankingBoard
        players={finalRankings}
        onPlayAgain={() => router.push('/')}
      />
    );
  }

  if (quizStarted && question) {
    return (
      <QuizQuestion
        questionNumber={currentQuestionIndex}
        totalQuestions={10}
        questionText={question.text}
        answers={question.options}
        selectedIndex={selectedAnswer}
        correctIndex={answerResult?.correctIndex ?? null}
        answered={answerResult !== null}
        timeRemaining={timeLeft}
        timeTotal={10}
        onSelectAnswer={submitAnswer}
        isHost={isHost}
        onNext={nextQuestion}
        onFinish={nextQuestion}
        answerResult={answerResult}
      />
    );
  }

  return (
    <RoomLobby
      roomCode={roomCode}
      players={roomData?.players || []}
      isHost={isHost}
      onStartQuiz={startQuiz}
      onCloseRoom={closeRoom}
    />
  );
}
