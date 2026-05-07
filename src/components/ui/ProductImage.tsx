interface Props {
  className?: string;
  emoji?: string;
}

export default function ProductImage({ className = "", emoji = "🧅" }: Props) {
  return (
    <div className={`bg-gradient-to-br from-red-800 to-red-950 flex items-center justify-center ${className}`}>
      <span className="text-3xl opacity-80 select-none">{emoji}</span>
    </div>
  );
}
