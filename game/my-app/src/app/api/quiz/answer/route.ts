import { NextRequest, NextResponse } from 'next/server';
import { getPlayer, updatePlayer, getRoom } from '@/lib/room';
import { QUESTIONS } from '@/data/questions';
import { calculateScore } from '@/lib/scoring';

const playerAnswers = new Map<string, Map<number, { answeredAt: number; selectedIndex: number }>>();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const roomCode = code.toUpperCase();
  
  try {
    const body = await request.json();
    const { playerId, selectedIndex, questionIndex } = body;
    
    const room = getRoom(roomCode);
    
    if (!room) {
      return NextResponse.json(
        { error: { code: 'ROOM_NOT_FOUND', message: 'Sala não encontrada' } },
        { status: 404 }
      );
    }
    
    if (room.state !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: { code: 'QUIZ_NOT_STARTED', message: 'Quiz ainda não começou' } },
        { status: 400 }
      );
    }
    
    const player = getPlayer(playerId);
    
    if (!player || player.roomCode !== roomCode) {
      return NextResponse.json(
        { error: { code: 'NOT_IN_ROOM', message: 'Você não está nesta sala' } },
        { status: 403 }
      );
    }
    
    if (!playerAnswers.has(playerId)) {
      playerAnswers.set(playerId, new Map());
    }
    
    const playerAnswerMap = playerAnswers.get(playerId)!;
    
    if (playerAnswerMap.has(questionIndex)) {
      return NextResponse.json(
        { error: { code: 'ALREADY_ANSWERED', message: 'Você já respondeu esta pergunta' } },
        { status: 400 }
      );
    }
    
    const question = QUESTIONS[questionIndex];
    
    if (!question) {
      return NextResponse.json(
        { error: { code: 'QUESTION_NOT_FOUND', message: 'Pergunta não encontrada' } },
        { status: 404 }
      );
    }
    
    const answeredAt = Date.now();
    playerAnswerMap.set(questionIndex, { answeredAt, selectedIndex });
    
    const isCorrect = selectedIndex === question.correctIndex;
    const responseTime = answeredAt - (room.updatedAt || room.createdAt);
    const points = calculateScore(responseTime, question.timeLimit, isCorrect);
    
    if (isCorrect) {
      updatePlayer(playerId, { score: player.score + points });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        points,
        correctIndex: question.correctIndex,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao registrar resposta' } },
      { status: 500 }
    );
  }
}
