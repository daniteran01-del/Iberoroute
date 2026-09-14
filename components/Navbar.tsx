"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "text-ink font-semibold"
      : "text-ink/70 hover:text-ink transition-colors";

  return (
    <header className="border-b border-line bg-panel">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-ink">
          Iberoute
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <Link href="/" className={linkClass("/")}>
            Find a Ride
          </Link>
          <Link href="/docs" className={linkClass("/docs")}>
            How it Works
          </Link>
          <Link
            href="/core"
            className="px-3 py-1.5 rounded-sm bg-ink text-paper hover:opacity-90 transition-opacity"
          >
            Post a Ride
          </Link>
        </nav>
      </div>
    </header>
  );
}
