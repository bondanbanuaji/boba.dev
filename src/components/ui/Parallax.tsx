'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number; // Negative for reverse direction
    className?: string;
    id?: string;
}

export default function Parallax({ children, speed = 0.5, className, id }: ParallaxProps) {
    const trigger = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!trigger.current || !target.current) return;

        const y = window.innerHeight * speed * 0.5;

        gsap.fromTo(target.current,
            { y: -y },
            {
                y: y,
                ease: 'none',
                scrollTrigger: {
                    trigger: trigger.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0,
                }
            }
        );
    }, { scope: trigger });

    return (
        <div ref={trigger} id={id} className={className}>
            <div ref={target}>
                {children}
            </div>
        </div>
    );
}
