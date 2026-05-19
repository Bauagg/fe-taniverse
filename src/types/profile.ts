export interface User {
  name: string;
  email: string;
  initials: string;
  posts?: number;
  followers?: number;
  following?: number;
}

export interface ProfileField {
  label: string;
  value: string;
}
