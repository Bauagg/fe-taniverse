import Image, { StaticImageData } from "next/image";

const PALETTES = [
  { from: "from-green-700", to: "to-green-950", emoji: "🌾" },
  { from: "from-red-700", to: "to-red-950", emoji: "🌶️" },
  { from: "from-orange-600", to: "to-orange-900", emoji: "🧅" },
  { from: "from-yellow-600", to: "to-yellow-900", emoji: "🌽" },
  { from: "from-teal-700", to: "to-teal-950", emoji: "🥬" },
  { from: "from-purple-700", to: "to-purple-950", emoji: "🍆" },
  { from: "from-blue-700", to: "to-blue-950", emoji: "💧" },
  { from: "from-lime-700", to: "to-lime-950", emoji: "🌿" },
];

function pickPalette(name?: string) {
  if (!name) return PALETTES[0];
  const index = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % PALETTES.length;
  return PALETTES[index];
}

interface Props {
  src?: StaticImageData | string;
  name?: string;
  emoji?: string;
  className?: string;
}

export default function ProductImage({ src, name, emoji, className = "" }: Props) {
  if (src) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={name ?? "product"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  const palette = pickPalette(name);
  const icon = emoji ?? palette.emoji;

  return (
    <div className={`w-full h-full bg-linear-to-br ${palette.from} ${palette.to} flex items-center justify-center ${className}`}>
      <span className="text-5xl opacity-70 select-none">{icon}</span>
    </div>
  );
}
