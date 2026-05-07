import type { EcomPost, EcomComment } from "@/types/ecommerce";

export const mockPosts: EcomPost[] = [
  {
    id: "1",
    user: { id: "u1", name: "Gisella Hutami", username: "gisella_hutami", initials: "GH", colorClass: "bg-purple-100 text-purple-600" },
    content: "Sudah 1 bulan pakai sprayer ini dan hasilnya luar biasa! Tanaman padi makin sehat, hama berkurang drastis. Sangat direkomendasikan untuk para petani modern yang ingin hasil panen optimal.",
    productLabel: "DEU SPRAYER",
    postedAt: "1 jam lalu",
    likes: 1100,
    comments: 103,
    shares: 26,
  },
  {
    id: "2",
    user: { id: "u2", name: "Anastasya Khot", username: "anastasya_khot", initials: "AK", colorClass: "bg-pink-100 text-pink-600" },
    content: "Pupuk organik ini benar-benar membantu tanaman saya tumbuh lebih cepat dan subur. Sudah 2 minggu pemakaian dan perkembangannya signifikan. Worth every penny!",
    productLabel: "SA-5L",
    postedAt: "2 hari lalu",
    likes: 845,
    comments: 52,
    shares: 18,
  },
  {
    id: "3",
    user: { id: "u3", name: "Mariska Julia", username: "mariska_julia", initials: "MJ", colorClass: "bg-green-100 text-green-600" },
    content: "Alat semprot ini ringan banget, bisa dipakai seharian tanpa capek. Cocok untuk lahan yang luas. Kualitas bagus dan harga terjangkau. Rekomendasikan buat semua petani!",
    productLabel: "DEU SPRAYER",
    postedAt: "2 jam lalu",
    likes: 623,
    comments: 34,
    shares: 12,
  },
  {
    id: "4",
    user: { id: "u4", name: "Chernya Riska", username: "chernya_riska", initials: "CR", colorClass: "bg-blue-100 text-blue-600" },
    content: "Produk pestisida ini ampuh banget! Hama di sawah saya berkurang drastis setelah 1 minggu pemakaian. Formulanya tidak merusak tanaman dan ramah lingkungan.",
    productLabel: "SA-5L",
    postedAt: "4 jam lalu",
    likes: 432,
    comments: 28,
    shares: 9,
  },
  {
    id: "5",
    user: { id: "u5", name: "Budi Santoso", username: "budi_petani", initials: "BS", colorClass: "bg-orange-100 text-orange-600" },
    content: "Benih unggul ini hasilnya memuaskan. Tumbuh seragam dan ketahanan terhadap penyakit sangat baik. Panen kali ini meningkat 30% dibanding sebelumnya.",
    productLabel: "Benih Super",
    postedAt: "5 jam lalu",
    likes: 310,
    comments: 19,
    shares: 7,
  },
  {
    id: "6",
    user: { id: "u6", name: "Sari Dewi", username: "sari_tani", initials: "SD", colorClass: "bg-teal-100 text-teal-600" },
    content: "Pupuk urea ini kualitasnya bagus dan harganya bersaing. Tanaman jagung saya tumbuh subur dan daun lebih hijau. Stok selalu ada, pengiriman cepat.",
    productLabel: "Urea 50kg",
    postedAt: "1 hari lalu",
    likes: 278,
    comments: 15,
    shares: 5,
  },
];

export const mockComments: Record<string, EcomComment[]> = {
  "1": [
    {
      id: "c1",
      user: { id: "u3", name: "Mariska Julia", username: "mariska_julia", initials: "MJ", colorClass: "bg-green-100 text-green-600" },
      content: "Saya juga pakai yang sama sejak 2 bulan lalu! Hasilnya memang beda dari sprayer biasa, lebih hemat pestisida juga.",
      postedAt: "1 jam lalu",
      likes: 24,
      replies: [
        {
          id: "c1r1",
          user: { id: "u1", name: "Gisella Hutami", username: "gisella_hutami", initials: "GH", colorClass: "bg-purple-100 text-purple-600" },
          content: "Iya bener! Apalagi kalau dipakai pagi hari sebelum matahari terik 🌱",
          postedAt: "45 menit lalu",
          likes: 8,
        },
      ],
    },
    {
      id: "c2",
      user: { id: "u4", name: "Chernya Riska", username: "chernya_riska", initials: "CR", colorClass: "bg-blue-100 text-blue-600" },
      content: "Beli di mana kak? Harganya berapa? Mau coba juga untuk sawah saya yang baru.",
      postedAt: "2 jam lalu",
      likes: 12,
      replies: [],
    },
    {
      id: "c3",
      user: { id: "u5", name: "Budi Santoso", username: "budi_petani", initials: "BS", colorClass: "bg-orange-100 text-orange-600" },
      content: "Sudah 3 minggu pakai, memang terbukti efektif. Sprayer ini awet dan mudah dibersihkan setelah pemakaian.",
      postedAt: "3 jam lalu",
      likes: 31,
      replies: [
        {
          id: "c3r1",
          user: { id: "u6", name: "Sari Dewi", username: "sari_tani", initials: "SD", colorClass: "bg-teal-100 text-teal-600" },
          content: "Betul, perawatannya mudah ya. Saya rutin cuci setelah dipakai biar nozzle-nya tetap bersih.",
          postedAt: "2 jam lalu",
          likes: 5,
        },
      ],
    },
    {
      id: "c4",
      user: { id: "u2", name: "Anastasya Khot", username: "anastasya_khot", initials: "AK", colorClass: "bg-pink-100 text-pink-600" },
      content: "Kapasitas 5 liter cukup untuk lahan berapa hektar kak? Penasaran mau beli juga.",
      postedAt: "4 jam lalu",
      likes: 7,
      replies: [],
    },
  ],
  "2": [
    {
      id: "c5",
      user: { id: "u5", name: "Budi Santoso", username: "budi_petani", initials: "BS", colorClass: "bg-orange-100 text-orange-600" },
      content: "SA-5L memang bagus, saya sudah langganan dari tahun lalu. Formulanya organik dan aman untuk ekosistem sawah.",
      postedAt: "1 hari lalu",
      likes: 19,
      replies: [],
    },
    {
      id: "c6",
      user: { id: "u3", name: "Mariska Julia", username: "mariska_julia", initials: "MJ", colorClass: "bg-green-100 text-green-600" },
      content: "Bisa dicampur dengan pupuk lain tidak? Mau coba kombinasi buat tanaman cabai.",
      postedAt: "1 hari lalu",
      likes: 4,
      replies: [
        {
          id: "c6r1",
          user: { id: "u2", name: "Anastasya Khot", username: "anastasya_khot", initials: "AK", colorClass: "bg-pink-100 text-pink-600" },
          content: "Bisa! Saya sudah coba campur dengan NPK, hasilnya malah lebih bagus 👍",
          postedAt: "20 jam lalu",
          likes: 11,
        },
      ],
    },
  ],
};

export const trendingProducts = [
  { name: "DEU Sprayer 5L", price: "Rp 185.000", tag: "Alat Tani" },
  { name: "SA-5L Pestisida", price: "Rp 45.000", tag: "Pestisida" },
  { name: "Urea 50kg", price: "Rp 230.000", tag: "Pupuk" },
  { name: "Benih Padi Super", price: "Rp 75.000", tag: "Benih" },
];

export const suggestedUsers = [
  { name: "Pak Hendra Wijaya", username: "hendra_tani", initials: "HW", colorClass: "bg-indigo-100 text-indigo-600" },
  { name: "Ibu Ratna Sari", username: "ratna_petani", initials: "RS", colorClass: "bg-rose-100 text-rose-600" },
  { name: "Agus Kurniawan", username: "agus_sawah", initials: "AK", colorClass: "bg-amber-100 text-amber-600" },
];
