# Inkluderingsapp for Studenter

En web-applikasjon for studenter hvor de kan legge ut og finne arrangementer basert på kategori og lokalisering.

## Funksjoner

- 🎨 **Fargekodede kategorier**:
  - 🏃 Sport (blå)
  - 🎨 Kreativt (lilla)
  - 👥 Sosialt (grønn)
  - 📚 Akademisk (oransje)

- 📍 **Lokalisering**: Filtrer arrangementer basert på by
- ➕ **Legg til arrangementer**: Studenter kan legge ut egne arrangementer
- 🔍 **Filtrer og søk**: Enkelt å finne relevante arrangementer
- 📱 **Responsiv design**: Fungerer på mobil, tablet og desktop

## Teknologier

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI komponenter

## Komme i gang

1. Installer avhengigheter:
```bash
npm install
```

2. Kjør utviklingsserver:
```bash
npm run dev
```

3. Åpne http://localhost:3000 i nettleseren.

## Prosjektstruktur

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Hovedside
│   └── globals.css      # Global styles
├── components/
│   ├── EventCard.tsx    # Arrangement kort
│   ├── FilterBar.tsx    # Filter komponent
│   └── AddEventForm.tsx # Legg til arrangement
└── types/
    └── event.ts         # Type definisjoner
```

## Scripts

- `npm run dev` - Start utviklingsserver
- `npm run build` - Bygg for produksjon
- `npm run start` - Start produksjonsserver
- `npm run lint` - Kjør ESLint

## Fremtidige forbedringer

- Database integrasjon (f.eks. Supabase eller Firebase)
- Brukerautentisering
- Påmeldings-funksjonalitet
- Push-varsler for nye arrangementer
- Bildelasting for arrangementer
- Kommentarer og ratings

## Lisens

Dette er et studentprosjekt for læringsformål.
