'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-text', { y: 100, opacity: 0 });
      gsap.to('.hero-text', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 2.5, // Wait for preloader
      });

      gsap.utils.toArray<HTMLElement>('.scroll-section').forEach((section) => {
        const headings = section.querySelectorAll('h2');
        gsap.set(headings, { y: 50, opacity: 0 });

        gsap.to(headings, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
          y: 0,
          opacity: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='min-h-screen pt-32 px-6'>
      <section className='h-[80vh] flex flex-col justify-center items-start'>
        <h1 className='hero-text text-6xl md:text-9xl font-bold tracking-tighter'>
          CREATIVE <br /> DEVELOPER
        </h1>
        <p className='hero-text mt-8 text-xl max-w-md opacity-70'>
          Crafting immersive digital experiences with code and design.
        </p>
      </section>

      <section className='scroll-section h-screen flex items-center justify-center'>
        <h2 className='text-4xl'>Scroll to see smooth effect</h2>
      </section>

      <section className='scroll-section h-screen flex items-center justify-center'>
        <h2 className='text-4xl'>More content...</h2>
      </section>
    </div>
  );
}
