"use client";

import { useRouter } from "next/navigation";
import IconArrowLeft from "@/assets/icons/IconArrowLeft";

interface Props {
  size?: number;
  className?: string;
}

export default function BackButton({ size = 20, className = "" }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors ${className}`}
    >
      <IconArrowLeft size={size} />
    </button>
  );
}
