import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Jersey Club CR - Tienda de Camisetas de Fútbol',
  description: 'La tienda online más prestigiosa de camisetas de fútbol en Costa Rica',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
