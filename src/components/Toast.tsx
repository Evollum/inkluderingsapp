"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "info" | "error";

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  onClose: (id: string) => void;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export default function Toast({ id, message, type = "info", onClose, duration = 4000, actionLabel, onAction }: ToastProps) {
  const [closing, setClosing] = useState(false);
  const animationDuration = 220; // ms

  useEffect(() => {
    const t = setTimeout(() => {
      // start exit animation then call onClose after animation duration
      setClosing(true);
      setTimeout(() => onClose(id), animationDuration);
    }, duration);
    return () => clearTimeout(t);
  }, [onClose, duration, id]);

  const bg = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600";

  return (
    <div className={`max-w-sm w-full ${bg} text-white shadow-lg rounded-lg pointer-events-auto ${closing ? 'toast-exit' : 'toast-enter'}`} role="status">
      <div className="p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 text-sm font-medium leading-tight">{message}</div>
          <div className="flex items-center gap-2">
            {actionLabel && (
              <button
                onClick={() => {
                  onAction?.();
                  // close with animation
                  setClosing(true);
                  setTimeout(() => onClose(id), animationDuration);
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm"
              >
                {actionLabel}
              </button>
            )}
            <button
              onClick={() => { setClosing(true); setTimeout(() => onClose(id), animationDuration); }}
              className="opacity-90 hover:opacity-100 text-white rounded-md p-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
