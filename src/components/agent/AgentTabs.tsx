"use client";

type Tab = "explore" | "history";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function AgentTabs({ active, onChange }: Props) {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 gap-1">
      {(["explore", "history"] as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
            active === tab
              ? "bg-primary text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab === "explore" ? "Explore" : "History"}
        </button>
      ))}
    </div>
  );
}
