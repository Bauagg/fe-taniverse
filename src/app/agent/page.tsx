"use client";

import { useState, useMemo } from "react";
import { AGENT_PRODUCTS } from "@/lib/agent-mock";
import AgentCard from "@/components/agent/AgentCard";
import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  AlignLeft,
  MapPin,
  Tag,
  CheckCircle,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

type SortKey = "terbaru" | "termurah" | "termahal" | "rating";
type StatusFilter = "semua" | "baru" | "hot";

const ALL_CATEGORIES = [
  "Semua Kategori",
  ...Array.from(new Set(AGENT_PRODUCTS.map((p) => p.category))),
];
const ALL_LOCATIONS = [
  "Semua Lokasi",
  ...Array.from(new Set(AGENT_PRODUCTS.map((p) => p.seller.location))),
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "terbaru", label: "Terbaru" },
  { key: "termurah", label: "Harga Terendah" },
  { key: "termahal", label: "Harga Tertinggi" },
  { key: "rating", label: "Rating Terbaik" },
];

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Produk Berkualitas",
    desc: "Kualitas terbaik dari petani pilihan",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Pengiriman aman & tepat waktu",
  },
  {
    icon: ShieldCheck,
    title: "Transaksi Aman",
    desc: "100% aman dan terpercaya",
  },
  {
    icon: Headphones,
    title: "Dukungan 24/7",
    desc: "Tim kami siap membantu Anda",
  },
];

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-sm font-bold text-gray-800">{title}</span>
        {open ? (
          <ChevronUp size={15} className="text-gray-400" />
        ) : (
          <ChevronDown size={15} className="text-gray-400" />
        )}
      </button>
      {open && children}
    </div>
  );
}

export default function AgentPage() {
  const [category, setCategory] = useState("Semua Kategori");
  const [status, setStatus] = useState<StatusFilter>("semua");
  const [location, setLocation] = useState("Semua Lokasi");
  const [sort, setSort] = useState<SortKey>("terbaru");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...AGENT_PRODUCTS];

    if (category !== "Semua Kategori")
      list = list.filter((p) => p.category === category);
    if (location !== "Semua Lokasi")
      list = list.filter((p) => p.seller.location === location);
    if (status === "baru") list = list.filter((_, i) => i === 1);
    if (status === "hot") list = list.filter((_, i) => i === 0);

    return list.sort((a, b) => {
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      if (sort === "rating") return b.seller.rating - a.seller.rating;
      return 0;
    });
  }, [category, location, status, sort]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Semua Kategori": AGENT_PRODUCTS.length,
    };
    AGENT_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Semua Lokasi": AGENT_PRODUCTS.length,
    };
    AGENT_PRODUCTS.forEach((p) => {
      counts[p.seller.location] = (counts[p.seller.location] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Marketplace Agent
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Temukan berbagai agent terbaik untuk kebutuhan Anda
          </p>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <SidebarSection title="Kategori">
                <div className="space-y-1">
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
                        category === cat
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Tag
                          size={13}
                          className={
                            category === cat ? "text-primary" : "text-gray-400"
                          }
                        />
                        {cat}
                      </span>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                          category === cat
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {categoryCounts[cat] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Status">
                <div className="space-y-1">
                  {(
                    [
                      {
                        key: "semua",
                        label: "Semua",
                        count: AGENT_PRODUCTS.length,
                      },
                      { key: "baru", label: "Baru", count: 1 },
                      { key: "hot", label: "Hot", count: 1 },
                    ] as { key: StatusFilter; label: string; count: number }[]
                  ).map(({ key, label, count }) => (
                    <button
                      key={key}
                      onClick={() => setStatus(key)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
                        status === key
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            key === "hot"
                              ? "bg-red-500"
                              : key === "baru"
                                ? "bg-primary"
                                : "bg-gray-400"
                          }`}
                        />
                        {label}
                      </span>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                          status === key
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Lokasi Penjual">
                <div className="space-y-1">
                  {ALL_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm transition-all ${
                        location === loc
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin
                          size={13}
                          className={
                            location === loc ? "text-primary" : "text-gray-400"
                          }
                        />
                        {loc}
                      </span>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                          location === loc
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {locationCounts[loc] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Rentang Stok" defaultOpen={false}>
                <div className="px-1">
                  <input
                    type="range"
                    min={0}
                    max={50}
                    defaultValue={50}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0 Ton</span>
                    <span>50 Ton+</span>
                  </div>
                </div>
              </SidebarSection>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-semibold text-gray-800">
                  1–{filtered.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-gray-800">
                  {filtered.length}
                </span>{" "}
                produk
              </p>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((p) => !p)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-primary/40 transition-colors shadow-sm"
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

                {/* Filter – Mobile only */}
                <button className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 shadow-sm">
                  <SlidersHorizontal size={14} />
                  Filter
                </button>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product, i) => (
                  <AgentCard
                    key={product.id}
                    product={product}
                    badge={i === 0 ? "hot" : i === 1 ? "baru" : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-3">🌾</div>
                <p className="font-semibold text-gray-700 mb-1">
                  Produk tidak ditemukan
                </p>
                <p className="text-sm text-gray-400">
                  Coba ubah kategori atau filter lainnya
                </p>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronDown size={14} className="rotate-90" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-semibold shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronDown size={14} className="-rotate-90" />
                </button>
              </div>
            )}

            {/* Features Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
