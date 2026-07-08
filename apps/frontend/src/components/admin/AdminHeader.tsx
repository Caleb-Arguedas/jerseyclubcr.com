'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-dark text-light shadow-premium">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <span className="text-dark font-bold text-lg">JC</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">Jersey Club Admin</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6">
            <Link href="/admin" className="hover:text-gold transition-colors">Dashboard</Link>
            <Link href="/admin/productos" className="hover:text-gold transition-colors">Productos</Link>
            <Link href="/admin/ordenes" className="hover:text-gold transition-colors">Órdenes</Link>
            <Link href="/admin/usuarios" className="hover:text-gold transition-colors">Usuarios</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span>{user?.email}</span>
              <button
                onClick={handleLogout}
                className="hover:text-gold transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-2">
            <Link href="/admin" className="hover:text-gold py-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link href="/admin/productos" className="hover:text-gold py-2" onClick={() => setIsMenuOpen(false)}>Productos</Link>
            <Link href="/admin/ordenes" className="hover:text-gold py-2" onClick={() => setIsMenuOpen(false)}>Órdenes</Link>
            <button onClick={handleLogout} className="hover:text-gold py-2 text-left">Logout</button>
          </nav>
        )}
      </div>
    </header>
  );
};
