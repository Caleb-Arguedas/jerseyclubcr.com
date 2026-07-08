'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AddProductModal } from '@/components/admin/AddProductModal';
import { productAPI, adminAPI } from '@/lib/api';
import { Product } from '@/types';
import { Edit2, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    try {
      await adminAPI.deleteProduct(id);
      toast.success('Producto eliminado');
      fetchProducts();
    } catch (error) {
      toast.error('Error al eliminar producto');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.team?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading font-bold text-4xl text-dark">Gestión de Productos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gold text-dark px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Agregar Producto
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-dark/20 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12">Cargando productos...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-premium overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark text-light">
                <tr>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Equipo</th>
                  <th className="px-6 py-3 text-left">Precio</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray transition-colors">
                    <td className="px-6 py-3 font-semibold">{product.name}</td>
                    <td className="px-6 py-3">{product.team || '-'}</td>
                    <td className="px-6 py-3">₡{product.price.toLocaleString()}</td>
                    <td className="px-6 py-3">{product.stock}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-gold hover:text-yellow-400 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />
    </div>
  );
}
