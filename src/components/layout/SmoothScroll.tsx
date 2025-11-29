'use client';

import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Always add lenis class
        document.documentElement.classList.add('lenis');

        const lenisInstance = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
        });

        requestAnimationFrame(() => {
            setLenis(lenisInstance);
            (window as any).lenis = lenisInstance;
        });

        lenisInstance.on('scroll', (e: any) => {
            ScrollTrigger.update();
            (window as any).scrollVelocity = e.velocity;
        });

        gsap.ticker.add((time) => {
            lenisInstance?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisInstance.destroy();
            (window as any).lenis = null;
            (window as any).scrollVelocity = 0;
            document.documentElement.classList.remove('lenis');
            gsap.ticker.remove((time) => {
                lenisInstance?.raf(time * 1000);
            });
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
