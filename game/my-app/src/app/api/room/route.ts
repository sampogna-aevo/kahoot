import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createRoom, getRoom } from '@/lib/room';
import { generateRoomCode } from '@/lib/room-code';

export async function POST() {
  try {
    let code = generateRoomCode();
    while (getRoom(code)) {
      code = generateRoomCode();
    }
    
    const hostId = uuidv4();
    const room = createRoom(code, hostId);
    
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
