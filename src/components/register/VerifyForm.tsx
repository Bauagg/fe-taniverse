"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { IconArrowLeft } from "@/assets/icons";

interface Props {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export default function VerifyForm({ email, onVerify, onBack }: Props) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    digits.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
        >
          <IconArrowLeft size={16} />
          Back
        </button>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Check your email</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="text-gray-700 font-semibold">{email}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex gap-2.5 mb-6" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`flex-1 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all ${
                digit
                  ? "border-primary bg-green-50 text-primary"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-sm text-gray-400 mb-8">
          Didn&apos;t receive a code?{" "}
          {seconds > 0 ? (
            <span className="text-gray-600 font-medium">
              Resend in 00:{seconds.toString().padStart(2, "0")}
            </span>
          ) : (
            <button
              onClick={() => setSeconds(59)}
              className="text-primary font-semibold hover:underline"
            >
              Resend Code
            </button>
          )}
        </p>

        <button
          onClick={onVerify}
          disabled={!isComplete}
          className={`w-full rounded-xl py-3.5 font-semibold text-sm transition-all ${
            isComplete
              ? "bg-primary text-white hover:bg-green-700 active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Verify Account
        </button>

      </div>
    </div>
  );
}
