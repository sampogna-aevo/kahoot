import { NextRequest, NextResponse } from 'next/server';
import { getRoom, updateRoom } from '@/lib/room';
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
        { error: { code: 'UNAUTHORIZED', message: 'Apenas o host pode avançar' } },
        { status: 403 }
      );
    }
    
    if (room.state !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: { code: 'QUIZ_NOT_STARTED', message: 'Quiz ainda não começou' } },
        { status: 400 }
      );
    }
    
    const nextQuestionIndex = room.currentQuestion + 1;
    
    if (nextQuestionIndex >= QUESTIONS.length) {
      updateRoom(roomCode, { state: 'FINISHED' });

      await broadcastEvent(`room:${roomCode}`, { type: 'quiz:finished' });

      return NextResponse.json({
        success: true,
        data: {
          finished: true,
          message: 'Quiz finalizado',
        },
      });
    }
    
    updateRoom(roomCode, { currentQuestion: nextQuestionIndex });

    const nextQuestion = QUESTIONS[nextQuestionIndex];

    await broadcastEvent(`room:${roomCode}`, {
      type: 'question:next',
      questionIndex: nextQuestionIndex,
      question: {
        text: nextQuestion.text,
        options: nextQuestion.options,
        timeLimit: nextQuestion.timeLimit,
      },
      totalQuestions: QUESTIONS.length,
    });

    return NextResponse.json({
      success: true,
      data: {
        questionIndex: nextQuestionIndex,
        question: {
          text: nextQuestion.text,
          options: nextQuestion.options,
          timeLimit: nextQuestion.timeLimit,
        },
        totalQuestions: QUESTIONS.length,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao avançar pergunta' } },
      { status: 500 }
    );
  }
}
