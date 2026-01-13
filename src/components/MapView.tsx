'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Event, CATEGORIES } from '@/types/event';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

// Custom colored markers
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); margin-top: 5px; margin-left: 7px; font-size: 14px;">${getEmojiForColor(color)}</div></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const getEmojiForColor = (color: string) => {
  const colorMap: Record<string, string> = {
    '#3B82F6': '🏃',
    '#A855F7': '🎨',
    '#10B981': '👥',
    '#F97316': '📚',
  };
  return colorMap[color] || '📍';
};

const getColorForCategory = (category: string) => {
  const colorMap: Record<string, string> = {
    sport: '#3B82F6',
    creative: '#A855F7',
    social: '#10B981',
    academic: '#F97316',
  };
  return colorMap[category] || '#6B7280';
};

function MapBounds({ events }: { events: Event[] }) {
  const map = useMap();

  useEffect(() => {
    if (events.length > 0) {
      const bounds = L.latLngBounds(
        events.map(event => [event.coordinates.lat, event.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [events, map]);

  return null;
}

export default function MapView({ events, onEventClick }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Laster kart...</p>
      </div>
    );
  }

  // Default center (Norway)
  const defaultCenter: [number, number] = [60.472, 8.4689];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
          const category = CATEGORIES[event.category];
          const color = getColorForCategory(event.category);
          
          return (
            <Marker
              key={event.id}
              position={[event.coordinates.lat, event.coordinates.lng]}
              icon={createColoredIcon(color)}
              eventHandlers={{
                click: () => onEventClick?.(event),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{category.emoji}</span>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <div className="space-y-1 text-sm">
                    <p><strong>📍</strong> {event.location}</p>
                    <p><strong>📅</strong> {event.date} kl. {event.time}</p>
                    <p><strong>🏙️</strong> {event.city}</p>
                    <p><strong>👤</strong> {event.organizer}</p>
                  </div>
                  <div className="mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
                      {category.label}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => onEventClick?.(event)}
                      disabled={!!(event.maxParticipants && event.currentParticipants >= event.maxParticipants)}
                      className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
                        event.maxParticipants && event.currentParticipants >= event.maxParticipants
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      Meld deg på
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {events.length > 0 && <MapBounds events={events} />}
      </MapContainer>
    </div>
  );
}
