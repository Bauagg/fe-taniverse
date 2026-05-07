"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import { IconFile, IconChevronDown } from "@/assets/icons";
import type { FormData, FormErrors } from "@/types/register";

interface Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: () => void;
}

function inputClass(hasError?: string, hasValue?: boolean) {
  const base = "w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400";
  if (hasError) return `${base} border-error focus:border-error`;
  if (hasValue) return `${base} border-primary focus:border-primary`;
  return `${base} border-gray-200 focus:border-primary`;
}

export default function RegisterForm({ formData, errors, onChange, onSubmit }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange({ ktpPhoto: file });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange({ ktpPhoto: file });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight mb-2">
            <span className="text-primary">Create</span>{" "}
            <span className="text-gray-800">Account</span>
          </h1>
          <p className="text-sm text-gray-400">
            Fill in your details to get started with Taniverse
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className={inputClass(errors.name, !!formData.name)}
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className={inputClass(errors.email, !!formData.email)}
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
            <div className={`flex border rounded-xl overflow-hidden transition-all ${
              errors.phone
                ? "border-error"
                : formData.phone
                ? "border-primary"
                : "border-gray-200 focus-within:border-primary"
            }`}>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-base">🇮🇩</span>
                <span className="text-sm font-medium text-gray-700">+62</span>
                <IconChevronDown size={12} />
              </button>
              <input
                type="tel"
                placeholder="812xxxxxxxx"
                value={formData.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            {errors.phone && <p className="text-error text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* KTP Photo */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              KTP / ID Card{" "}
              <span className="text-gray-400 font-normal">(Max 2MB)</span>
            </label>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-xl px-6 py-5 cursor-pointer transition-all flex items-center gap-4 ${
                isDragging
                  ? "border-primary bg-green-50"
                  : errors.ktpPhoto
                  ? "border-error bg-red-50"
                  : formData.ktpPhoto
                  ? "border-primary bg-green-50"
                  : "border-gray-200 hover:border-primary/50 bg-gray-50/50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                formData.ktpPhoto ? "bg-primary/10" : "bg-gray-100"
              }`}>
                <IconFile size={20} />
              </div>
              <div>
                <p className={`text-sm font-medium ${formData.ktpPhoto ? "text-primary" : "text-gray-500"}`}>
                  {formData.ktpPhoto ? formData.ktpPhoto.name : "Click or drag to upload KTP photo"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, or PDF supported</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {errors.ktpPhoto && (
              <p className="text-error text-xs mt-1">*{errors.ktpPhoto}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={onSubmit}
            className="w-full bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
