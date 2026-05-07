"use client";

import { useState } from "react";
import ScanView from "@/components/ai/ScanView";
import ResultsView from "@/components/ai/ResultsView";

type Step = "scan" | "results";

export default function AiPage() {
  const [step, setStep] = useState<Step>("scan");

  if (step === "results") {
    return <ResultsView onScanAgain={() => setStep("scan")} />;
  }

  return <ScanView onViewResults={() => setStep("results")} />;
}
