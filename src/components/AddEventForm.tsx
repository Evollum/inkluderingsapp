'use client';

import { useState } from 'react';
import { EventCategory, CATEGORIES, CITIES, CITY_COORDINATES } from '@/types/event';

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
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Try to geocode the address (location + city) using Nominatim
    const query = encodeURIComponent(`${formData.location}, ${formData.city}`);
    let coords = CITY_COORDINATES[formData.city] ?? { lat: 59.9139, lng: 10.7522 };

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      if (res.ok) {
        const results = await res.json();
        if (results && results.length > 0) {
          coords = { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
        }
      }
    } catch (err) {
      // ignore and fallback to city center
    }

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
      coordinates: coords,
    };

    onAdd(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="card-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight label">
                ✨ Legg til arrangement
              </h2>
              <p className="mt-1 text-sm muted">
                Fyll inn detaljer — arrangementet vises i listen og på kartet.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Lukk"
              className="shrink-0 btn-ghost"
            >
              ✕
            </button>
          </div>

          <div className="h-px my-6" style={{ background: 'var(--border)' }} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm label mb-2">
                Tittel *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm label mb-2">
                Beskrivelse *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm label mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="input-field w-full"
                >
                  {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm label mb-2">
                  By *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input-field w-full"
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
                <label className="block text-sm label mb-2">
                  Dato *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm label mb-2">
                  Tidspunkt *
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm label mb-2">
                Sted *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field w-full"
                placeholder="F.eks. Studentsenteret, Rom 101"
              />
            </div>

            <div>
              <label className="block text-sm label mb-2">
                Arrangør *
              </label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm label mb-2">
                Maks antall deltakere (valgfritt)
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="input-field w-full"
              />
            </div>

            {/* Coordinates are resolved automatically from the address */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button type="submit" className="btn-primary flex-1">Legg til arrangement</button>
              <button type="button" onClick={onClose} className="btn-ghost flex-1">Avbryt</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
