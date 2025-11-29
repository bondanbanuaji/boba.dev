'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ProfileCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;
        
        if (!card || !image) return;

        // Subtle 3D Tilt effect on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.6,
                ease: 'power2.out',
                transformPerspective: 1200
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="profile-card relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]" style={{ perspective: '1500px' }}>
            <div 
                ref={cardRef}
                className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-300 group"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Main Image */}
                <img
                    ref={imageRef}
                    src="https://avatars.githubusercontent.com/bondanbanuaji"
                    alt="Bondan Banuaji"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Subtle Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Minimal Corner Accents */}
                <div className="absolute top-3 left-3 w-10 h-10 md:w-12 md:h-12 border-l border-t border-white/20 pointer-events-none transition-all duration-300 group-hover:border-white/40" />
                <div className="absolute bottom-3 right-3 w-10 h-10 md:w-12 md:h-12 border-r border-b border-white/20 pointer-events-none transition-all duration-300 group-hover:border-white/40" />

                {/* Subtle Border Highlight */}
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
            </div>
        </div>
    );
}
