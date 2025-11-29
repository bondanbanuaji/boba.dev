'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import anime from 'animejs';
import { useTranslation } from 'react-i18next';
import MagneticButton from '@/components/ui/MagneticButton';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLenis } from '@/components/layout/SmoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import '@/lib/i18n';

export default function Navbar() {
    const { t } = useTranslation('common');
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const lenis = useLenis();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const navLinks = [
        { name: isMounted ? t('nav.home') : 'Home', href: '#home' },
        { name: isMounted ? t('nav.about') : 'About', href: '#about' },
        { name: isMounted ? t('nav.work') : 'Work', href: '#work' },
        { name: isMounted ? t('nav.services') : 'Services', href: '#services' },
        { name: isMounted ? t('nav.contact') : 'Contact', href: '#contact' },
    ];

    // Handle scroll to section
    const handleScrollToSection = (targetId: string) => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        if (lenis) {
            lenis.scrollTo(targetElement, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close menu dengan delay kecil
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            closeMenu();
        }, 100);
    };

    // Close menu
    const closeMenu = () => {
        if (!isOpen) return;

        gsap.to('.mobile-nav-link', {
            y: -30,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power3.in',
        });

        gsap.to(mobileMenuRef.current, {
            clipPath: 'circle(0% at 100% 0%)',
            duration: 0.5,
            ease: 'power4.inOut',
            delay: 0.15,
            onComplete: () => {
                setIsOpen(false);
            },
        });
    };

    // Toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Desktop nav animation on mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.nav-link-desktop', { y: -20, opacity: 0 });
            gsap.to('.nav-link-desktop', {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.5,
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            mobileMenuRef.current.style.pointerEvents = 'auto';

            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(150% at 100% 0%)',
                duration: 0.8,
                ease: 'power4.inOut',
            });

            gsap.fromTo(
                '.mobile-nav-link',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        } else {
            mobileMenuRef.current.style.pointerEvents = 'none';
            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.5,
                ease: 'power4.inOut',
            });
        }
    }, [isOpen]);

    // Scroll-based navbar background blur & transparency
    useEffect(() => {
        if (!navRef.current) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Advanced logo hover animation with Anime.js
    useEffect(() => {
        const logo = logoRef.current;
        if (!logo || prefersReducedMotion) return;

        const handleMouseEnter = () => {
            anime({
                targets: logo,
                scale: 1.12,
                rotate: '8deg',
                duration: 350,
                easing: 'easeOutElastic(1, 0.6)',
            });
        };

        const handleMouseLeave = () => {
            anime({
                targets: logo,
                scale: 1,
                rotate: '0deg',
                duration: 350,
                easing: 'easeOutElastic(1, 0.6)',
            });
        };

        logo.addEventListener('mouseenter', handleMouseEnter);
        logo.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            logo.removeEventListener('mouseenter', handleMouseEnter);
            logo.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [prefersReducedMotion]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-[60] px-6 py-4 flex justify-between items-center text-white pointer-events-none ${!isOpen ? 'mix-blend-difference' : ''}`}
            >
                <div ref={logoRef} className='relative z-[60] md:left-5 md:top-1 pointer-events-auto'>
                    <Link href='/'>
                        <Image
                            src={isOpen ? '/img/Logo/boba-light-logo-removebg-preview.png' : '/img/Logo/boba-dark-logo-removebg-preview.png'}
                            alt='Logo'
                            width={100}
                            height={100}
                            className='w-16 h-auto sm:w-20 md:w-24 lg:w-28 transition-opacity duration-300'
                            priority
                        />
                    </Link>
                </div>
                
                {/* Desktop Menu */}
                <div className='hidden md:flex gap-8 items-center pointer-events-auto'>
                    {navLinks.map((link) => (
                        <MagneticButton key={link.href} strength={0.2} className="inline-block">
                            <button
                                onClick={() => handleScrollToSection(link.href.replace('#', ''))}
                                className='nav-link-desktop text-white text-sm uppercase tracking-widest hover:opacity-70 transition-opacity px-4 py-2 cursor-pointer border-none bg-none p-0'
                            >
                                {link.name}
                            </button>
                        </MagneticButton>
                    ))}
                    <div className='nav-link-desktop'>
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className='md:hidden relative z-[60] pointer-events-auto'>
                    <button
                        onClick={toggleMenu}
                        className={`text-sm uppercase tracking-widest hover:opacity-70 transition-all duration-300 border-none bg-none cursor-pointer ${isOpen ? 'text-black' : 'text-white'}`}
                    >
                        {isOpen ? (isMounted ? t('nav.close') : 'Close') : (isMounted ? t('nav.menu') : 'Menu')}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className='fixed inset-0 bg-white z-[55] flex flex-col justify-center items-center md:hidden pointer-events-none'
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
            >
                <div className='flex flex-col gap-6 items-center'>
                    {navLinks.map((link) => (
                        <div key={link.href} className='overflow-hidden'>
                            <button
                                onClick={() => handleScrollToSection(link.href.replace('#', ''))}
                                className='mobile-nav-link relative text-black text-5xl font-bold tracking-tighter after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-[4px] after:bg-black after:transition-all after:duration-500 hover:after:w-full cursor-pointer border-none bg-none p-0 m-0'
                            >
                                {link.name}
                            </button>
                        </div>
                    ))}
                    <div className='mobile-nav-link mt-4'>
                        <div className='bg-black px-6 py-3 rounded-full'>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}