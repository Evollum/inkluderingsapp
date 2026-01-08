'use client';

import { Event, CATEGORIES } from '@/types/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const category = CATEGORIES[event.category];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-2 ${category.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {category.emoji}
            </span>
            <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
              {category.label}
            </span>
          </div>
        </div>
        
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
          {event.description}
        </p>
        
        <dl className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">📍 Sted</dt>
            <dd className="min-w-0">{event.location}, {event.city}</dd>
          </div>

          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">📅 Tid</dt>
            <dd className="min-w-0">{event.date} kl. {event.time}</dd>
          </div>

          <div className="flex gap-2">
            <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">👤 Arrangør</dt>
            <dd className="min-w-0">{event.organizer}</dd>
          </div>

          {event.maxParticipants && (
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 font-medium text-gray-500 dark:text-gray-400">👥 Deltakere</dt>
              <dd className="min-w-0">{event.currentParticipants}/{event.maxParticipants}</dd>
            </div>
          )}
        </dl>
        
        <div className="mt-5 flex items-center justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
            Meld deg på
          </button>
        </div>
      </div>
    </div>
  );
}
