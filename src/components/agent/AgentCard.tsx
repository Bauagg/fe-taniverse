import Link from "next/link";
import { MapPin, Bookmark } from "lucide-react";
import type { AgentProduct } from "@/types/agent";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";

interface Props {
  product: AgentProduct;
  badge?: "baru" | "hot";
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function AgentCard({ product, badge }: Props) {
  return (
    <Link href={`/agent/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <ProductImage name={product.name} className="w-full h-full" />

          {badge === "hot" && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              🔥 HOT
            </span>
          )}
          {badge === "baru" && (
            <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ✨ BARU
            </span>
          )}

          <span className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {product.category}
          </span>

          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          >
            <Bookmark size={13} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1.5 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] text-gray-400">
              Stok {product.quantity} {product.unit}
            </p>
            <StarRating rating={product.seller.rating} size={10} />
          </div>

          <p className="text-base font-bold text-primary mb-2.5">
            {formatPrice(product.price)}
          </p>

          <div className="border-t border-gray-50 pt-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-primary">
                  {product.seller.name.charAt(0)}
                </span>
              </div>
              <span className="text-[11px] text-gray-600 truncate font-medium">{product.seller.name}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={10} className="shrink-0" />
              <span className="text-[11px] truncate">{product.seller.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
