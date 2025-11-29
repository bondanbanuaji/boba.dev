'use client';

import { useRef, useEffect, useState } from 'react';
import { useCountUp } from '@/hooks/useAnimeAnimation';

interface CountUpNumberProps {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    className?: string;
    trigger?: boolean;
    onComplete?: () => void;
}

export default function CountUpNumber({
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    suffix = '',
    className = '',
    trigger = true,
    onComplete,
}: CountUpNumberProps) {
    const numberRef = useRef<HTMLSpanElement | null>(null);
    const [hasCompleted, setHasCompleted] = useState(false);

    useCountUp(numberRef, start, end, duration, decimals, suffix, trigger);

    useEffect(() => {
        if (trigger && !hasCompleted) {
            const timer = setTimeout(() => {
                setHasCompleted(true);
                onComplete?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [trigger, duration, hasCompleted, onComplete]);

    return <span ref={numberRef} className={className}>{start.toFixed(decimals) + suffix}</span>;
}
