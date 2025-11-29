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
        let lenisInstance: Lenis | null = null;
        let rafId: number | null = null;

        const initLenis = () => {
            const isDesktop = window.innerWidth > 768;

            // Destroy existing instance if switching from desktop to mobile
            if (lenisInstance) {
                lenisInstance.destroy();
                lenisInstance = null;
                (window as any).lenis = null;
                (window as any).scrollVelocity = 0;
                if (rafId !== null) {
                    gsap.ticker.remove((time) => {
                        lenisInstance?.raf(time * 1000);
                    });
                    rafId = null;
                }
            }

            if (!isDesktop) {
                // For mobile, just use native scroll
                ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
                document.documentElement.classList.remove('lenis');
                document.body.style.overflow = '';
                setLenis(null);
                return;
            }

            // Desktop: Add lenis class and initialize
            document.documentElement.classList.add('lenis');

            lenisInstance = new Lenis({
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
        };

        // Initial setup
        initLenis();

        // Handle resize and orientation change
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initLenis();
                ScrollTrigger.refresh();
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            
            if (lenisInstance) {
                lenisInstance.destroy();
                (window as any).lenis = null;
                (window as any).scrollVelocity = 0;
                document.documentElement.classList.remove('lenis');
                gsap.ticker.remove((time) => {
                    lenisInstance?.raf(time * 1000);
                });
            }
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
