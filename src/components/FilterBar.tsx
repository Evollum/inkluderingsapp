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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">Filtre</h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Velg by og kategori for å snevre inn listen.</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Velg by
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Velg kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as EventCategory | 'all')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
