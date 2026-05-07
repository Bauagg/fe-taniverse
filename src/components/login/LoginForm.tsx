"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconXCircle, IconClose } from "@/assets/icons";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!phone.trim()) return;
    // Simulate failed login for UI demo
    setError(true);
  };

  const hasValue = phone.trim().length > 0;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">

        {/* Error Banner */}
        {error && (
          <div className="flex items-center gap-2 bg-white border border-gray-100 shadow-md rounded-xl px-4 py-3 mb-6">
            <span className="flex-shrink-0">
              <IconXCircle />
            </span>
            <p className="flex-1 text-sm text-gray-700">
              Your account is not available.{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
            <button
              onClick={() => setError(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <IconClose />
            </button>
          </div>
        )}

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">
            <span className="text-primary">Welcome</span>
            <br />
            <span className="text-gray-800">Back!</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">Log In with registered phone number!</p>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
          <div
            className={`flex border rounded-xl overflow-hidden transition-all ${
              error
                ? "border-error"
                : hasValue
                ? "border-primary"
                : "border-gray-200 focus-within:border-primary"
            }`}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-base">🇮🇩</span>
              <span className="text-sm font-medium text-gray-700">+62</span>
              <IconChevronDown size={12} />
            </button>
            <input
              type="tel"
              placeholder="Input your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError(false);
              }}
              className="flex-1 px-4 py-3.5 text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all mb-5"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
