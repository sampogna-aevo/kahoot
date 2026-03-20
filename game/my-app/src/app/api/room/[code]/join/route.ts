import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { addPlayer, getRoom, getPlayerByNickname } from '@/lib/db';
import { broadcastEvent } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const roomCode = code.toUpperCase();

  try {
    const body = await request.json();
    const { nickname } = body;

    if (!nickname || nickname.length < 2 || nickname.length > 20) {
      return NextResponse.json(
        { error: { code: 'INVALID_NICKNAME', message: 'Nickname deve ter entre 2 e 20 caracteres' } },
        { status: 400 }
      );
    }

    const room = await getRoom(roomCode);

    if (!room) {
      return NextResponse.json(
        { error: { code: 'ROOM_NOT_FOUND', message: 'Sala não encontrada' } },
        { status: 404 }
      );
    }

    if (room.state === 'FINISHED') {
      return NextResponse.json(
        { error: { code: 'ROOM_CLOSED', message: 'Sala encerrada' } },
        { status: 400 }
      );
    }

    const existingPlayer = await getPlayerByNickname(roomCode, nickname);
    if (existingPlayer) {
      return NextResponse.json(
        { error: { code: 'NICKNAME_TAKEN', message: 'Este nickname já está em uso' } },
        { status: 400 }
      );
    }

    const player = await addPlayer({
      id: uuidv4(),
      nickname,
      roomCode,
      score: 0,
      isConnected: true,
    });

    await broadcastEvent(`room:${roomCode}`, {
      type: 'player:joined',
      player: { id: player.id, nickname: player.nickname, score: player.score, isConnected: player.isConnected },
    });

    return NextResponse.json({
      success: true,
      data: {
        playerId: player.id,
        nickname: player.nickname,
        roomCode: player.roomCode,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao entrar na sala' } },
      { status: 500 }
    );
  }
}
