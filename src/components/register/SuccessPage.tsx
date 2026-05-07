import Link from "next/link";
import { IconCheck } from "@/assets/icons";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">

        {/* Check icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <IconCheck size={44} color="white" />
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 scale-125" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 scale-150" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3 mt-4">
          Account Created!
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          Your account has been successfully created. You can now start exploring all features on Taniverse.
        </p>

        <Link
          href="/agent"
          className="block w-full bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all mb-3"
        >
          Start Exploring
        </Link>

        <Link
          href="/login"
          className="block w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}
