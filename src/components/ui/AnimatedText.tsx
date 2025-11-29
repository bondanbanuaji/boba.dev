'use client';

import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedTextProps {
    text: string;
    className?: string;
    mode?: 'typewriter' | 'fade-in' | 'slide-up';
    duration?: number;
    delay?: number;
    onComplete?: () => void;
    trigger?: boolean;
}

export default function AnimatedText({
    text,
    className = '',
    mode = 'typewriter',
    duration = 2000,
    delay = 0,
    onComplete,
    trigger = true,
}: AnimatedTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const containerRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!trigger) return;

        if (prefersReducedMotion) {
            // Show text immediately if reduced motion is preferred
            setDisplayedText(text);
            onComplete?.();
            return;
        }

        if (mode === 'typewriter') {
            // Typewriter effect - character by character
            let currentIndex = 0;
            const chars = text.split('');
            const charDelay = duration / chars.length;

            const timeoutId = setTimeout(() => {
                const intervalId = setInterval(() => {
                    if (currentIndex < chars.length) {
                        setDisplayedText(chars.slice(0, currentIndex + 1).join(''));
                        currentIndex++;
                    } else {
                        clearInterval(intervalId);
                        onComplete?.();
                    }
                }, charDelay);

                return () => clearInterval(intervalId);
            }, delay);

            return () => clearTimeout(timeoutId);
        } else if (mode === 'fade-in' || mode === 'slide-up') {
            // Set full text immediately for fade-in and slide-up modes
            setDisplayedText(text);

            if (!containerRef.current) return;

            // Split into characters wrapped in spans
            const chars = text.split('');
            containerRef.current.innerHTML = chars
                .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');

            const spans = containerRef.current.querySelectorAll('span');

            setTimeout(() => {
                anime({
                    targets: Array.from(spans),
                    opacity: mode === 'fade-in' ? [0, 1] : 1,
                    translateY: mode === 'slide-up' ? [20, 0] : 0,
                    duration: duration / 2,
                    delay: anime.stagger(duration / (chars.length * 2)),
                    easing: 'easeOutQuad',
                    complete: () => {
                        onComplete?.();
                    },
                });
            }, delay);
        }
    }, [text, mode, duration, delay, trigger, prefersReducedMotion, onComplete]);

    if (mode === 'typewriter') {
        return <span ref={containerRef} className={className}>{displayedText}</span>;
    }

    return <span ref={containerRef} className={className} />;
}
