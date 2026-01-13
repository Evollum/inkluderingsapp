'use client';

import { Event, CATEGORIES } from '@/types/event';
import { formatTimeDot, formatDateShort } from '@/lib/format';

interface EventCardProps {
  event: Event;
  onSignUp?: (id: string) => void;
}

export default function EventCard({ event, onSignUp }: EventCardProps) {
  const category = CATEGORIES[event.category];
  const full = !!(event.maxParticipants && event.currentParticipants >= event.maxParticipants);

  return (
    <div className="card-surface rounded-xl shadow-sm overflow-hidden w-full">
      <div className={`h-1 ${category.color}`} />
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-4 mb-2">
          <div className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(255,255,255,0.6)' }}>
            <span aria-hidden style={{ fontSize: 22 }}>{category.emoji}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-semibold label">{event.title}</h3>
                <div className="text-xs muted">{event.city} • {formatDateShort(event.date)} {event.time ? `• ${formatTimeDot(event.time)}` : ''}</div>
              </div>
              <div className="text-sm text-right">
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>{category.label}</span>
              </div>
            </div>

            <p className="text-sm muted mt-2 line-clamp-3">{event.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm muted">{event.currentParticipants}/{event.maxParticipants ?? '—'} deltakere</div>
              <button
                type="button"
                onClick={() => onSignUp?.(event.id)}
                disabled={full}
                className={`btn-primary ${full ? 'opacity-60 pointer-events-none' : ''}`}
              >
                {full ? 'Fullt' : 'Meld deg på'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
