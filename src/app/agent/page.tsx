"use client";

import { useState, useMemo } from "react";
import { AGENT_PRODUCTS } from "@/lib/agent-mock";
import AgentCard from "@/components/agent/AgentCard";
import AgentSearchBar from "@/components/agent/AgentSearchBar";
import AgentTabs from "@/components/agent/AgentTabs";

type Tab = "explore" | "history";

export default function AgentPage() {
  const [tab, setTab] = useState<Tab>("explore");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const list = tab === "history" ? AGENT_PRODUCTS.slice(0, 2) : AGENT_PRODUCTS;
    if (!search.trim()) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.seller.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Agent Marketplace</h1>
        <p className="text-sm text-gray-400">
          Temukan produk pertanian berkualitas dari seluruh Indonesia
        </p>
      </div>

      {/* Search + Tabs row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="w-full sm:max-w-sm">
          <AgentSearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-52">
          <AgentTabs active={tab} onChange={setTab} />
        </div>
        <div className="ml-auto text-sm text-gray-400">
          {filtered.length} produk ditemukan
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <AgentCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">Produk tidak ditemukan</p>
        </div>
      )}

    </div>
  );
}
