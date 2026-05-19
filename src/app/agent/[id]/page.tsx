"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/agent-mock";
import { IconMapPin } from "@/assets/icons";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";
import bawangImg from "@/assets/image/bawang.jpg";

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function AgentDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
        Produk tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/agent" className="hover:text-primary transition-colors">
          Agent
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — Image */}
        <div className="space-y-3">
          <ProductImage src={bawangImg} name={product.name} className="w-full aspect-square rounded-2xl overflow-hidden" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <ProductImage
                key={i}
                src={bawangImg}
                name={product.name}
                className="w-full aspect-square rounded-xl overflow-hidden opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Right — Detail */}
        <div>
          {/* Category + name */}
          <span className="inline-block bg-green-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.seller.rating} size={16} />
            <span className="text-sm text-gray-400">{product.postedAt}</span>
          </div>

          {/* Price */}
          <div className="bg-green-50 rounded-2xl px-5 py-4 mb-5">
            <p className="text-xs text-gray-400 mb-1">Harga Penawaran</p>
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm text-gray-500">Stok tersedia:</span>
            <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-1 rounded-lg">
              {product.quantity} {product.unit}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Deskripsi Produk</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-6 border border-gray-100">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-primary">
                {product.seller.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{product.seller.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <IconMapPin size={11} />
                <span>{product.seller.location}</span>
              </div>
            </div>
            <Link
              href="#"
              className="text-xs text-primary font-semibold hover:underline flex-shrink-0"
            >
              Lihat Toko
            </Link>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/agent/${product.id}/confirm`)}
              className="flex-1 bg-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
            >
              Ajukan Penawaran
            </button>
            <button className="px-4 py-3.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium">
              Simpan
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
