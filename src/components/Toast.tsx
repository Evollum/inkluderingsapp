"use client";

import { useEffect } from "react";

export type ToastType = "success" | "info" | "error";

interface ToastProps {
  id?: string;
  message: string;
  type?: ToastType;
  onClose?: () => void;
  duration?: number;
}

export default function Toast({ message, type = "info", onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  const bg = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600";

  return (
    <div className={`max-w-sm w-full ${bg} text-white shadow-lg rounded-lg pointer-events-auto`}>
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-sm font-medium leading-tight">{message}</div>
          <button
            onClick={() => onClose?.()}
            className="opacity-80 hover:opacity-100 text-white rounded-md p-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
