"use client";

import { useState, useEffect, useRef } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { IconClose, IconHeart, IconSend } from "@/assets/icons";
import { mockComments } from "@/lib/ecommerce-mock";
import { mockUser } from "@/lib/profile-mock";
import type { EcomPost, EcomComment } from "@/types/ecommerce";

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function CommentItem({ comment, depth = 0 }: { comment: EcomComment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(false);

  const toggleLike = () => {
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    setLiked((v) => !v);
  };

  return (
    <div className={depth > 0 ? "ml-11 mt-2.5" : ""}>
      <div className="flex gap-2.5">
        <UserAvatar
          initials={comment.user.initials}
          colorClass={comment.user.colorClass}
          size={depth > 0 ? 30 : 36}
        />
        <div className="flex-1 min-w-0">
          {/* Bubble */}
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 inline-block max-w-full">
            <p className="text-xs font-semibold text-gray-800">{comment.user.name}</p>
            <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{comment.content}</p>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-1.5 ml-1">
            <span className="text-xs text-gray-400">{comment.postedAt}</span>
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
              }`}
            >
              <IconHeart size={12} filled={liked} />
              {likeCount > 0 && formatCount(likeCount)}
            </button>
            {depth === 0 && (
              <button className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors">
                Balas
              </button>
            )}
          </div>

          {/* Toggle replies */}
          {depth === 0 && !!comment.replies?.length && (
            <button
              onClick={() => setShowReplies((v) => !v)}
              className="flex items-center gap-1.5 mt-2 ml-1 text-xs font-semibold text-primary hover:underline"
            >
              {showReplies
                ? "Sembunyikan balasan"
                : `Lihat ${comment.replies.length} balasan`}
            </button>
          )}

          {showReplies &&
            comment.replies?.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={1} />
            ))}
        </div>
      </div>
    </div>
  );
}

interface Props {
  post: EcomPost | null;
  onClose: () => void;
}

export default function CommentsPanel({ post, onClose }: Props) {
  const isOpen = !!post;
  const comments = post ? (mockComments[post.id] ?? []) : [];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {post && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 shrink-0">
              <UserAvatar
                initials={post.user.initials}
                colorClass={post.user.colorClass}
                size={38}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{post.user.name}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {post.content.length > 55 ? `${post.content.slice(0, 55)}...` : post.content}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <IconClose size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 px-5 py-2.5 border-b border-gray-50 shrink-0">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>❤️</span> {formatCount(post.likes)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>💬</span> {formatCount(post.comments)} komentar
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>↗</span> {formatCount(post.shares)}
              </span>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-2">
                  <span className="text-4xl">💬</span>
                  <p className="text-sm font-medium text-gray-500">Belum ada komentar</p>
                  <p className="text-xs text-gray-400">Jadilah yang pertama berkomentar!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3 shrink-0 bg-white">
              <ProfileAvatar initials={mockUser.initials} />
              <div className="flex-1 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tulis komentar..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                />
                <button className="text-primary hover:text-green-700 transition-colors shrink-0">
                  <IconSend size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
