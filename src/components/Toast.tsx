import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useClinic();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl glass-onyx text-white border border-gold/40 shadow-onyx-depth animate-in slide-in-from-bottom-3 duration-300 backdrop-blur-xl"
        >
          <div className="mt-0.5 text-gold flex-shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
            {toast.type === 'gold' && <Sparkles className="w-5 h-5 text-gold animate-pulse" />}
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
              {toast.title}
            </h4>
            <p className="text-xs text-pearl-100/90 mt-0.5 leading-relaxed font-sans">
              {toast.description}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-pearl-300 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
