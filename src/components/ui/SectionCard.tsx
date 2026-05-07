interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 pt-4 pb-2">
        {title}
      </p>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}
