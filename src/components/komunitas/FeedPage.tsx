"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import CommentsPanel from "./CommentsPanel";
import CreatePostModal from "./CreatePostModal";
import UserAvatar from "@/components/ui/UserAvatar";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { IconSearch } from "@/assets/icons";
import { mockPosts, trendingProducts, suggestedUsers } from "@/lib/ecommerce-mock";
import { mockUser } from "@/lib/profile-mock";
import Link from "next/link";


export default function FeedPage() {
  const [commentPost, setCommentPost] = useState<(typeof mockPosts)[0] | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

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

            {/* User Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Statistik Anda</p>
              <div className="space-y-3">
                {[
                  { label: "Postingan", value: mockUser.posts ?? 0 },
                  { label: "Pengikut", value: mockUser.followers ?? 0 },
                  { label: "Mengikuti", value: mockUser.following ?? 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-bold text-gray-800">{value.toLocaleString("id-ID")}</span>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* ── Feed ── */}
          <main className="flex-1 min-w-0 space-y-3">

            {/* Search + Create */}
            <div className="bg-white rounded-2xl shadow-sm px-4 py-2.5 flex items-center gap-2">
              <span className="text-gray-400 shrink-0"><IconSearch size={16} /></span>
              <input
                type="text"
                placeholder="Cari di Komunitas..."
                className="flex-1 text-sm outline-none placeholder:text-gray-400"
              />
              <button
                onClick={() => setCreateOpen(true)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-green-600 transition-all shadow-sm shadow-primary/30"
              >
                + Buat Post
              </button>
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
      {createOpen && <CreatePostModal onClose={() => setCreateOpen(false)} />}
    </div>
  );
}
