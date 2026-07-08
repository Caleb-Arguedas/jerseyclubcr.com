export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  team?: string;
  league?: string;
  country?: string;
  player?: string;
  type: 'fan' | 'player' | 'retro';
  sizes: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'efectivo' | 'sinpe' | 'transferencia';
  status: 'pending' | 'completed' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
