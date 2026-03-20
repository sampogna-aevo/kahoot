import { NextRequest, NextResponse } from 'next/server';
import { getPlayer, updatePlayer, getRoom } from '@/lib/db';
import { supabase } from '@/lib/db';
import { QUESTIONS } from '@/data/questions';
import { calculateScore } from '@/lib/scoring';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerId, selectedIndex, questionIndex } = body;

    const player = await getPlayer(playerId);

    if (!player) {
      return NextResponse.json(
        { error: { code: 'PLAYER_NOT_FOUND', message: 'Jogador não encontrado' } },
        { status: 404 }
      );
    }

    const roomCode = player.roomCode;
    const room = await getRoom(roomCode);

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

    const { data: existingAnswer } = await supabase
      .from('answers')
      .select('*')
      .eq('playerId', playerId)
      .eq('questionIndex', questionIndex)
      .single();

    if (existingAnswer) {
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

    const isCorrect = selectedIndex === question.correctIndex;
    const responseTime = answeredAt - (room.updatedAt || room.createdAt);
    const points = calculateScore(responseTime, question.timeLimit, isCorrect);

    await supabase.from('answers').insert({
      playerId,
      questionIndex,
      selectedIndex,
      isCorrect,
      responseTime,
      points,
      answeredAt,
    });

    if (isCorrect) {
      await updatePlayer(playerId, { score: player.score + points });
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
