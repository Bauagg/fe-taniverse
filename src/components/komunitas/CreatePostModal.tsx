"use client";

import { useRef, useState } from "react";
import { X, ImagePlus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { mockUser } from "@/lib/profile-mock";

interface Props {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: Props) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setImages((prev) => {
      const next = [...prev, ...urls];
      setPreviewIndex(next.length - 1);
      return next;
    });
  }

  function removeImage(idx: number) {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      setPreviewIndex(Math.min(previewIndex, next.length - 1));
      return next;
    });
  }

  const canPost = text.trim().length > 0 || images.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ProfileAvatar initials={mockUser.initials} />
            <div>
              <p className="font-semibold text-sm text-gray-800 leading-tight">{mockUser.name}</p>
              <p className="text-xs text-gray-400">Posting ke Komunitas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Text area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bagikan pengalaman pertanian Anda..."
          rows={4}
          className="flex-1 resize-none px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none leading-relaxed"
        />

        {/* Image preview */}
        {images.length > 0 && (
          <div className="px-5 pb-3">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[previewIndex]}
                alt="preview"
                className="w-full h-full object-cover"
              />

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setPreviewIndex((i) => Math.max(0, i - 1))}
                    disabled={previewIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPreviewIndex((i) => Math.min(images.length - 1, i + 1))}
                    disabled={previewIndex === images.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Counter */}
              {images.length > 1 && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                  {previewIndex + 1} / {images.length}
                </span>
              )}

              {/* Delete current */}
              <button
                onClick={() => removeImage(previewIndex)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500/80 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      i === previewIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}

                {/* Add more thumbnail */}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="shrink-0 w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
                >
                  <ImagePlus size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ImagePlus size={18} className="text-primary" />
            <span>Foto</span>
            {images.length > 0 && (
              <span className="text-xs bg-primary/10 text-primary font-semibold px-1.5 py-0.5 rounded-full">
                {images.length}
              </span>
            )}
          </button>

          <button
            disabled={!canPost}
            className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full disabled:opacity-40 hover:bg-green-600 transition-all shadow-sm shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
          >
            Posting
          </button>
        </div>
      </div>
    </div>
  );
}
