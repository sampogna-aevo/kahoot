import { NextRequest, NextResponse } from 'next/server';
import { getRoomWithPlayers } from '@/lib/room';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  const room = getRoomWithPlayers(code.toUpperCase());
  
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
