'use client';

interface TimerBarProps {
  remaining: number;
  total: number;
}

export default function TimerBar({ remaining, total }: TimerBarProps) {
  const percentage = total > 0 ? (remaining / total) * 100 : 0;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  let color = 'stroke-accent';
  let textColor = 'text-text-primary';
  let urgency = '';

  if (remaining <= 1) {
    color = 'stroke-error';
    textColor = 'text-error';
    urgency = 'animate-timer-urgency';
  } else if (remaining <= 3) {
    color = 'stroke-warning';
    textColor = 'text-warning';
  }

  return (
    <div className="relative w-20 h-20 mx-auto">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="6"
          className="stroke-card-elevated"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-[stroke-dashoffset] duration-1000 ease-linear`}
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${textColor} ${urgency}`}>
        {remaining}
      </div>
    </div>
  );
}
