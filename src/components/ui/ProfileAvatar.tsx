interface Props {
  initials: string;
  size?: "md" | "lg";
}

export default function ProfileAvatar({ initials, size = "md" }: Props) {
  const dim = size === "lg" ? "w-24 h-24 text-2xl" : "w-20 h-20 text-xl";
  return (
    <div
      className={`${dim} rounded-full ring-4 ring-white shadow-md bg-linear-to-br from-green-100 to-green-50 flex items-center justify-center font-bold text-primary select-none`}
    >
      {initials}
    </div>
  );
}
