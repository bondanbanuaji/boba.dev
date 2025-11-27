import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Scene from '@/components/canvas/Scene';
import Navbar from '@/components/dom/Navbar';
import Footer from '@/components/dom/Footer';
import IntroSequence from '@/components/ui/IntroSequence';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import LanguageProvider from '@/components/providers/LanguageProvider';
import { generateMetadata, generateStructuredData } from '@/lib/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = generateMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generateStructuredData({ type: 'Person' });
  const websiteSchema = generateStructuredData({ type: 'WebSite' });
  const organizationSchema = generateStructuredData({ type: 'Organization' });
  
  return (
    <html lang='en'>
      <head>
        {/* Hreflang Tags for Multi-language SEO */}
        <link rel="alternate" hrefLang="en" href="https://boba.dev" />
        <link rel="alternate" hrefLang="id" href="https://boba.dev" />
        <link rel="alternate" hrefLang="x-default" href="https://boba.dev" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://boba.dev" />
        
        {/* Enhanced Structured Data - Multiple Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Karawang" />
        <meta name="geo.position" content="-6.321;107.302" />
        <meta name="ICBM" content="-6.321, 107.302" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
          <ServiceWorkerProvider />
          <LanguageProvider />
          <CustomCursor />
          <NoiseOverlay />
          <IntroSequence />
          <Navbar />
          <Scene />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
