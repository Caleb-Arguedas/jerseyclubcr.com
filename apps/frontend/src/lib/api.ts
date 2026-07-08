import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  search: (query: string) => api.get(`/products/search?q=${query}`),
  getByTeam: (team: string) => api.get(`/products/team/${team}`),
  getByCategory: (category: string) => api.get(`/products/category/${category}`),
};

export const orderAPI = {
  create: (data: any) => api.post('/orders', data),
  getById: (id: string) => api.get(`/orders/${id}`),
  getUserOrders: () => api.get('/orders/my-orders'),
};

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
  logout: () => api.post('/auth/logout'),
};

export const adminAPI = {
  createProduct: (data: any) => api.post('/admin/products', data),
  updateProduct: (id: string, data: any) =>
    api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  getStats: () => api.get('/admin/stats'),
  getOrders: () => api.get('/admin/orders'),
};
