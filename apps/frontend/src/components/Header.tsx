'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Productos', href: '/productos' },
    { label: 'Guía de Tallas', href: '/guia-tallas' },
    { label: 'Envíos', href: '/envios' },
    { label: 'Pagos', href: '/pagos' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-premium">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <span className="text-dark font-bold text-lg">JC</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">Jersey Club CR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-gold transition-colors font-body text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray rounded-lg px-3 py-2">
              <Search size={18} className="text-dark" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent ml-2 text-sm outline-none w-32 text-dark"
              />
            </div>

            {/* Cart */}
            <Link href="/carrito" className="relative">
              <ShoppingCart size={24} className="text-dark hover:text-gold transition-colors" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-gold transition-colors py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
