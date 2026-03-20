'use client';

import PlayerCard from './PlayerCard';

const MEDAL_COLORS = ['text-gold', 'text-silver', 'text-bronze'];
const MEDAL_BG = ['bg-gold/20', 'bg-silver/20', 'bg-bronze/20'];
const MEDALS = ['🥇', '🥈', '🥉'];

interface RankingItemProps {
  position: number;
  nickname: string;
  score: number;
}

export default function RankingItem({ position, nickname, score }: RankingItemProps) {
  const isTop3 = position <= 3;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        isTop3 ? `${MEDAL_BG[position - 1]} border border-white/10` : 'bg-card-elevated/50'
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
        isTop3 ? MEDAL_COLORS[position - 1] : 'text-text-muted'
      }`}>
        {isTop3 ? MEDALS[position - 1] : `#${position}`}
      </div>
      <PlayerCard nickname={nickname} score={score} size="sm" />
    </div>
  );
}
