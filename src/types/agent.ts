export interface Seller {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export interface AgentProduct {
  id: string;
  seller: Seller;
  name: string;
  quantity: number;
  unit: string;
  description: string;
  price: number;
  postedAt: string;
  category: string;
}

export interface OfferForm {
  startDate: string;
  endDate: string;
  location: string;
  quantity: number;
  unit: string;
  notes: string;
}
