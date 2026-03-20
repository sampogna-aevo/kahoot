import { NextRequest, NextResponse } from 'next/server';
import { getRoomWithPlayers } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: { code: string } }
) {
  const room = await getRoomWithPlayers(params.code.toUpperCase());
  
  if (!room) {
    return NextResponse.json(
      { error: { code: 'ROOM_NOT_FOUND', message: 'Sala não encontrada' } },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: room,
  });
}
