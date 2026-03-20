const STORAGE_KEY = 'quiz-nickname';

export function saveNickname(nickname: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, nickname);
  }
}

export function getNickname(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY);
  }
  return null;
}

export function clearNickname(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
