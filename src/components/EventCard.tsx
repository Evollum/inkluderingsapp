'use client';

import { Event, CATEGORIES } from '@/types/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const category = CATEGORIES[event.category];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`h-2 ${category.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <span className="text-2xl">{category.emoji}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
          <div className="flex items-center">
            <span className="font-semibold mr-2">📍</span>
            <span>{event.location}, {event.city}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold mr-2">📅</span>
            <span>{event.date} kl. {event.time}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold mr-2">👤</span>
            <span>Arrangør: {event.organizer}</span>
          </div>
          
          {event.maxParticipants && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">👥</span>
              <span>{event.currentParticipants}/{event.maxParticipants} deltakere</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${category.color}`}>
            {category.label}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Meld deg på
          </button>
        </div>
      </div>
    </div>
  );
}
