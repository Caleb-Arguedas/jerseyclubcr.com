'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Jersey Club CR</h3>
            <p className="text-gray text-sm">
              La tienda online más prestigiosa de camisetas de fútbol en Costa Rica.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/productos" className="hover:text-gold transition-colors">Productos</Link></li>
              <li><Link href="/guia-tallas" className="hover:text-gold transition-colors">Guía de Tallas</Link></li>
              <li><Link href="/envios" className="hover:text-gold transition-colors">Envíos</Link></li>
              <li><Link href="/pagos" className="hover:text-gold transition-colors">Métodos de Pago</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contacto" className="hover:text-gold transition-colors">Contacto</Link></li>
              <li><Link href="/politica-privacidad" className="hover:text-gold transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-gold transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/jersey.clubcr?igsh=MW56enRvOGFvbmhtag%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/50687654321"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-whatsapp transition-colors"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray/20 pt-8">
          <p className="text-center text-sm text-gray">
            © {currentYear} Jersey Club CR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
