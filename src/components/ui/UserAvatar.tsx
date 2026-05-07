interface Props {
  initials: string;
  size?: number;
  colorClass?: string;
}

export default function UserAvatar({
  initials,
  size = 40,
  colorClass = "bg-gray-100 text-gray-600",
}: Props) {
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 select-none ${colorClass}`}
    >
      {initials}
    </div>
  );
}
