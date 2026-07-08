import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      set({ user: data.user, token: data.token });
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },
  
  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
}));
