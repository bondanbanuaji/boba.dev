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
        // Only enable Lenis on desktop (width > 768px)
        const isDesktop = window.innerWidth > 768;
        
        if (!isDesktop) {
            // For mobile, just use native scroll
            ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
            // Ensure no lenis class on html
            document.documentElement.classList.remove('lenis');
            return;
        }

        // Add lenis class to html for desktop
        document.documentElement.classList.add('lenis');

        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.7,
            touchMultiplier: 1.5,
            infinite: false,
        });

        requestAnimationFrame(() => {
            setLenis(lenisInstance);
            // Expose Lenis to window for other components
            (window as any).lenis = lenisInstance;
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisInstance.destroy();
            (window as any).lenis = null;
            document.documentElement.classList.remove('lenis');
            gsap.ticker.remove((time) => {
                lenisInstance.raf(time * 1000);
            });
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
