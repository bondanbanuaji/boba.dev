'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.contact-text', {
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
            <div className="pointer-events-auto max-w-2xl">
                <h1 className='text-6xl md:text-8xl font-bold mb-8 contact-text'>Get in Touch</h1>
                <p className='text-xl opacity-80 mb-12 contact-text'>
                    Ready to start your next project? Let's build something amazing together.
                </p>
                <div className='contact-text'>
                    <a href="mailto:hello@boba.dev" className='text-4xl md:text-5xl font-bold underline decoration-white/30 hover:decoration-white transition-all'>
                        hello@boba.dev
                    </a>
                </div>
            </div>
        </div>
    );
}
