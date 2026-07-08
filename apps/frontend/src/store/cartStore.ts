import { create } from 'zustand';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [],
  
  addItem: (item: CartItem) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...state.items, item];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },
  
  removeItem: (productId: string, size: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (i) => !(i.productId === productId && i.size === size)
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },
  
  updateQuantity: (productId: string, size: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, quantity }
          : i
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      return { items: newItems };
    });
  },
  
  clearCart: () => {
    set({ items: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => 
      total + item.product.price * item.quantity, 0
    );
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
