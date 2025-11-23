'use client';

import Hero from '@/components/home/Hero';
import Projects from '@/components/home/Projects';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Projects />
      <About />
      <Services />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  );
}
