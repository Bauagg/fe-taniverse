"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import UserAvatar from "@/components/ui/UserAvatar";
import ProductImage from "@/components/ui/ProductImage";
import { IconHeart, IconSend, IconAgent, IconMoreHorizontal, IconMessageCircle } from "@/assets/icons";
import type { EcomPost } from "@/types/ecommerce";

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const OPTIONS = ["Simpan Postingan", "Sembunyikan", "Salin Tautan", "Blokir Pengguna", "Laporkan"];

interface Props {
  post: EcomPost;
  onComment: () => void;
}

export default function PostCard({ post, onComment }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const TRIM_AT = 130;
  const isTrimmed = post.content.length > TRIM_AT;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleLike = () => {
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    setLiked((v) => !v);
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        <UserAvatar initials={post.user.initials} colorClass={post.user.colorClass} size={44} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 leading-tight">{post.user.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">@{post.user.username} · {post.postedAt}</p>
        </div>
        <div ref={menuRef} className="relative mt-0.5">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IconMoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-48">
              {OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800 leading-relaxed">
          {expanded || !isTrimmed ? post.content : `${post.content.slice(0, TRIM_AT)}...`}
          {isTrimmed && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              selengkapnya
            </button>
          )}
        </p>
      </div>

      {/* Image — 4:3, no horizontal padding so it bleeds edge to edge */}
      <div className="aspect-4/3 overflow-hidden bg-gray-50">
        <ProductImage name={post.productLabel ?? post.user.name} />
      </div>

      {/* Reactions summary */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span>❤️🔥</span>
          <span>{formatCount(likeCount)} menyukai ini</span>
        </span>
        <span>{formatCount(post.comments)} komentar · {formatCount(post.shares)} dibagikan</span>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Actions — IG/LinkedIn style: no dividers, just spaced buttons */}
      <div className="flex items-center px-1 py-1">
        <button
          onClick={toggleLike}
          className={`flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl transition-colors text-sm font-medium hover:bg-gray-50 ${liked ? "text-red-500" : "text-gray-500"}`}
        >
          <IconHeart size={18} filled={liked} />
          Suka
        </button>
        <button onClick={onComment} className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          <IconMessageCircle size={18} />
          Komentar
        </button>
        <Link
          href="/agent"
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <IconAgent size={18} />
          Agent
        </Link>
        <button className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          <IconSend size={18} />
          Kirim
        </button>
      </div>

    </article>
  );
}
