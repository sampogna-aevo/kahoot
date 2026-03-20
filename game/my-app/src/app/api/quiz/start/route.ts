import { NextRequest, NextResponse } from 'next/server';
import { getRoom, updateRoom, getRoomPlayers } from '@/lib/room';
import { broadcastEvent } from '@/lib/supabase';
import { QUESTIONS } from '@/data/questions';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const roomCode = code.toUpperCase();
  
  try {
    const body = await request.json();
    const { hostId } = body;
    
    const room = getRoom(roomCode);
    
    if (!room) {
      return NextResponse.json(
        { error: { code: 'ROOM_NOT_FOUND', message: 'Sala não encontrada' } },
        { status: 404 }
      );
    }
    
    if (room.hostId !== hostId) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Apenas o host pode iniciar o quiz' } },
        { status: 403 }
      );
    }
    
    if (room.state !== 'AWAITING') {
      return NextResponse.json(
        { error: { code: 'QUIZ_ALREADY_STARTED', message: 'Quiz já foi iniciado' } },
        { status: 400 }
      );
    }
    
    const players = getRoomPlayers(roomCode);
    if (players.length === 0) {
      return NextResponse.json(
        { error: { code: 'NO_PLAYERS', message: 'Aguarde pelo menos um jogador' } },
        { status: 400 }
      );
    }
    
    updateRoom(roomCode, { state: 'IN_PROGRESS', currentQuestion: 0 });

    const firstQuestion = QUESTIONS[0];

    await broadcastEvent(`room:${roomCode}`, {
      type: 'quiz:started',
      questionIndex: 0,
      question: {
        text: firstQuestion.text,
        options: firstQuestion.options,
        timeLimit: firstQuestion.timeLimit,
      },
      totalQuestions: QUESTIONS.length,
    });

    return NextResponse.json({
      success: true,
      data: {
        questionIndex: 0,
        question: {
          text: firstQuestion.text,
          options: firstQuestion.options,
          timeLimit: firstQuestion.timeLimit,
        },
        totalQuestions: QUESTIONS.length,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao iniciar quiz' } },
      { status: 500 }
    );
  }
}
