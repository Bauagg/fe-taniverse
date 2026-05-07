import type { DetectionResult } from "@/types/ai";

export const mockDetectionResult: DetectionResult = {
  name: "Wereng",
  scientificName: "Nilaparvata lugens",
  confidence: 92,
  description:
    "Wereng adalah serangga hama utama yang menyerang tanaman padi dan dapat menyebabkan kerusakan serius. Wereng menyerang dengan cara menghisap cairan sel tumbuhan padi, menyebabkan tanaman menjadi kuning, kerdil, dan akhirnya mati.",
  types: [
    {
      name: "Wereng Coklat (Nilaparvata lugens)",
      description:
        "Hama yang paling berbahaya dan sering menyebabkan gagal panen pada tanaman padi. Selain menghisap secara langsung, wereng coklat juga dapat menjadi vektor penyebaran virus kerdil hampa dan kerdil rumput.",
    },
    {
      name: "Wereng Hijau (Nephotettix spp.)",
      description:
        "Menyebabkan kerusakan dengan cara menghisap cairan tanaman dan juga sebagai vektor penyakit tungro yang sangat berbahaya. Menyebabkan batang tanaman menjadi lemah dan mudah rebah.",
    },
    {
      name: "Wereng Punggung Putih (Sogatella furcifera)",
      description:
        "Mengisap cairan tanaman padi, menyebabkan daun menguning, batang mengering, dan tanaman menjadi mati secara perlahan.",
    },
  ],
  symptoms: [
    "Daun padi menguning dan mengering dimulai dari tepi daun",
    "Batang tanaman mudah rebah seperti terbakar atau terpotong",
    "Tanaman menjadi kerdil dan tidak berkembang normal",
    "Terdapat embun madu yang menyebabkan tumbuhnya jamur jelaga di permukaan daun",
  ],
};
