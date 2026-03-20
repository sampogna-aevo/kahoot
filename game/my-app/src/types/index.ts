export type RoomState = 'AWAITING' | 'IN_PROGRESS' | 'FINISHED';

export interface Room {
  code: string;
  hostId: string;
  state: RoomState;
  currentQuestion: number;
  createdAt: number;
  updatedAt: number;
}

export interface Player {
  id: string;
  nickname: string;
  roomCode: string;
  score: number;
  isConnected: boolean;
}

export interface Question {
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  timeLimit: number;
}

export interface Answer {
  playerId: string;
  questionIndex: number;
  selectedIndex: 0 | 1 | 2 | 3;
  isCorrect: boolean;
  responseTime: number;
  points: number;
}

export interface Round {
  questions: Question[];
  currentIndex: number;
}

export interface RoomWithPlayers extends Room {
  players: Player[];
}

export type ErrorCode =
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'ROOM_CLOSED'
  | 'NICKNAME_TAKEN'
  | 'INVALID_NICKNAME'
  | 'INVALID_ROOM_CODE'
  | 'QUIZ_NOT_STARTED'
  | 'QUESTION_TIMEOUT'
  | 'ALREADY_ANSWERED'
  | 'NOT_IN_ROOM'
  | 'UNAUTHORIZED';

export interface ApiError {
  error: {
    code: ErrorCode;
    message: string;
  };
}

export type RealtimeEvent =
  | { type: 'player:joined'; player: Player }
  | { type: 'player:left'; playerId: string }
  | { type: 'player:updated'; player: Player }
  | { type: 'room:state_changed'; state: RoomState }
  | { type: 'question:show'; questionIndex: number; question: Question }
  | { type: 'question:answer_revealed'; correctIndex: 0 | 1 | 2 | 3 }
  | { type: 'quiz:finished'; rankings: { nickname: string; score: number }[] }
  | { type: 'score:updated'; playerId: string; score: number };
