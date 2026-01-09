'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import AddEventForm from '@/components/AddEventForm';
import { Event, EventCategory, CITIES } from '@/types/event';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

// Sample data
const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Fotballtrening på Blindern',
    description: 'Ukentlig fotballtrening for alle nivåer. Kom og ha det gøy!',
    category: 'sport',
    city: 'Oslo',
    date: '2026-01-15',
    time: '18:00',
    location: 'Blindern idrettsanlegg',
    organizer: 'UiO Fotballklubb',
    maxParticipants: 20,
    currentParticipants: 12,
    coordinates: { lat: 59.9400, lng: 10.7217 },
  },
  {
    id: '2',
    title: 'Malekurs for nybegynnere',
    description: 'Lær grunnleggende maleteknikker i en avslappet atmosfære.',
    category: 'creative',
    city: 'Bergen',
    date: '2026-01-18',
    time: '17:00',
    location: 'Studentsenteret, Rom 204',
    organizer: 'Kreativ Klubb Bergen',
    maxParticipants: 15,
    currentParticipants: 8,
    coordinates: { lat: 60.3913, lng: 5.3221 },
  },
  {
    id: '3',
    title: 'Kaffe og studietips',
    description: 'Møt andre studenter og få tips til eksamen over en kopp kaffe.',
    category: 'social',
    city: 'Trondheim',
    date: '2026-01-20',
    time: '14:00',
    location: 'Café Sito',
    organizer: 'NTNU Studentråd',
    currentParticipants: 25,
    coordinates: { lat: 63.4305, lng: 10.3951 },
  },
  {
    id: '7',
    title: 'Ta en kaffe og bli kjent',
    description: 'Uformell kaffeprat for nye og gamle studenter. Kom som du er!',
    category: 'social',
    city: 'Trondheim',
    date: '2026-01-16',
    time: '12:30',
    location: 'Dromedar Kaffebar',
    organizer: 'Ola Nordmann',
    maxParticipants: 8,
    currentParticipants: 3,
    coordinates: { lat: 63.4316, lng: 10.3929 },
  },
  {
    id: '8',
    title: 'Tur i Bymarka (rolig tempo)',
    description: 'Bli med på en enkel tur i Bymarka. Ta med vann og en liten matbit.',
    category: 'sport',
    city: 'Trondheim',
    date: '2026-01-24',
    time: '11:00',
    location: 'Skistua, Bymarka',
    organizer: 'Kari Nordmann',
    maxParticipants: 12,
    currentParticipants: 5,
    coordinates: { lat: 63.4047, lng: 10.2962 },
  },
  {
    id: '4',
    title: 'Workshop: Introduksjon til Python',
    description: 'Lær Python-programmering fra bunnen av med erfarne mentorer.',
    category: 'academic',
    city: 'Oslo',
    date: '2026-01-22',
    time: '16:00',
    location: 'Ole-Johan Dahls hus',
    organizer: 'Ifi Studenter',
    maxParticipants: 30,
    currentParticipants: 18,
    coordinates: { lat: 59.9434, lng: 10.7178 },
  },
  {
    id: '5',
    title: 'Yoga på stranden',
    description: 'Morgenyoga ved sjøen. Ta med egen matte!',
    category: 'sport',
    city: 'Stavanger',
    date: '2026-01-25',
    time: '08:00',
    location: 'Solastranden',
    organizer: 'Stavanger Studenthelse',
    maxParticipants: 25,
    currentParticipants: 15,
    coordinates: { lat: 58.8779, lng: 5.6345 },
  },
  {
    id: '6',
    title: 'Quiz Night',
    description: 'Test kunnskapene dine i en morsom quizkveld med premier!',
    category: 'social',
    city: 'Oslo',
    date: '2026-01-28',
    time: '19:00',
    location: 'Chateau Neuf',
    organizer: 'Studentsamfunnet',
    maxParticipants: 50,
    currentParticipants: 35,
    coordinates: { lat: 59.9185, lng: 10.7348 },
  },
];

export default function Home() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredEvents = events.filter((event) => {
    const cityMatch = selectedCity === 'all' || event.city === selectedCity;
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return cityMatch && categoryMatch;
  });

  const handleAddEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            🎓 Inkluderingsapp
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Finn og delta på arrangementer for studenter
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Kommende arrangementer
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredEvents.length} arrangement{filteredEvents.length !== 1 ? 'er' : ''} funnet
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📋 Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'map'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🗺️ Kart
              </button>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              ✨ Legg til arrangement
            </button>
          </div>
        </div>

        <FilterBar
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          cities={CITIES}
          onCityChange={setSelectedCity}
          onCategoryChange={setSelectedCategory}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Ingen arrangementer funnet med disse filtrene
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Prøv å endre filtrene eller legg til et nytt arrangement!
            </p>
          </div>
        ) : viewMode === 'map' ? (
          <div className="h-[600px] w-full">
            <MapView events={filteredEvents} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>

      {showAddForm && (
        <AddEventForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddEvent}
        />
      )}

      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Inkluderingsapp - Laget for studenter, av studenter</p>
        </div>
      </footer>
    </div>
  );
}
