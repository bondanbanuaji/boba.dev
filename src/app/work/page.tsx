'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.work-text', {
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
                <h1 className='text-6xl md:text-8xl font-bold mb-8 work-text'>Selected Work</h1>
                <p className='text-xl md:text-2xl max-w-2xl opacity-80 mb-12 work-text'>
                    A showcase of our digital craftsmanship.
                </p>
                {/* Work items would go here, potentially interacting with the 3D carousel */}
            </div>
        </div>
    );
}
