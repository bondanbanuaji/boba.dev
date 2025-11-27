'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import Parallax from '@/components/ui/Parallax';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';
import '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
    const { t } = useTranslation('work');
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Title Animation
        const titleChars = gsap.utils.toArray<HTMLElement>('.work-title-char');
        gsap.fromTo(titleChars,
            { opacity: 0, y: 50, rotationX: -90 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                stagger: 0.02,
                duration: 0.8,
                ease: 'back.out(1.5)',
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[85vw] mx-auto relative z-10">
                {/* Page Title */}
                <div className="text-center mb-16 md:mb-24">
                    <Parallax speed={-0.03}>
                        <div className="mb-6">
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
                                {isMounted ? t('section.subtitle') : 'Portfolio'}
                            </span>
                        </div>
                        <h1 className="work-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none mb-8">
                            {(isMounted ? t('section.title') : 'My Work').split('').map((char, i) => (
                                <span key={i} className="work-title-char inline-block">
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-70 max-w-3xl mx-auto font-light">
                            {isMounted ? t('section.description') : 'Explore my featured projects showcasing creative development and technical excellence.'}
                        </p>
                    </Parallax>
                </div>

                {/* Coming Soon / Link to Homepage Projects */}
                <div className="text-center py-20">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="text-6xl mb-6">{isMounted ? t('comingSoon.icon') : '🚧'}</div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {isMounted ? t('comingSoon.title') : 'Full Portfolio Coming Soon'}
                        </h2>
                        <p className="text-lg opacity-70 mb-8">
                            {isMounted ? t('comingSoon.description') : 'In the meantime, check out my featured projects on the homepage or visit my GitHub to see all my work.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <MagneticButton strength={0.3}>
                                <Link
                                    href="/#work"
                                    className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                >
                                    {isMounted ? t('comingSoon.buttons.viewProjects') : 'View Projects'}
                                </Link>
                            </MagneticButton>
                            <MagneticButton strength={0.3}>
                                <a
                                    href="https://github.com/bondanbanuaji"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-8 py-4 border border-white/30 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                                >
                                    {isMounted ? t('comingSoon.buttons.github') : 'GitHub'}
                                </a>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
