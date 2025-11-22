'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const tl = gsap.timeline();

            tl.to(textRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: 'power2.inOut',
            })
                .to(containerRef.current, {
                    y: '-100%',
                    duration: 1,
                    ease: 'power4.inOut',
                });
        }
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className='fixed top-0 left-0 w-full h-screen bg-black z-[9999] flex items-center justify-center text-white'
        >
            <div ref={textRef} className='text-9xl font-bold tracking-tighter'>
                {progress}%
            </div>
        </div>
    );
}
