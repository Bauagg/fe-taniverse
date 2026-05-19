"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/agent-mock";
import { IconMapPin } from "@/assets/icons";
import StarRating from "@/components/ui/StarRating";
import ProductImage from "@/components/ui/ProductImage";
import bawangImg from "@/assets/image/bawang.jpg";
import ConfirmationForm from "@/components/agent/ConfirmationForm";

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function ConfirmPage() {
  const { id } = useParams() as { id: string };
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
        <Link href="/agent" className="hover:text-primary transition-colors">Agent</Link>
        <span>/</span>
        <Link href={`/agent/${product.id}`} className="hover:text-primary transition-colors">
          {product.name}
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Konfirmasi Penawaran</span>
      </nav>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Left — Product summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <ProductImage src={bawangImg} name={product.name} className="w-full aspect-video" />
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h2>
              <StarRating rating={product.seller.rating} size={13} />

              <div className="flex items-center gap-2 mt-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {product.seller.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">{product.seller.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-0.5">
                    <IconMapPin size={10} />
                    {product.seller.location}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Stok tersedia</span>
                  <span className="font-semibold text-gray-700">{product.quantity} {product.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Harga</span>
                  <span className="font-bold text-primary text-base">{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Isi Detail Penawaran</h2>
            <ConfirmationForm product={product} hideSummary />
          </div>
        </div>

      </div>
    </div>
  );
}
