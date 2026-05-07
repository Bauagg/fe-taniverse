import type { User, ProfileField } from "@/types/profile";

export const mockUser: User = {
  name: "Mambaus Baus",
  email: "baus@gmail.com",
  initials: "MB",
};

export const profileFields: ProfileField[] = [
  { label: "Nama Lengkap", value: "Mambaus Baus" },
  { label: "Email", value: "ba***us@gmail.com" },
  { label: "No. HP", value: "*******0" },
  { label: "Jenis Kelamin", value: "Male" },
  { label: "Tanggal Lahir", value: "Belum ditentukan" },
  { label: "Akun Media Sosial", value: "" },
];
