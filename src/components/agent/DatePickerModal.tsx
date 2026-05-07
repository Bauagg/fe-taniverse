"use client";

import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/assets/icons";

interface Props {
  isOpen: boolean;
  selected: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getMondayOffset(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function DatePickerModal({ isOpen, selected, onSelect, onClose }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [temp, setTemp] = useState(selected);

  if (!isOpen) return null;

  const offset = getMondayOffset(year, month);
  const days = getDaysInMonth(year, month);
  const cells = Array(offset).fill(null).concat(Array.from({ length: days }, (_, i) => i + 1));
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const prevMonth = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const nextMonth = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-800">Pilih Tanggal Penjemputan</h3>
          <p className="text-xs text-gray-400 mt-0.5">Pilih rentang tanggal (maks. 7 hari)</p>
        </div>

        {/* Month Nav */}
        <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl px-3 py-2">
          <button
            onClick={prevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-500"
          >
            <IconChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-gray-700">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-500"
          >
            <IconChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-xs font-semibold text-gray-400 py-1.5">{d}</div>
          ))}
        </div>

        {/* Day grid */}
        <div className="space-y-1">
          {rows.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7">
              {row.map((day, ci) => {
                if (!day) return <div key={ci} />;
                const dateStr = toDateStr(year, month, day);
                const isSelected = temp === dateStr;
                const isToday = dateStr === toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
                return (
                  <button
                    key={ci}
                    onClick={() => setTemp(dateStr)}
                    className={`aspect-square flex items-center justify-center text-sm rounded-full mx-auto w-9 font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-white font-bold shadow-sm"
                        : isToday
                        ? "border-2 border-primary text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-5 pt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => { onSelect(temp); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
}
