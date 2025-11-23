'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextPressure from '@/components/ui/TextPressure';
import MagneticButton from '@/components/ui/MagneticButton';
import Parallax from '@/components/ui/Parallax';
import Link from 'next/link';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .from('.hero-cta', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.scroll-indicator', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6');

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 pt-20 overflow-hidden">
            <div className="relative z-10 max-w-[90vw] lg:max-w-[80vw] mx-auto w-full flex flex-col items-center">
                <Parallax speed={-0.2} className="mb-6 lg:mb-10 overflow-hidden">
                    <h2 className="hero-subtitle text-sm md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-white/70 mb-4">
                        Creative Technologist
                    </h2>
                </Parallax>

                <div className="mb-8 lg:mb-12 relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
                    <TextPressure
                        text="BOBA.DEV"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#ffffff"
                        strokeColor="#ff0000"
                        minFontSize={36}
                    />
                </div>

                <Parallax speed={0.1} className="hero-subtitle max-w-2xl lg:max-w-4xl mx-auto mb-12 lg:mb-16 px-4">
                    <p className="text-base md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light">
                        I build beautiful, interactive digital experiences that bridge the gap between design and technology.
                        Specializing in Next.js, WebGL, and Creative Development.
                    </p>
                </Parallax>

                <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center w-full px-4">
                    <MagneticButton strength={0.3} className="w-full sm:w-auto">
                        <Link
                            href="#work"
                            className="block w-full sm:w-auto px-8 py-4 lg:px-10 lg:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm md:text-base lg:text-lg"
                        >
                            Explore My Work
                        </Link>
                    </MagneticButton>
                    <MagneticButton strength={0.3} className="w-full sm:w-auto">
                        <Link
                            href="#contact"
                            className="block w-full sm:w-auto px-8 py-4 lg:px-10 lg:py-5 border border-white/30 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-sm md:text-base lg:text-lg"
                        >
                            Let's Talk
                        </Link>
                    </MagneticButton>
                </div>

                <div className="scroll-indicator mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 opacity-50 pointer-events-none">
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-widest">
                        Scroll
                    </span>

                    <div className="relative w-[1px] h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 overflow-hidden">
                        <div className="absolute inset-0 bg-white animate-scrollY"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
