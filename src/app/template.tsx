'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(containerRef.current, { opacity: 0, y: 20 });
            gsap.to(containerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <div ref={containerRef} className="min-h-screen">
            {children}
        </div>
    );
}
