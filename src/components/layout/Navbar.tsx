"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "E-Commerce", href: "/e-commerce" },
  { label: "Agent", href: "/agent" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary flex-shrink-0">
          Taniverse
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
