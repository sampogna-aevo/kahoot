import type { ErrorCode } from '@/types';

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  ROOM_NOT_FOUND: 'Sala não encontrada',
  ROOM_FULL: 'Sala cheia',
  ROOM_CLOSED: 'Sala encerrada',
  NICKNAME_TAKEN: 'Este nickname já está em uso',
  INVALID_NICKNAME: 'Nickname deve ter entre 2 e 20 caracteres',
  INVALID_ROOM_CODE: 'Código de sala inválido',
  QUIZ_NOT_STARTED: 'Quiz ainda não começou',
  QUESTION_TIMEOUT: 'Tempo para responder expirado',
  ALREADY_ANSWERED: 'Você já respondeu esta pergunta',
  NOT_IN_ROOM: 'Você não está nesta sala',
  UNAUTHORIZED: 'Ação não autorizada',
};

export function getErrorMessage(code: ErrorCode): string {
  return ERROR_MESSAGES[code] || 'Erro desconhecido';
}
