'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import '@/lib/i18n';
import { setLanguageManually } from '@/lib/i18n';

type Language = 'en' | 'id';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const enRef = useRef<HTMLSpanElement>(null);
    const idRef = useRef<HTMLSpanElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use i18n.language directly, no separate state needed
    const currentLang = (mounted ? i18n.language : 'en') as Language;

    useGSAP(() => {
        if (!mounted || !containerRef.current || !indicatorRef.current || !enRef.current || !idRef.current) return;

        const target = currentLang === 'en' ? enRef.current : idRef.current;

        // Get positions relative to the container
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const left = targetRect.left - containerRect.left;
        const width = targetRect.width;

        // Animate indicator
        gsap.to(indicatorRef.current, {
            left: left,
            width: width,
            duration: 0.5,
            ease: 'elastic.out(1, 1)',
            overwrite: true
        });

    }, [currentLang, mounted]);

    const handleLanguageChange = async (lang: Language) => {
        if (lang === currentLang || isChanging) return;

        setIsChanging(true);

        // Use manual language change to mark user preference
        await setLanguageManually(lang);

        setTimeout(() => setIsChanging(false), 300);
    };

    return (
        <div ref={containerRef} className="relative flex items-center gap-2 text-white">
            {/* Sliding Indicator */}
            <span
                ref={indicatorRef}
                className="absolute top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-cyan-400 to-purple-400 pointer-events-none rounded-full"
                style={{ left: 0, width: 0 }} // Initial state
            />

            {/* EN Button */}
            <button
                onClick={() => handleLanguageChange('en')}
                className={`
                    relative group px-1
                    text-sm uppercase tracking-widest
                    transition-opacity duration-300
                    ${currentLang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-70'}
                    ${isChanging ? 'pointer-events-none' : ''}
                `}
                aria-label="Switch to English"
            >
                <span ref={enRef} className="relative inline-block py-1">
                    EN
                </span>
            </button>

            {/* Separator */}
            <span className="text-white/30 text-xs">/</span>

            {/* IN Button */}
            <button
                onClick={() => handleLanguageChange('id')}
                className={`
                    relative group px-1
                    text-sm uppercase tracking-widest
                    transition-opacity duration-300
                    ${currentLang === 'id' ? 'opacity-100' : 'opacity-50 hover:opacity-70'}
                    ${isChanging ? 'pointer-events-none' : ''}
                `}
                aria-label="Switch to Indonesian"
            >
                <span ref={idRef} className="relative inline-block py-1">
                    IN
                </span>
            </button>
        </div>
    );
}
