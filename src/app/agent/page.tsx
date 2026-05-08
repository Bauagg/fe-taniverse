"use client";

import { useState, useMemo } from "react";
import { AGENT_PRODUCTS } from "@/lib/agent-mock";
import AgentCard from "@/components/agent/AgentCard";
import AgentSearchBar from "@/components/agent/AgentSearchBar";
import AgentTabs from "@/components/agent/AgentTabs";
import { SlidersHorizontal, ChevronDown, AlignLeft, Star } from "lucide-react";

type Tab = "explore" | "history";
type SortKey = "terbaru" | "termurah" | "termahal" | "rating";

const CATEGORIES = [
  "Semua",
  "Sayuran",
  "Umbi-umbian",
  "Buah",
  "Benih",
  "Pupuk",
  "Alat Tani",
];
const LOCATIONS = [
  "Semua Lokasi",
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Makassar",
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "terbaru", label: "Terbaru" },
  { key: "termurah", label: "Harga Terendah" },
  { key: "termahal", label: "Harga Tertinggi" },
  { key: "rating", label: "Rating Terbaik" },
];

export default function AgentPage() {
  const [tab, setTab] = useState<Tab>("explore");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [location, setLocation] = useState("Semua Lokasi");
  const [sort, setSort] = useState<SortKey>("terbaru");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    let list = tab === "history" ? AGENT_PRODUCTS.slice(0, 2) : AGENT_PRODUCTS;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.seller.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    if (category !== "Semua") {
      list = list.filter((p) => p.category === category);
    }
    if (location !== "Semua Lokasi") {
      list = list.filter((p) => p.seller.location === location);
    }
    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    return [...list].sort((a, b) => {
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      if (sort === "rating") return b.seller.rating - a.seller.rating;
      return 0;
    });
  }, [tab, search, category, location, sort, minPrice, maxPrice]);

  const activeFilters =
    (category !== "Semua" ? 1 : 0) +
    (location !== "Semua Lokasi" ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0);

  const resetFilters = () => {
    setCategory("Semua");
    setLocation("Semua Lokasi");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="w-full sm:w-52">
            <AgentTabs active={tab} onChange={setTab} />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-400 hidden sm:block">
              <span className="font-semibold text-gray-700">
                {filtered.length}
              </span>{" "}
              produk
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSortOpen((p) => !p);
                  setFilterOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary/40 transition-colors shadow-sm"
              >
                <AlignLeft size={14} />
                {SORT_OPTIONS.find((s) => s.key === sort)?.label}
                <ChevronDown size={14} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-30 py-1.5 w-44">
                  {SORT_OPTIONS.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSort(key);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sort === key
                          ? "text-primary font-semibold bg-primary/5"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => {
                setFilterOpen((p) => !p);
                setSortOpen(false);
              }}
              className={`relative flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-medium transition-all shadow-sm ${
                filterOpen || activeFilters > 0
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-primary/40"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filter
              {activeFilters > 0 && (
                <span className="w-4 h-4 bg-white text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Lokasi */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Lokasi
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        location === loc
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rentang Harga */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Rentang Harga (Rp)
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <span className="text-gray-400 text-sm shrink-0">—</span>
                  <input
                    type="number"
                    placeholder="Maks"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Rating Minimum
                </p>
                <div className="flex gap-2">
                  {[4, 4.5, 5].map((r) => (
                    <button
                      key={r}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all"
                    >
                      <Star size={12} className="fill-current" />
                      {r}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {activeFilters > 0 && (
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={resetFilters}
                  className="text-sm text-red-500 font-semibold hover:text-red-600 transition-colors"
                >
                  Reset semua filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active filter tags */}
        {activeFilters > 0 && !filterOpen && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category !== "Semua" && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {category}
                <button
                  onClick={() => setCategory("Semua")}
                  className="hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            )}
            {location !== "Semua Lokasi" && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {location}
                <button
                  onClick={() => setLocation("Semua Lokasi")}
                  className="hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                Rp {minPrice || "0"} — Rp {maxPrice || "∞"}
                <button
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                  }}
                  className="hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((product, i) => (
              <AgentCard
                key={product.id}
                product={product}
                badge={i === 0 ? "hot" : i === 1 ? "baru" : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-gray-400">
            <div className="text-6xl mb-4">🌾</div>
            <p className="text-base font-semibold text-gray-600 mb-1">
              Produk tidak ditemukan
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Coba ubah kata kunci atau filter pencarian
            </p>
            <button
              onClick={() => {
                setSearch("");
                resetFilters();
              }}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
