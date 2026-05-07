"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AgentProduct, OfferForm } from "@/types/agent";
import { IconCalendar, IconMapPin, IconChevronDown, IconCheck } from "@/assets/icons";
import DatePickerModal from "@/components/agent/DatePickerModal";

interface Props {
  product: AgentProduct;
  hideSummary?: boolean;
}

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

export default function ConfirmationForm({ product, hideSummary = false }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<OfferForm>({
    startDate: "",
    endDate: "",
    location: "",
    quantity: 0,
    unit: "kg",
    notes: "",
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeField, setActiveField] = useState<"start" | "end">("start");
  const [submitted, setSubmitted] = useState(false);

  const openPicker = (field: "start" | "end") => {
    setActiveField(field);
    setPickerOpen(true);
  };

  const handleDateSelect = (date: string) => {
    setForm((f) => ({ ...f, [activeField === "start" ? "startDate" : "endDate"]: date }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg">
          <IconCheck size={36} color="white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Penawaranmu berhasil diajukan.</h2>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          Kamu bisa cek statusnya kapan saja di menu penawaran
        </p>
        <button
          onClick={() => router.push("/agent")}
          className="w-full bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 transition-colors"
        >
          Kembali ke Agent
        </button>
      </div>
    );
  }

  return (
    <>
      {!hideSummary && (
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Produk yang diajukan</p>
          <p className="font-bold text-gray-800">{product.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{product.seller.name} · {product.seller.location}</p>
        </div>
      )}

      <div className="space-y-5">
        {/* Tanggal Penjemputan */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Tanggal Penjemputan <span className="text-error">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["start", "end"] as const).map((field) => {
              const value = field === "start" ? form.startDate : form.endDate;
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => openPicker(field)}
                  className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2.5 hover:border-primary transition-colors text-left"
                >
                  <span className={`text-sm truncate ${value ? "text-gray-800" : "text-gray-400"}`}>
                    {value ? formatDateDisplay(value) : (field === "start" ? "Tanggal Awal" : "Tanggal Akhir")}
                  </span>
                  <span className="text-gray-400 flex-shrink-0 ml-1">
                    <IconCalendar size={16} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lokasi Penjemputan */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Lokasi Penjemputan <span className="text-error">*</span>
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-primary transition-colors">
            <input
              type="text"
              placeholder="Pilih lokasi penjemputan"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="flex-1 text-sm outline-none placeholder:text-gray-400"
            />
            <span className="text-gray-400 flex-shrink-0 ml-2">
              <IconMapPin size={16} />
            </span>
          </div>
        </div>

        {/* Jumlah Kebutuhan */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Jumlah Kebutuhan</label>
          <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary transition-colors">
            <div className="flex items-center gap-1 px-3 py-2.5 border-r border-gray-200 bg-gray-50">
              <select
                value={form.unit}
                onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                className="text-sm font-medium text-gray-700 bg-transparent outline-none appearance-none pr-1"
              >
                <option>kg</option>
                <option>Ton</option>
                <option>Kwintal</option>
              </select>
              <IconChevronDown size={12} />
            </div>
            <input
              type="number"
              min={0}
              placeholder="0"
              value={form.quantity || ""}
              onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))}
              className="flex-1 px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Catatan</label>
          <textarea
            placeholder="Masukkan catatan disini..."
            rows={4}
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
        >
          Konfirmasi Penawaran
        </button>
      </div>

      <DatePickerModal
        isOpen={pickerOpen}
        selected={activeField === "start" ? form.startDate : form.endDate}
        onSelect={handleDateSelect}
        onClose={() => setPickerOpen(false)}
      />
    </>
  );
}
