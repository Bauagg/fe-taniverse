import BackButton from "./BackButton";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <BackButton />
      <div>
        {subtitle && (
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{subtitle}</p>
        )}
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
    </div>
  );
}
