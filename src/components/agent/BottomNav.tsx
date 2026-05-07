"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconShoppingBag, IconAgent, IconProfile } from "@/assets/icons";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "E-Commerce", href: "/e-commerce", icon: IconShoppingBag },
  { label: "Agent", href: "/agent", icon: IconAgent },
  { label: "Profile", href: "/profile", icon: IconProfile },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="max-w-md mx-auto flex">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={22} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
