import Link from "next/link";
import { IconChevronRight } from "@/assets/icons";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
  onClick?: () => void;
  valueClassName?: string;
}

export default function SettingsRow({ icon, label, value, href, onClick, valueClassName }: Props) {
  const inner = (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
      {icon && (
        <span className="text-gray-400 flex-shrink-0 group-hover:text-primary transition-colors">
          {icon}
        </span>
      )}
      <span className="flex-1 text-sm text-gray-700">{label}</span>
      {value && (
        <span className={`text-sm text-gray-400 mr-1 ${valueClassName ?? ""}`}>{value}</span>
      )}
      <span className="text-gray-300 flex-shrink-0">
        <IconChevronRight size={16} />
      </span>
    </div>
  );

  if (href) return <Link href={href} className="block">{inner}</Link>;
  return <button type="button" onClick={onClick} className="w-full text-left">{inner}</button>;
}
