import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Scene from '@/components/canvas/Scene';
import Navbar from '@/components/dom/Navbar';
import Footer from '@/components/dom/Footer';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '<Boba.dev />',
  description: 'Immersive <Boba.dev /> Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          <Preloader />
          <Navbar />
          <Scene />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
