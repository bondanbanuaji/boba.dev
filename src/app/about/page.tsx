'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from '@/components/ui/SplitText';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.about-text', {
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
                <h1 className='text-6xl md:text-8xl font-bold mb-8 about-text'>About Us</h1>
                <div className='about-text'>
                    <p className='text-xl md:text-2xl max-w-2xl opacity-80 leading-relaxed'>
                        We are a collective of digital artisans, crafting experiences that transcend the ordinary.
                        Our journey began in the digital void, shaping pixels into emotions.
                    </p>
                </div>
                <div className='mt-16 h-[50vh] flex items-center justify-center about-text'>
                    {/* Content interacts with 3D background */}
                </div>
            </div>
        </div>
    );
}
