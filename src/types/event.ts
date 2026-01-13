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

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Oslo: { lat: 59.9139, lng: 10.7522 },
  Bergen: { lat: 60.3913, lng: 5.3221 },
  Trondheim: { lat: 63.4305, lng: 10.3951 },
  Stavanger: { lat: 58.9700, lng: 5.7331 },
  Kristiansand: { lat: 58.1467, lng: 7.9956 },
  Tromsø: { lat: 69.6496, lng: 18.9560 },
  Drammen: { lat: 59.7439, lng: 10.2046 },
  Fredrikstad: { lat: 59.2138, lng: 10.9390 },
  Sandnes: { lat: 58.8526, lng: 5.7310 },
  Bodø: { lat: 67.2804, lng: 14.4049 },
};
