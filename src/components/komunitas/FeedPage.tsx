"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import CommentsPanel from "./CommentsPanel";
import UserAvatar from "@/components/ui/UserAvatar";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { IconSearch } from "@/assets/icons";
import { mockPosts, trendingProducts, suggestedUsers } from "@/lib/ecommerce-mock";
import { mockUser } from "@/lib/profile-mock";
import Link from "next/link";

const CATEGORIES = ["Semua", "Pupuk", "Pestisida", "Alat Tani", "Benih", "Organik"];

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [commentPost, setCommentPost] = useState<(typeof mockPosts)[0] | null>(null);

  return (
    <div className="bg-[#f3f2ef] min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-5 items-start">

          {/* ── Left Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-3 w-56 shrink-0 sticky top-[80px]">

            {/* Profile mini card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-14 bg-linear-to-br from-primary to-green-600 rounded-t-2xl" />
              <div className="px-4 pb-4 -mt-7">
                <ProfileAvatar initials={mockUser.initials} />
                <p className="font-semibold text-sm text-gray-800 mt-2">{mockUser.name}</p>
                <p className="text-xs text-gray-400">{mockUser.email}</p>
                <Link
                  href="/profile"
                  className="mt-3 block text-center text-xs font-semibold text-primary border border-primary/30 rounded-lg py-1.5 hover:bg-primary/5 transition-colors"
                >
                  Lihat Profil
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Kategori</p>
              <ul className="space-y-0.5">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* ── Feed ── */}
          <main className="flex-1 min-w-0 space-y-3">

            {/* Composer bar */}
            <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
              <ProfileAvatar initials={mockUser.initials} />
              <button className="flex-1 text-left bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2.5 text-sm text-gray-400">
                Bagikan pengalaman pertanian Anda...
              </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm px-4 py-2.5 flex items-center gap-2">
              <span className="text-gray-400 shrink-0"><IconSearch size={16} /></span>
              <input
                type="text"
                placeholder="Cari di Komunitas..."
                className="flex-1 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Category pills (mobile) */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts */}
            {mockPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onComment={() => setCommentPost(post)}
              />
            ))}

          </main>

          {/* ── Right Sidebar ── */}
          <aside className="hidden xl:flex flex-col gap-3 w-64 shrink-0 sticky top-[80px]">

            {/* Trending */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Trending di Komunitas</p>
              <ul className="space-y-3">
                {trendingProducts.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 group cursor-pointer">
                    <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                      #{i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-xs text-primary font-semibold">{p.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Orang yang Mungkin Anda Kenal</p>
              <ul className="space-y-4">
                {suggestedUsers.map((u) => (
                  <li key={u.username} className="flex items-center gap-3">
                    <UserAvatar initials={u.initials} colorClass={u.colorClass} size={38} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{u.name}</p>
                      <p className="text-xs text-gray-400 truncate">@{u.username}</p>
                    </div>
                    <button className="shrink-0 text-xs font-semibold text-primary border border-primary/30 px-3 py-1 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Ikuti
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>

      <CommentsPanel post={commentPost} onClose={() => setCommentPost(null)} />
    </div>
  );
}
