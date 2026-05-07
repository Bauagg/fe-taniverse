export interface EcomUser {
  id: string;
  name: string;
  username: string;
  initials: string;
  colorClass: string;
}

export interface EcomPost {
  id: string;
  user: EcomUser;
  content: string;
  productLabel?: string;
  postedAt: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface EcomComment {
  id: string;
  user: EcomUser;
  content: string;
  postedAt: string;
  likes: number;
  replies?: EcomComment[];
}
