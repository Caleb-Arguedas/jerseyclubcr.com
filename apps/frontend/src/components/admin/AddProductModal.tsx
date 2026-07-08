'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { adminAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    team: '',
    league: '',
    country: '',
    player: '',
    type: 'fan' as const,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 0,
    images: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminAPI.createProduct(formData);
      toast.success('Producto creado correctamente');
      onSuccess();
      onClose();
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        team: '',
        league: '',
        country: '',
        player: '',
        type: 'fan',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 0,
        images: [''],
      });
    } catch (error) {
      toast.error('Error al crear producto');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-dark text-light p-6 flex justify-between items-center">
          <h2 className="font-heading font-bold text-2xl">Agregar Producto</h2>
          <button onClick={onClose} className="hover:text-gold transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Categoría</option>
              <option value="nacional">Nacional</option>
              <option value="mundial">Mundial 2026</option>
              <option value="abrigos">Abrigos</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows={3}
          />

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="fan">Fan</option>
              <option value="player">Player</option>
              <option value="retro">Retro</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="team"
              placeholder="Equipo"
              value={formData.team}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="league"
              placeholder="Liga"
              value={formData.league}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="player"
              placeholder="Jugador"
              value={formData.player}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">URLs de Imágenes (separadas por comas)</label>
            <textarea
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              defaultValue={formData.images.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                images: e.target.value.split(',').map(url => url.trim()),
              }))}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gold text-dark py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Crear Producto'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray text-dark py-2 rounded-lg font-bold hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
