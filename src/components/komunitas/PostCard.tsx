"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import UserAvatar from "@/components/ui/UserAvatar";
import ProductImage from "@/components/ui/ProductImage";
import { IconSend, IconAgent, IconMoreHorizontal, IconMessageCircle } from "@/assets/icons";
import type { EcomPost } from "@/types/ecommerce";

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const OPTIONS = ["Simpan Postingan", "Sembunyikan", "Salin Tautan", "Blokir Pengguna", "Laporkan"];

const REACTIONS = [
  { key: "love",  emoji: "❤️",  label: "Suka",    color: "text-red-500" },
  { key: "fire",  emoji: "🔥",  label: "Mantap",  color: "text-orange-500" },
  { key: "haha",  emoji: "😂",  label: "Haha",    color: "text-yellow-500" },
  { key: "wow",   emoji: "😮",  label: "Wow",     color: "text-yellow-500" },
  { key: "sad",   emoji: "😢",  label: "Sedih",   color: "text-blue-500" },
  { key: "clap",  emoji: "👏",  label: "Keren",   color: "text-yellow-600" },
];

interface Props {
  post: EcomPost;
  onComment: () => void;
}

export default function PostCard({ post, onComment }: Props) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TRIM_AT = 130;
  const isTrimmed = post.content.length > TRIM_AT;

  const currentReaction = REACTIONS.find((r) => r.key === reaction);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const startShowPicker = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setPickerVisible(true), 400);
  };

  const startHidePicker = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => {
      setPickerVisible(false);
      setHoverLabel(null);
    }, 300);
  };

  const cancelHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const handleReactionClick = (key: string) => {
    if (reaction === key) {
      setReaction(null);
      setLikeCount((c) => c - 1);
    } else {
      if (!reaction) setLikeCount((c) => c + 1);
      setReaction(key);
    }
    setPickerVisible(false);
    setHoverLabel(null);
  };

  const handleSukaClick = () => {
    if (reaction) {
      setReaction(null);
      setLikeCount((c) => c - 1);
    } else {
      setReaction("love");
      setLikeCount((c) => c + 1);
    }
  };

  // Build emoji stack shown in summary (top 3 reactions)
  const summaryEmoji = reaction ? currentReaction?.emoji : "👍";

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

      {/* Image */}
      <div className="aspect-4/3 overflow-hidden bg-gray-50">
        <ProductImage name={post.productLabel ?? post.user.name} />
      </div>

      {/* Reactions summary */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          {reaction && (
            <span className="flex items-center -space-x-0.5">
              <span className="text-base leading-none">{currentReaction?.emoji}</span>
            </span>
          )}
          {!reaction && <span className="text-base leading-none">❤️🔥</span>}
          <span>{formatCount(likeCount)} menyukai ini</span>
        </span>
        <span>{formatCount(post.comments)} komentar · {formatCount(post.shares)} dibagikan</span>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Actions */}
      <div className="flex items-center px-1 py-1">

        {/* Suka with Reaction Picker */}
        <div
          ref={pickerRef}
          className="relative flex flex-1"
          onMouseEnter={startShowPicker}
          onMouseLeave={startHidePicker}
        >
          {/* Reaction Picker Bubble */}
          <div
            onMouseEnter={cancelHide}
            onMouseLeave={startHidePicker}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 transition-all duration-200 ${
              pickerVisible
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {/* Tooltip label */}
            <div className={`text-center mb-1 text-xs font-semibold text-gray-600 h-4 transition-opacity ${hoverLabel ? "opacity-100" : "opacity-0"}`}>
              {hoverLabel}
            </div>

            {/* Emoji row */}
            <div className="flex items-center gap-1 bg-white rounded-full shadow-xl border border-gray-100 px-3 py-2">
              {REACTIONS.map((r, i) => (
                <button
                  key={r.key}
                  onClick={() => handleReactionClick(r.key)}
                  onMouseEnter={() => setHoverLabel(r.label)}
                  onMouseLeave={() => setHoverLabel(null)}
                  style={{ animationDelay: `${i * 30}ms` }}
                  className={`text-2xl leading-none transition-all duration-150 hover:scale-150 active:scale-125 rounded-full p-0.5 ${
                    reaction === r.key ? "scale-125 drop-shadow-md" : ""
                  }`}
                  title={r.label}
                >
                  {r.emoji}
                </button>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex justify-center mt-1">
              <div className="w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45 -mt-2 shadow-sm" />
            </div>
          </div>

          {/* Suka Button */}
          <button
            onClick={handleSukaClick}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all text-sm font-medium hover:bg-gray-50 ${
              reaction ? currentReaction?.color : "text-gray-500"
            }`}
          >
            <span className={`text-base leading-none transition-transform ${reaction ? "scale-110" : ""}`}>
              {reaction ? currentReaction?.emoji : "👍"}
            </span>
            <span>{reaction ? currentReaction?.label : "Suka"}</span>
          </button>
        </div>

        <button
          onClick={onComment}
          className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
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
