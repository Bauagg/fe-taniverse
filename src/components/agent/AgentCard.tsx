import Link from "next/link";
import { MapPin, Heart, ShoppingCart, Flame, BadgePlus } from "lucide-react";
import type { AgentProduct } from "@/types/agent";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";
import bawangImg from "@/assets/image/bawang.jpg";

interface Props {
  product: AgentProduct;
  badge?: "baru" | "hot";
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function AgentCard({ product, badge }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden">
        <Link href={`/agent/${product.id}`}>
          <div className="aspect-[4/3] w-full overflow-hidden">
            <ProductImage src={bawangImg} name={product.name} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
          </div>
        </Link>

        {badge === "hot" && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Flame size={11} className="fill-white" /> HOT
          </span>
        )}
        {badge === "baru" && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <BadgePlus size={12} /> BARU
          </span>
        )}

        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-md"
        >
          <Heart size={15} />
        </button>

        <span className="absolute bottom-3 left-3 bg-white/90 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/agent/${product.id}`}>
          <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">Stok {product.quantity} {product.unit}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <StarRating rating={product.seller.rating} size={11} />
        </div>

        <p className="text-lg font-extrabold text-primary mb-3">
          {formatPrice(product.price)}
        </p>

        <div className="flex items-center gap-2 mb-4 mt-auto">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">{product.seller.name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">{product.seller.name}</p>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={10} className="shrink-0" />
              <span className="text-[11px] truncate">{product.seller.location}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/agent/${product.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-primary text-primary text-sm font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
        >
          <ShoppingCart size={15} />
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
