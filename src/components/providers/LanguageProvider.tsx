'use client';

import { useEffect } from 'react';
import { refineLanguageDetection } from '@/lib/i18n';

export default function LanguageProvider() {
    useEffect(() => {
        // Run IP-based geolocation detection after initial render
        // This refines the language detection based on actual network location
        const detectLanguage = async () => {
            await refineLanguageDetection();
        };

        // Delay slightly to avoid blocking initial render
        const timeoutId = setTimeout(() => {
            detectLanguage();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return null;
}
