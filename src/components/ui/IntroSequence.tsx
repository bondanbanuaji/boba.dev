'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';

export default function IntroSequence() {
    const [step, setStep] = useState<'loading' | 'input' | 'greeting' | 'complete'>('loading');
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Loading Logic
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

    // Transition from Loading to Input
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

    // Focus input when entering input step
    useEffect(() => {
        if (step === 'input' && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [step]);

    // Fade in content when switching to greeting
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

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        gsap.to(contentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                setStep('greeting');
                // Greeting animation is handled by SplitText
            }
        });
    };

    // Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    const handleGreetingComplete = () => {
        // Wait a bit after greeting finishes, then exit
        setTimeout(() => {
            gsap.to(containerRef.current, {
                y: '-100%',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    setStep('complete');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
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
            <div ref={contentRef} className="w-full max-w-none px-4 flex flex-col items-center justify-center">
                {step === 'loading' && (
                    <div className="text-9xl font-bold tracking-tighter">
                        {progress}%
                    </div>
                )}

                {step === 'input' && (
                    <form onSubmit={handleNameSubmit} className="w-full flex flex-col items-center gap-6">
                        <h2 className="text-2xl md:text-3xl font-light opacity-80">What's your name?</h2>
                        <input
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-white/20 text-center text-4xl md:text-6xl font-bold py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                            placeholder="Type here..."
                        />
                        <button
                            type="submit"
                            className="mt-4 px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm"
                        >
                            Enter
                        </button>
                    </form>
                )}

                {step === 'greeting' && (
                    <div className="text-center relative z-10">
                        <SplitText
                            text={`Hello, ${name}!`}
                            className="text-6xl md:text-8xl font-bold tracking-tighter text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            triggerOnScroll={false}
                            onLetterAnimationComplete={handleGreetingComplete}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
