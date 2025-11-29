'use client';

import { useEffect, useRef, RefObject } from 'react';
import anime from 'animejs';
import { useReducedMotion } from './useReducedMotion';

/**
 * Hook for Anime.js animations with automatic cleanup
 */
export function useAnime(
    config: anime.AnimeParams,
    deps: any[] = []
): RefObject<anime.AnimeInstance | null> {
    const animationRef = useRef<anime.AnimeInstance | null>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            // Skip animation if user prefers reduced motion
            return;
        }

        // Create animation
        animationRef.current = anime(config);

        // Cleanup
        return () => {
            if (animationRef.current) {
                animationRef.current.pause();
                animationRef.current = null;
            }
        };
    }, deps);

    return animationRef;
}

/**
 * Hook for animations that trigger on mount
 */
export function useAnimeOnMount(
    targetRef: RefObject<HTMLElement | null>,
    animationConfig: Partial<anime.AnimeParams>,
    deps: any[] = []
) {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!targetRef.current || prefersReducedMotion) return;

        const animation = anime({
            targets: targetRef.current,
            ...animationConfig,
        });

        return () => {
            animation.pause();
        };
    }, [targetRef, prefersReducedMotion, ...deps]);
}

/**
 * Hook for hover animations
 */
export function useAnimeHover(
    targetRef: RefObject<HTMLElement | null>,
    enterConfig: Partial<anime.AnimeParams>,
    leaveConfig: Partial<anime.AnimeParams>
) {
    const prefersReducedMotion = useReducedMotion();
    const animationRef = useRef<anime.AnimeInstance | null>(null);

    useEffect(() => {
        const element = targetRef.current;
        if (!element || prefersReducedMotion) return;

        const handleMouseEnter = () => {
            if (animationRef.current) {
                animationRef.current.pause();
            }
            animationRef.current = anime({
                targets: element,
                ...enterConfig,
            });
        };

        const handleMouseLeave = () => {
            if (animationRef.current) {
                animationRef.current.pause();
            }
            animationRef.current = anime({
                targets: element,
                ...leaveConfig,
            });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                animationRef.current.pause();
            }
        };
    }, [targetRef, prefersReducedMotion]);
}

/**
 * Hook for staggered animations
 */
export function useAnimeStagger(
    containerRef: RefObject<HTMLElement | null>,
    selector: string,
    animationConfig: Partial<anime.AnimeParams>,
    staggerDelay: number = 100,
    deps: any[] = []
) {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion) return;

        const elements = containerRef.current.querySelectorAll(selector);
        if (elements.length === 0) return;

        const animation = anime({
            targets: Array.from(elements),
            ...animationConfig,
            delay: anime.stagger(staggerDelay),
        });

        return () => {
            animation.pause();
        };
    }, [containerRef, selector, staggerDelay, prefersReducedMotion, ...deps]);
}

/**
 * Hook for count-up number animation
 */
export function useCountUp(
    targetRef: RefObject<HTMLElement | null>,
    start: number,
    end: number,
    duration: number = 2000,
    decimals: number = 0,
    suffix: string = '',
    trigger: boolean = true
) {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!targetRef.current || !trigger || prefersReducedMotion) {
            if (targetRef.current && prefersReducedMotion) {
                targetRef.current.textContent = end.toFixed(decimals) + suffix;
            }
            return;
        }

        const obj = { value: start };

        const animation = anime({
            targets: obj,
            value: end,
            duration,
            easing: 'easeOutExpo',
            round: decimals === 0 ? 1 : Math.pow(10, decimals),
            update: () => {
                if (targetRef.current) {
                    targetRef.current.textContent = obj.value.toFixed(decimals) + suffix;
                }
            },
        });

        return () => {
            animation.pause();
        };
    }, [targetRef, start, end, duration, decimals, suffix, trigger, prefersReducedMotion]);
}
