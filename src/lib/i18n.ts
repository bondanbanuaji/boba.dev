import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from '@/locales/en/common.json';
import heroEN from '@/locales/en/hero.json';
import aboutEN from '@/locales/en/about.json';
import projectsEN from '@/locales/en/projects.json';
import servicesEN from '@/locales/en/services.json';
import contactEN from '@/locales/en/contact.json';
import footerEN from '@/locales/en/footer.json';
import projectDescriptionsEN from '@/locales/en/project-descriptions.json';
import workEN from '@/locales/en/work.json';

import commonID from '@/locales/id/common.json';
import heroID from '@/locales/id/hero.json';
import aboutID from '@/locales/id/about.json';
import projectsID from '@/locales/id/projects.json';
import servicesID from '@/locales/id/services.json';
import contactID from '@/locales/id/contact.json';
import footerID from '@/locales/id/footer.json';
import projectDescriptionsID from '@/locales/id/project-descriptions.json';
import workID from '@/locales/id/work.json';

const resources = {
    en: {
        common: commonEN,
        hero: heroEN,
        about: aboutEN,
        projects: projectsEN,
        services: servicesEN,
        contact: contactEN,
        footer: footerEN,
        projectDescriptions: projectDescriptionsEN,
        work: workEN,
    },
    id: {
        common: commonID,
        hero: heroID,
        about: aboutID,
        projects: projectsID,
        services: servicesID,
        contact: contactID,
        footer: footerID,
        projectDescriptions: projectDescriptionsID,
        work: workID,
    },
};

// Detect if user is in Indonesia based on timezone
const isIndonesianTimezone = (): boolean => {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // List of Indonesian timezones
        const indonesianTimezones = [
            'Asia/Jakarta',
            'Asia/Pontianak',
            'Asia/Makassar',
            'Asia/Jayapura',
        ];
        return indonesianTimezones.includes(timezone);
    } catch {
        return false;
    }
};

// Detect country based on IP geolocation (async fallback)
const detectCountryByIP = async (): Promise<string | null> => {
    try {
        // Using free ipapi.co service (no API key needed, but limited to 1000 requests/day)
        // Alternative: 'https://ipapi.co/json/' or 'https://ip-api.com/json/'
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        
        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.country_code; // Returns 'ID' for Indonesia
    } catch {
        return null;
    }
};

// Get initial language only on client-side, always return 'en' for SSR
const getInitialLanguage = (): string => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    // 1. Check localStorage first (user preference - highest priority)
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
        return savedLanguage;
    }

    // 2. Check geographic location via timezone (Primary detection for server/network location)
    if (isIndonesianTimezone()) {
        return 'id';
    }

    // 3. Check browser language/locale
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang && browserLang.toLowerCase().startsWith('id')) {
        return 'id';
    }

    // 4. Check browser languages array
    if (navigator.languages && navigator.languages.length > 0) {
        const hasIndonesian = navigator.languages.some(lang => 
            lang.toLowerCase().startsWith('id')
        );
        if (hasIndonesian) {
            return 'id';
        }
    }

    // 5. Fallback: Check timezone offset for additional Asian timezones
    // Indonesia timezones: UTC+7 (WIB), UTC+8 (WITA), UTC+9 (WIT)
    const timezoneOffset = new Date().getTimezoneOffset();
    if (timezoneOffset === -420 || timezoneOffset === -480 || timezoneOffset === -540) {
        // Additional check to avoid false positives from other countries with same offset
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // If timezone contains Asia and has matching offset, likely Indonesia
        if (timezone.startsWith('Asia/')) {
            return 'id';
        }
    }

    // 6. Default to English for all other locations
    return 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'hero', 'about', 'projects', 'services', 'contact', 'footer', 'projectDescriptions', 'work'],
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

// Save language to localStorage when it changes (client-side only)
if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
        localStorage.setItem('i18nextLng', lng);
    });
}

// Enhanced geolocation detection with IP-based fallback
// This runs after initial load to refine language detection
export const refineLanguageDetection = async () => {
    if (typeof window === 'undefined') return;

    // Only run if user hasn't manually selected a language
    const savedLanguage = localStorage.getItem('i18nextLng');
    const hasManualSelection = localStorage.getItem('i18nextLng-manual');
    
    if (savedLanguage && hasManualSelection === 'true') {
        // User has manually selected a language, don't override
        return;
    }

    try {
        // Try to get more accurate location from IP
        const countryCode = await detectCountryByIP();
        
        if (countryCode === 'ID' && i18n.language !== 'id') {
            // User is in Indonesia based on IP, switch to Indonesian
            await i18n.changeLanguage('id');
        } else if (countryCode && countryCode !== 'ID' && i18n.language !== 'en') {
            // User is outside Indonesia, switch to English
            await i18n.changeLanguage('en');
        }
    } catch (error) {
        // Silently fail, keep current language detection
        console.debug('IP-based geolocation detection failed, using timezone-based detection');
    }
};

// Mark language changes as manual when user explicitly changes language
export const setLanguageManually = async (lng: string) => {
    if (typeof window === 'undefined') return;
    
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng-manual', 'true');
};

export default i18n;
