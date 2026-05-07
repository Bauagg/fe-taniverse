"use client";

import { IconSearch, IconFilter } from "@/assets/icons";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function AgentSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
        <span className="text-gray-400 flex-shrink-0">
          <IconSearch size={16} />
        </span>
        <input
          type="text"
          placeholder="Find what you needed..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
      <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-shrink-0">
        <IconFilter size={16} />
      </button>
    </div>
  );
}
