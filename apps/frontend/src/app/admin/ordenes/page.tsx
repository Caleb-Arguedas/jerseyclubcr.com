'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminAPI } from '@/lib/api';
import { Order } from '@/types';
import { Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminAPI.getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-heading font-bold text-4xl text-dark mb-8">Gestión de Órdenes</h1>

        {loading ? (
          <div className="text-center py-12">Cargando órdenes...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-premium overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark text-light">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Cliente</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Método Pago</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray transition-colors">
                    <td className="px-6 py-3 font-mono text-sm">{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-3">{order.customerInfo?.name || '-'}</td>
                    <td className="px-6 py-3 font-bold">₡{order.total.toLocaleString()}</td>
                    <td className="px-6 py-3">{order.paymentMethod}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-gold hover:text-yellow-400 transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
