"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Bell, Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/image/logo.png";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Komunitas", href: "/komunitas" },
  { label: "Agent", href: "/agent" },
  { label: "AI", href: "/ai" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">

        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
          <Image src={logo} alt="Taniverse" height={36} width={36} className="object-contain" />
          <span className="font-extrabold text-lg tracking-tight hidden sm:block text-primary">
            Taniverse
          </span>
        </Link>

        {/* Search Bar – Desktop */}
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari komunitas, agent, atau konten..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-gray-700"
            />
          </div>
        </div>

        {/* Nav Links – Desktop */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 ml-auto shrink-0">

          <button
            onClick={() => setSearchOpen((p) => !p)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Search size={18} />
          </button>

          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="hidden md:block w-px h-5 bg-gray-200 mx-1" />

          <Link
            href="/login"
            className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-green-600 transition-all shadow-sm shadow-primary/20 hover:scale-[1.02]"
          >
            Daftar
            <ArrowRight size={14} />
          </Link>

          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Search – Mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ${searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari komunitas, agent, atau konten..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/8 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />}
                {label}
              </Link>
            );
          })}
          <div className="flex gap-3 mt-2 pt-3 border-t border-gray-100">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-full text-sm font-semibold text-primary border-2 border-primary hover:bg-primary/5 transition-all">
              Masuk
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-green-600 transition-all">
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
