'use client';

import React from 'react';

interface BottomNavProps {
  viewMode: 'list' | 'map';
  setViewMode: (v: 'list' | 'map') => void;
  onAdd: () => void;
}

export default function BottomNav({ viewMode, setViewMode, onAdd }: BottomNavProps) {
  return (
    <nav className="bottom-nav fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] sm:hidden z-50">
      <div className="card-surface p-2 flex items-center justify-between rounded-2xl shadow-md">
        <button className={`flex-1 text-center py-2 ${viewMode === 'list' ? 'label' : 'muted'}`} onClick={() => setViewMode('list')}>
          <div className="text-lg">📋</div>
          <div className="text-xs">Liste</div>
        </button>
        <button className="px-3 py-2 btn-primary rounded-xl mx-2" onClick={onAdd}>➕</button>
        <button className={`flex-1 text-center py-2 ${viewMode === 'map' ? 'label' : 'muted'}`} onClick={() => setViewMode('map')}>
          <div className="text-lg">🗺️</div>
          <div className="text-xs">Kart</div>
        </button>
      </div>
    </nav>
  );
}
