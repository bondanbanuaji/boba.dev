'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.service-text', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='min-h-screen pt-32 px-6 relative z-10 pointer-events-none'>
            <div className="pointer-events-auto">
                <h1 className='text-6xl md:text-8xl font-bold mb-8 service-text'>Our Services</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                    {['Creative Development', '3D Experiences', 'Interactive Design'].map((service, index) => (
                        <div key={index} className='service-text p-6 border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/5 transition-colors'>
                            <h3 className='text-2xl font-bold mb-4'>{service}</h3>
                            <p className='opacity-70'>Pushing the boundaries of what's possible on the web.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
