'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { View } from '@react-three/drei';
import TextPressure from '@/components/ui/TextPressure';
import Parallax from '@/components/ui/Parallax';
import Cat3D from '@/components/canvas/Cat3D';
import '@/lib/i18n';

export default function Hero() {
    const { t } = useTranslation('hero');
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
            .from('.hero-title-container', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.scroll-indicator', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6');

        const marqueeTl = gsap.timeline();

        marqueeTl.to('.hero-title-wrapper', {
            xPercent: -50,
            ease: 'none',
            duration: 15,
            repeat: -1,
        });

    }, { scope: containerRef });

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 pt-16 sm:pt-20 md:pt-28 lg:pt-36 overflow-x-clip"
        >
            <div className="relative z-10 w-full flex flex-col items-center">
                <Parallax speed={-0.1} className="mb-6 lg:mb-10">
                    <h1 className="hero-subtitle text-sm md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase text-white/70 mb-4">
                        {isMounted ? t('subtitle') : 'PORTFOLIO | FULL-STACK WEB DEVELOPER'}
                    </h1>
                </Parallax>

                <div
                    className="hero-title-container w-full mb-0 mask-linear-fade overflow-x-clip"
                >
                    <div className="hero-title-wrapper flex whitespace-nowrap w-max">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px] xl:h-[1000px] w-[100vw] flex-shrink-0 mx-4 md:mx-8"
                                style={{ touchAction: 'pan-y' }}
                            >
                                <TextPressure
                                    text="BONDAN BANUAJI"
                                    flex={true}
                                    alpha={false}
                                    stroke={false}
                                    width={true}
                                    weight={true}
                                    italic={true}
                                    textColor="#ffffff"
                                    strokeColor="#ff0000"
                                    minFontSize={100}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <View
                    className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative z-20 -mt-10 sm:-mt-16 md:-mt-20 lg:-mt-32 mb-2 pointer-events-auto"
                    style={{ touchAction: 'pan-y' }}
                >
                    <Cat3D />
                </View>

                <div className="scroll-indicator mt-2 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 opacity-50 pointer-events-none">
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-widest">
                        <span className="lg:hidden">
                            {isMounted ? t('scroll.mobile') : 'Tap and swipe down'}
                        </span>

                        <span className="hidden lg:inline">
                            {isMounted ? t('scroll.desktop') : 'Scroll Mouse'}
                        </span>
                    </span>
                    <br />
                    <div className="relative w-[1px] h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28" style={{ overflow: 'hidden' }}>
                        <div className="absolute inset-0 bg-white animate-scrollY"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
