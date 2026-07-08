'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';

export default function Home() {
  const categories = [
    { title: 'Nacional', icon: '⚽', href: '/productos?categoria=nacional', image: '/images/nacional.jpg' },
    { title: 'Mundial 2026', icon: '🌎', href: '/productos?categoria=mundial', image: '/images/mundial.jpg' },
    { title: 'Player', icon: '👕', href: '/productos?tipo=player', image: '/images/player.jpg' },
    { title: 'Fan', icon: '👕', href: '/productos?tipo=fan', image: '/images/fan.jpg' },
    { title: 'Retro', icon: '🕰️', href: '/productos?tipo=retro', image: '/images/retro.jpg' },
    { title: 'Mujer', icon: '♀️', href: '/productos?genero=mujer', image: '/images/mujer.jpg' },
    { title: 'Niño', icon: '🧒', href: '/productos?genero=nino', image: '/images/nino.jpg' },
    { title: 'Abrigos', icon: '🧥', href: '/productos?categoria=abrigos', image: '/images/abrigos.jpg' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/50 z-10" />
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/images/hero-bg.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <img src="/images/hero-bg.jpg" alt="hero" className="w-full h-full object-cover" />
          </video>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center text-light px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <motion.div
                className="w-24 h-24 bg-gold rounded-full flex items-center justify-center animate-pulse-glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-dark font-bold text-4xl">JC</span>
              </motion.div>
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-6xl md:text-7xl mb-6 leading-tight">
              La pasión por el fútbol comienza aquí
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-gray">
              Camisetas de fútbol auténticas de las mejores ligas del mundo
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/productos">
                  <button className="bg-gold text-dark px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-light transition-colors flex items-center gap-2 justify-center">
                    <ShoppingCart size={24} />
                    Ver Catálogo
                  </button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://wa.me/50687654321"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-whatsapp text-light px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-green-600 transition-colors flex items-center gap-2 justify-center">
                    <MessageCircle size={24} />
                    Comprar por WhatsApp
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-center text-dark mb-16">
              Explora Nuestras Categorías
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-center text-light mb-16">
            ¿Por qué elegirnos?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: 'Autenticidad Garantizada',
                description: 'Todas nuestras camisetas son 100% auténticas y oficiales',
              },
              {
                icon: '⚡',
                title: 'Envío Rápido',
                description: 'Entrega en 2-3 días hábiles a todo el país',
              },
              {
                icon: '💳',
                title: 'Múltiples Pagos',
                description: 'Efectivo, SINPE, Transferencia - ¡Elige la que prefieras!',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-light"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
