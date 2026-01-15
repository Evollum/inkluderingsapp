import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="card-surface rounded-2xl p-8 sm:p-12 max-w-xl mx-auto text-center">
          <Link href="/events" className="inline-flex flex-col items-center gap-4">
            <div className="logo-wrap">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bilder/198ce145-031c-4804-92f9-49bd1e90e64b.png`}
                alt="ses logo"
                className="h-24 w-24 object-contain logo-img"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight label">ses</h1>
          </Link>

          <p className="mt-4 muted">Trykk på logoen for å fortsette.</p>

          <div className="mt-8">
            <Link href="/events" className="btn-primary inline-flex items-center justify-center">
              Se arrangementer
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
