export interface FormData {
  name: string;
  email: string;
  ktpPhoto: File | null;
  phone: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  ktpPhoto?: string;
  phone?: string;
}
