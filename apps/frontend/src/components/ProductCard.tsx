'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/productos/${product.id}`}>
        <div className="bg-light rounded-lg overflow-hidden shadow-premium hover:shadow-glow transition-all">
          {/* Image */}
          <div className="relative h-64 bg-gray overflow-hidden group">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Price Badge */}
            {product.price && (
              <div className="absolute top-4 right-4 bg-gold text-dark px-3 py-1 rounded-full font-bold text-sm">
                ₡{product.price.toLocaleString()}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-heading font-bold text-dark mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Info */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {product.team && (
                <span className="text-xs bg-gray text-dark px-2 py-1 rounded">
                  {product.team}
                </span>
              )}
              {product.league && (
                <span className="text-xs bg-gray text-dark px-2 py-1 rounded">
                  {product.league}
                </span>
              )}
            </div>

            {/* Button */}
            <button className="w-full bg-dark text-light py-2 rounded-lg hover:bg-gold hover:text-dark transition-colors font-body font-semibold flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              Ver Detalles
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
