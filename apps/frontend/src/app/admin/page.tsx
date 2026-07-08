'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminAPI } from '@/lib/api';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Productos', value: stats.totalProducts, color: 'bg-blue-100' },
    { label: 'Órdenes Totales', value: stats.totalOrders, color: 'bg-green-100' },
    { label: 'Ingresos', value: `₡${stats.totalRevenue.toLocaleString()}`, color: 'bg-gold/20' },
    { label: 'Órdenes Pendientes', value: stats.pendingOrders, color: 'bg-yellow-100' },
  ];

  return (
    <div className="min-h-screen bg-gray">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-heading font-bold text-4xl text-dark mb-12">Dashboard Administrativo</h1>

        {loading ? (
          <div className="text-center py-12">Cargando estadísticas...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-lg p-6 shadow-premium`}
                >
                  <p className="text-dark/60 text-sm font-semibold mb-2">{stat.label}</p>
                  <p className="font-heading font-bold text-3xl text-dark">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-premium p-8 mb-8">
              <h2 className="font-heading font-bold text-2xl text-dark mb-6">Acciones Rápidas</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/admin/productos">
                  <button className="w-full bg-dark text-light py-3 rounded-lg font-bold hover:bg-gold hover:text-dark transition-colors">
                    Gestionar Productos
                  </button>
                </Link>
                <Link href="/admin/ordenes">
                  <button className="w-full bg-dark text-light py-3 rounded-lg font-bold hover:bg-gold hover:text-dark transition-colors">
                    Ver Órdenes
                  </button>
                </Link>
                <Link href="/admin/usuarios">
                  <button className="w-full bg-dark text-light py-3 rounded-lg font-bold hover:bg-gold hover:text-dark transition-colors">
                    Gestionar Usuarios
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
