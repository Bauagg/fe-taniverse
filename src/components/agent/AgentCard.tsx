import Link from "next/link";
import type { AgentProduct } from "@/types/agent";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";
import { IconMapPin } from "@/assets/icons";

interface Props {
  product: AgentProduct;
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function AgentCard({ product }: Props) {
  return (
    <Link href={`/agent/${product.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">

        {/* Product Image */}
        <div className="relative overflow-hidden">
          <ProductImage className="w-full aspect-square" emoji="🧅" />
          <span className="absolute top-2 left-2 bg-white/90 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Product name */}
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Quantity */}
          <p className="text-xs text-gray-400 mb-2">
            {product.quantity} {product.unit}
          </p>

          {/* Price */}
          <p className="text-base font-bold text-primary mb-2">
            {formatPrice(product.price)}
          </p>

          {/* Seller + location */}
          <div className="flex items-center gap-1 text-xs text-gray-400 border-t border-gray-50 pt-2">
            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-primary">
                {product.seller.name.charAt(0)}
              </span>
            </div>
            <span className="truncate flex-1 text-gray-500">{product.seller.name}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="flex items-center gap-0.5 text-xs text-gray-400">
              <IconMapPin size={11} />
              {product.seller.location}
            </span>
            <StarRating rating={product.seller.rating} size={11} />
          </div>
        </div>

      </div>
    </Link>
  );
}
