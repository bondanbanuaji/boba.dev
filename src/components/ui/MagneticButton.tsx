'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticButton({ children, className = '', strength = 0.5 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power3.out',
                overwrite: true
            });
        };

        const onMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'elastic.out(1, 0.3)',
                overwrite: true
            });
        };

        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);

        return () => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
