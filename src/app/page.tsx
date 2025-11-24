'use client';

import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
