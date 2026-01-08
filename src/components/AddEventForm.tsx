'use client';

import { useState } from 'react';
import { EventCategory, CATEGORIES, CITIES } from '@/types/event';

interface AddEventFormProps {
  onClose: () => void;
  onAdd: (event: any) => void;
}

export default function AddEventForm({ onClose, onAdd }: AddEventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'social' as EventCategory,
    city: CITIES[0],
    date: '',
    time: '',
    location: '',
    organizer: '',
    maxParticipants: '',
    lat: '',
    lng: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      city: formData.city,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      organizer: formData.organizer,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
      currentParticipants: 0,
      coordinates: {
        lat: formData.lat ? parseFloat(formData.lat) : 59.9139,
        lng: formData.lng ? parseFloat(formData.lng) : 10.7522,
      },
    };
    
    onAdd(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Legg til arrangement
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Fyll inn detaljer, så vises arrangementet i listen.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Lukk"
              className="shrink-0 rounded-lg px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ×
            </button>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-6" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tittel *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Beskrivelse *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  By *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dato *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tidspunkt *
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sted *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="F.eks. Studentsenteret, Rom 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arrangør *
              </label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maks antall deltakere (valgfritt)
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Kartplassering (valgfritt)
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Legg til koordinater for å vise arrangementet på kartet. Du kan finne koordinater på{' '}
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Google Maps
                </a>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Breddegrad (Latitude)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="F.eks. 59.9139"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lengdegrad (Longitude)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="F.eks. 10.7522"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Legg til arrangement
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
