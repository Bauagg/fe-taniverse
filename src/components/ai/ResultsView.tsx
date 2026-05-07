"use client";

import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import ProductImage from "@/components/ui/ProductImage";
import { mockDetectionResult } from "@/lib/ai-mock";

interface Props {
  onScanAgain: () => void;
}

export default function ResultsView({ onScanAgain }: Props) {
  const result = mockDetectionResult;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <PageHeader title={result.name} subtitle="Hasil Deteksi AI" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Image + meta */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm">
              <ProductImage name={result.name} />
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {result.confidence}% Terdeteksi
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Nama Ilmiah</p>
              <p className="text-sm font-semibold text-gray-700 italic">{result.scientificName}</p>
            </div>

            <button
              onClick={onScanAgain}
              className="w-full border border-primary text-primary rounded-xl py-3 font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              Scan Ulang
            </button>
          </div>

          {/* Details */}
          <div className="lg:col-span-3 space-y-5">

            <SectionCard title="Penjelasan">
              <p className="px-5 py-4 text-sm text-gray-600 leading-relaxed">{result.description}</p>
            </SectionCard>

            <SectionCard title={`Jenis — Jenis ${result.name}`}>
              <ol className="px-5 py-4 space-y-4">
                {result.types.map((type, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{type.name}</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{type.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard title={`Gejala Serangan ${result.name}`}>
              <ul className="px-5 py-4 space-y-3">
                {result.symptoms.map((symptom, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}
