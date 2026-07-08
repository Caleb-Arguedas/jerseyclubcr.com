'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  icon: string;
  href: string;
  image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  href,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href}>
        <div className="relative h-64 rounded-lg overflow-hidden shadow-premium hover:shadow-glow transition-all cursor-pointer group">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark/30 to-dark/50 z-10" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-light">
            <span className="text-5xl mb-4">{icon}</span>
            <h3 className="font-heading font-bold text-2xl text-center">{title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
