"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function AgentSearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Cari produk, penjual, atau kategori..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-gray-400 text-gray-700 shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
}
