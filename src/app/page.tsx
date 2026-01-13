'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import AddEventForm from '@/components/AddEventForm';
import BottomNav from '@/components/BottomNav';
import { Event, EventCategory, CITIES } from '@/types/event';
import Toast from '@/components/Toast';

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
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'info' | 'error'; actionLabel?: string; onAction?: () => void }>>([]);

  const filteredEvents = events.filter((event) => {
    const cityMatch = selectedCity === 'all' || event.city === selectedCity;
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    return cityMatch && categoryMatch;
  });

  const addToast = (t: { id: string; message: string; type?: 'success' | 'info' | 'error'; actionLabel?: string; onAction?: () => void }) => {
    setToasts((prev) => [...prev, t]);
  };

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleAddEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
    addToast({ id: `add-${newEvent.id}`, message: 'Arrangement lagt til', type: 'success' });
  };

  const handleSignUp = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== id) return ev;
        const isFull = ev.maxParticipants && ev.currentParticipants >= ev.maxParticipants;
        if (isFull) return ev;
        return { ...ev, currentParticipants: ev.currentParticipants + 1 };
      })
    );

    // prepare undo action
    const undo = () => {
      setEvents((prev) =>
        prev.map((ev) => {
          if (ev.id !== id) return ev;
          return { ...ev, currentParticipants: Math.max(0, ev.currentParticipants - 1) };
        })
      );
      addToast({ id: `undo-${id}-${Date.now()}`, message: 'Påmelding angret', type: 'info' });
    };

    addToast({ id: `signup-${id}-${Date.now()}`, message: 'Du er påmeldt!', type: 'success', actionLabel: 'Angre', onAction: undo });
  };

  return (
    <div className="min-h-screen">
      <header className="py-8">
        <div className="container mx-auto px-4">
          <div className="card-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Bilder/198ce145-031c-4804-92f9-49bd1e90e64b.png`} alt="ses logo" className="h-10 w-10 rounded-md object-contain" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight label">ses</h1>
                <p className="mt-1 text-sm muted">Finn og delta på arrangementer for studenter</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg p-1 panel">
                <button
                  onClick={() => setViewMode('list')}
                  className={
                    viewMode === 'list'
                      ? 'px-4 py-2 rounded-md transition-colors focus:outline-none bg-panel label shadow-sm'
                      : 'px-4 py-2 rounded-md transition-colors focus:outline-none btn-ghost muted'
                  }
                >
                  📋 Liste
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={
                    viewMode === 'map'
                      ? 'px-4 py-2 rounded-md transition-colors focus:outline-none bg-panel label shadow-sm'
                      : 'px-4 py-2 rounded-md transition-colors focus:outline-none btn-ghost muted'
                  }
                >
                  🗺️ Kart
                </button>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                ✨ Legg til arrangement
              </button>
            </div>
          </div>
          {/* mobile placeholder removed (was causing duplicate rendering) */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold label mb-2">
              Kommende arrangementer
            </h2>
            <p className="muted">
              {filteredEvents.length} arrangement{filteredEvents.length !== 1 ? 'er' : ''} funnet
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex panel rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'list'
                    ? 'bg-panel label shadow-sm'
                    : 'muted'
                }`}
              >
                📋 Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'map'
                    ? 'bg-panel label shadow-sm'
                    : 'muted'
                }`}
              >
                🗺️ Kart
              </button>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
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

        <div className="toast-container">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              message={t.message}
              type={t.type}
              actionLabel={t.actionLabel}
              onAction={t.onAction}
              onClose={() => removeToast(t.id)}
              duration={5000}
            />
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl muted">
              Ingen arrangementer funnet med disse filtrene
            </p>
            <p className="muted mt-2">
              Prøv å endre filtrene eller legg til et nytt arrangement!
            </p>
          </div>
        ) : viewMode === 'map' ? (
          <div className="h-[600px] w-full">
            <MapView events={filteredEvents} onEventClick={(e) => handleSignUp(e.id)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onSignUp={handleSignUp} />
            ))}
          </div>
        )}
        <BottomNav viewMode={viewMode} setViewMode={setViewMode} onAdd={() => setShowAddForm(true)} />
      </main>

      {showAddForm && (
        <AddEventForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddEvent}
        />
      )}

      <footer className="footer py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Inkluderingsapp - Laget for studenter, av studenter</p>
        </div>
      </footer>
    </div>
  );
}
