import { NextRequest, NextResponse } from 'next/server';
import { getRoom, updateRoom } from '@/lib/db';
import { broadcastEvent } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const roomCode = params.code.toUpperCase();

  try {
    const body = await request.json();
    const { hostId } = body;

    const room = await getRoom(roomCode);

    if (!room) {
      return NextResponse.json(
        { error: { code: 'ROOM_NOT_FOUND', message: 'Sala não encontrada' } },
        { status: 404 }
      );
    }

    if (room.hostId !== hostId) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Apenas o host pode encerrar a sala' } },
        { status: 403 }
      );
    }

    await updateRoom(roomCode, { state: 'FINISHED' });

    await broadcastEvent(`room:${roomCode}`, { type: 'room:closed' });

    return NextResponse.json({
      success: true,
      data: { message: 'Sala encerrada' },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao encerrar sala' } },
      { status: 500 }
    );
  }
}
