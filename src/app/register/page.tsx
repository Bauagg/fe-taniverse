"use client";

import { useState } from "react";
import RegisterForm from "@/components/register/RegisterForm";
import VerifyForm from "@/components/register/VerifyForm";
import SuccessPage from "@/components/register/SuccessPage";
import type { FormData, FormErrors } from "@/types/register";

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    ktpPhoto: null,
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.ktpPhoto) {
      newErrors.ktpPhoto = "Identity card must be included in this column";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    const cleared = { ...errors };
    (Object.keys(data) as (keyof FormData)[]).forEach((key) => delete cleared[key]);
    setErrors(cleared);
  };

  const handleSubmit = () => {
    if (validate()) setStep(2);
  };

  if (step === 3) return <SuccessPage />;
  if (step === 2) return <VerifyForm email={formData.email} onVerify={() => setStep(3)} onBack={() => setStep(1)} />;
  return <RegisterForm formData={formData} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />;
}
