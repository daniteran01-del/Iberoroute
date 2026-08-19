import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-line bg-panel">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-ink">
          Iberoute
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-ink/70">
          <Link href="/" className="hover:text-ink transition-colors">
            Rides
          </Link>
          <Link href="/docs" className="hover:text-ink transition-colors">
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
