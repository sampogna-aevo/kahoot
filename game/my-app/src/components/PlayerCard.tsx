'use client';

const AVATAR_COLORS = [
  'bg-answer-ruby',
  'bg-answer-sapphire',
  'bg-answer-amber',
  'bg-answer-emerald',
  'bg-accent',
  'bg-answer-ruby/80',
  'bg-answer-sapphire/80',
  'bg-answer-amber/80',
];

function getAvatarColor(nickname: string): string {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(nickname: string): string {
  const clean = nickname.trim();
  if (clean.length === 0) return '?';
  if (clean.length === 1) return clean[0].toUpperCase();
  return (clean[0] + clean[1]).toUpperCase();
}

function truncateName(name: string, max = 15): string {
  return name.length > max ? name.slice(0, max - 1) + '…' : name;
}

interface PlayerCardProps {
  nickname: string;
  score?: number;
  isHost?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlayerCard({ nickname, score, isHost, size = 'md' }: PlayerCardProps) {
  const avatarSize = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-sm';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const padding = size === 'sm' ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className={`flex items-center gap-3 ${padding} bg-card-elevated rounded-xl`}>
      <div className={`${avatarSize} ${getAvatarColor(nickname)} rounded-full flex items-center justify-center font-bold text-white shrink-0`}>
        {getInitials(nickname)}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`${textSize} font-medium text-text-primary block truncate`}>
          {truncateName(nickname)}
        </span>
        {isHost && (
          <span className="text-xs text-accent font-medium">Host</span>
        )}
      </div>
      {score !== undefined && (
        <span className="text-sm font-bold text-accent">{score} pts</span>
      )}
    </div>
  );
}
