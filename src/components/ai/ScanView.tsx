"use client";

import { useState, useRef, useEffect } from "react";
import { IconCheck } from "@/assets/icons";
import IconCamera from "@/assets/icons/IconCamera";

type ScanStep = "idle" | "live" | "scanning" | "success";

interface Props {
  onViewResults: () => void;
}

export default function ScanView({ onViewResults }: Props) {
  const [step, setStep] = useState<ScanStep>("idle");
  const [captured, setCaptured] = useState<string | null>(null);
  const [camError, setCamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStep("live");
    } catch {
      setCamError("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan di browser.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCaptured(dataUrl);
    stopCamera();
    setStep("scanning");
    setTimeout(() => setStep("success"), 2500);
  };

  const handleCancel = () => {
    stopCamera();
    setStep("idle");
  };

  const handleReset = () => {
    setCaptured(null);
    setCamError(null);
    setStep("idle");
  };

  useEffect(() => () => stopCamera(), []);

  const showBrackets = step === "idle" || step === "live";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="text-primary">AI</span> Plant Scanner
          </h1>
          <p className="text-sm text-gray-400">
            Arahkan kamera ke tanaman untuk mendeteksi hama dan penyakit secara otomatis
          </p>
        </div>

        {/* Viewfinder */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl mb-4 bg-black">

          {/* Live video stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${step === "live" ? "block" : "hidden"}`}
          />

          {/* Captured photo */}
          {captured && step !== "live" && (
            <img src={captured} alt="captured" className="w-full h-full object-cover" />
          )}

          {/* Idle placeholder */}
          {step === "idle" && !captured && (
            <div className="w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 flex flex-col items-center justify-center gap-3">
              <span className="text-white/30"><IconCamera size={56} /></span>
              <p className="text-white/50 text-sm">Kamera belum aktif</p>
            </div>
          )}

          {/* Scanning animation */}
          {step === "scanning" && (
            <>
              <div className="absolute inset-0 bg-primary/10" />
              <div
                className="scan-line-anim absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ boxShadow: "0 0 8px 2px #169953" }}
              />
            </>
          )}

          {/* Success overlay */}
          {step === "success" && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                <IconCheck size={40} color="white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl">Scan Successful!</p>
                <p className="text-white/70 text-sm mt-1">Tanaman berhasil diidentifikasi</p>
              </div>
            </div>
          )}

          {/* Corner brackets */}
          {showBrackets && (
            <>
              <div className="absolute top-4 left-4 w-10 h-10 border-t-[3px] border-l-[3px] border-white/80 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-[3px] border-r-[3px] border-white/80 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-[3px] border-l-[3px] border-white/80 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-[3px] border-r-[3px] border-white/80 rounded-br-lg" />
            </>
          )}
        </div>

        {/* Camera error */}
        {camError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {camError}
          </div>
        )}

        {/* Status text */}
        <p className="text-center text-sm mb-6 min-h-5">
          {step === "idle" && <span className="text-gray-400">Tekan &quot;Buka Kamera&quot; untuk memulai</span>}
          {step === "live" && <span className="text-gray-500">Arahkan ke tanaman, lalu tekan &quot;Ambil Foto&quot;</span>}
          {step === "scanning" && <span className="text-gray-500 animate-pulse">Menganalisis gambar tanaman...</span>}
          {step === "success" && <span className="text-primary font-medium">Deteksi selesai — hama berhasil teridentifikasi</span>}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {step === "idle" && (
            <>
              <button
                onClick={() => {}}
                className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3.5 font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={startCamera}
                className="flex-1 bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
              >
                Buka Kamera
              </button>
            </>
          )}

          {step === "live" && (
            <>
              <button
                onClick={handleCancel}
                className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3.5 font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="flex-1 bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
              >
                Ambil Foto
              </button>
            </>
          )}

          {step === "scanning" && (
            <div className="w-full bg-gray-100 text-gray-400 rounded-xl py-3.5 text-center text-sm font-semibold cursor-not-allowed select-none">
              Memproses...
            </div>
          )}

          {step === "success" && (
            <>
              <button
                onClick={handleReset}
                className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3.5 font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Scan Ulang
              </button>
              <button
                onClick={onViewResults}
                className="flex-1 bg-primary text-white rounded-xl py-3.5 font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
              >
                Lihat Hasil
              </button>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
