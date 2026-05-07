interface Props {
  className?: string;
  emoji?: string;
}

const BG_COLORS = [
  "from-red-800 to-red-950",
  "from-green-700 to-green-950",
  "from-orange-600 to-orange-900",
  "from-yellow-600 to-amber-900",
];

export default function ProductImage({ className = "", emoji = "🧅" }: Props) {
  return (
    <div className={`bg-gradient-to-br ${BG_COLORS[0]} flex items-center justify-center ${className}`}>
      <span className="text-3xl opacity-80 select-none">{emoji}</span>
    </div>
  );
}
