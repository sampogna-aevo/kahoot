'use client';

import { useEffect } from 'react';

export interface ToastData {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

function ToastItem({ id, message, type, action, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const bgClass =
    type === 'error'
      ? 'bg-error/20 border-error/40 text-error'
      : type === 'success'
        ? 'bg-success/20 border-success/40 text-success'
        : 'bg-accent/20 border-accent/40 text-accent';

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm animate-slide-up ${bgClass}`}
      role="alert"
    >
      <span className="text-sm font-medium flex-1">{message}</span>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => onDismiss(id)}
        className="text-xs opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Fechar"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
