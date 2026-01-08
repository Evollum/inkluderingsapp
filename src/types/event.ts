// Event types and interfaces

export type EventCategory = 'sport' | 'creative' | 'social' | 'academic';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  city: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  maxParticipants?: number;
  currentParticipants: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const CATEGORIES: Record<EventCategory, { label: string; color: string; emoji: string }> = {
  sport: { label: 'Sport', color: 'bg-sport', emoji: '🏃' },
  creative: { label: 'Kreativt', color: 'bg-creative', emoji: '🎨' },
  social: { label: 'Sosialt', color: 'bg-social', emoji: '👥' },
  academic: { label: 'Akademisk', color: 'bg-academic', emoji: '📚' },
};

export const CITIES = [
  'Oslo',
  'Bergen',
  'Trondheim',
  'Stavanger',
  'Kristiansand',
  'Tromsø',
  'Drammen',
  'Fredrikstad',
  'Sandnes',
  'Bodø',
];
