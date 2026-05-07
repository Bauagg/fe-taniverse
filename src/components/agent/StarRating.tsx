import { IconStar } from "@/components/icons";

interface Props {
  rating: number;
  size?: number;
}

export default function StarRating({ rating, size = 14 }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} filled={i <= Math.round(rating)} size={size} />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}
