"use client";

import { Compass, Clock } from "lucide-react";

type Tab = "explore" | "history";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "explore", label: "Jelajahi", icon: Compass },
  { key: "history", label: "Riwayat", icon: Clock },
];

export default function AgentTabs({ active, onChange }: Props) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      {TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === key
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}
