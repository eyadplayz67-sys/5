export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: 'gadgets' | 'accessories' | 'grooming' | 'travel';
  petType: 'cats' | 'dogs' | 'both';
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  isBestSeller?: boolean;
  isNew?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'card' | 'meeza' | 'cod';
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingFee: number;
}
