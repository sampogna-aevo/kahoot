'use client';

import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/Toast';
import { createContext, useContext, ReactNode } from 'react';

interface ToastContextValue {
  addToast: (message: string, type?: 'error' | 'success' | 'info', action?: { label: string; onClick: () => void }) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, dismissToast, clearToasts } = useToast();

  return (
    <ToastContext.Provider value={{ addToast, dismissToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
