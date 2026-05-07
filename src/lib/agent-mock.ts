import type { AgentProduct } from "@/types/agent";

export const AGENT_PRODUCTS: AgentProduct[] = [
  {
    id: "1",
    seller: { id: "s1", name: "PT Taniverse Tbk", location: "Jakarta", rating: 4.5 },
    name: "Bawang Merah Super",
    quantity: 10,
    unit: "Ton",
    description:
      "Bawang merah super adalah bawang berkualitas tinggi yang dipilih secara selektif berdasarkan ukuran, kebersihan, dan kematangan. Setiap biji dipilih dari hasil panen terbaik di sentra produksi Brebes.",
    price: 25000000,
    postedAt: "1 hari yang lalu",
    category: "Umbi-umbian",
  },
  {
    id: "2",
    seller: { id: "s1", name: "PT Taniverse Tbk", location: "Jakarta", rating: 4.5 },
    name: "Bawang Merah Super",
    quantity: 10,
    unit: "Ton",
    description:
      "Bawang merah super adalah bawang berkualitas tinggi yang dipilih secara selektif berdasarkan ukuran, kebersihan, dan kematangan.",
    price: 25000000,
    postedAt: "1 hari yang lalu",
    category: "Umbi-umbian",
  },
  {
    id: "3",
    seller: { id: "s2", name: "CV Berkah Tani", location: "Surabaya", rating: 4.2 },
    name: "Cabai Merah Keriting",
    quantity: 5,
    unit: "Ton",
    description:
      "Cabai merah keriting segar langsung dari petani, diproses dengan standar kebersihan tinggi dan siap kirim ke seluruh Indonesia.",
    price: 35000000,
    postedAt: "2 hari yang lalu",
    category: "Sayuran",
  },
  {
    id: "4",
    seller: { id: "s3", name: "UD Sumber Makmur", location: "Bandung", rating: 4.8 },
    name: "Kentang Granola",
    quantity: 8,
    unit: "Ton",
    description:
      "Kentang Granola kualitas ekspor dari dataran tinggi Dieng, ukuran seragam dan bebas hama.",
    price: 18000000,
    postedAt: "3 hari yang lalu",
    category: "Umbi-umbian",
  },
];

export function getProductById(id: string): AgentProduct | undefined {
  return AGENT_PRODUCTS.find((p) => p.id === id);
}
