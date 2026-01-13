'use client';

import { EventCategory, CATEGORIES } from '@/types/event';

interface FilterBarProps {
  selectedCity: string;
  selectedCategory: EventCategory | 'all';
  cities: string[];
  onCityChange: (city: string) => void;
  onCategoryChange: (category: EventCategory | 'all') => void;
}

export default function FilterBar({
  selectedCity,
  selectedCategory,
  cities,
  onCityChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="card-surface p-4 sm:p-6 rounded-xl mb-8">
      <h2 className="text-base font-semibold label">Filtre</h2>
      <p className="mt-1 text-sm muted">Velg by og kategori for å snevre inn listen.</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm label mb-2">
            Velg by
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="input-field w-full"
          >
            <option value="all">Alle byer</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm label mb-2">
            Velg kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as EventCategory | 'all')}
            className="input-field w-full"
          >
            <option value="all">Alle kategorier</option>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
