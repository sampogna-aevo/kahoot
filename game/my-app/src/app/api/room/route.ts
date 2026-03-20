import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createRoom, addPlayer, getRoom } from '@/lib/db';
import { generateRoomCode } from '@/lib/room-code';

export async function POST() {
  try {
    let code = generateRoomCode();
    while (await getRoom(code)) {
      code = generateRoomCode();
    }

    const hostId = uuidv4();
    const room = await createRoom(code, hostId);

    await addPlayer({
      id: hostId,
      nickname: 'Host',
      roomCode: code,
      score: 0,
      isConnected: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        code: room.code,
        hostId: room.hostId,
        state: room.state,
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Erro ao criar sala' } },
      { status: 500 }
    );
  }
}
