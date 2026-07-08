export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  team?: string;
  league?: string;
  country?: string;
  player?: string;
  type: 'fan' | 'player' | 'retro';
  sizes: string[];
  stock: number;
  images: string[];
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  team?: string;
  league?: string;
  country?: string;
  player?: string;
  type?: 'fan' | 'player' | 'retro';
  sizes?: string[];
  stock?: number;
  images?: string[];
}

export interface CreateOrderDTO {
  items: Array<{
    productId: string;
    size: string;
    quantity: number;
  }>;
  paymentMethod: 'efectivo' | 'sinpe' | 'transferencia';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
