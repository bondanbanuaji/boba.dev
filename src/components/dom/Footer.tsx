'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin, faGithub, faTelegram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

import { useLenis } from '@/components/layout/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const lenis = useLenis();
    const footerRef = useRef<HTMLElement>(null);

    const socialLinks = [
        { icon: faTwitter, href: 'https://x.com/jwcfrey', label: 'Twitter' },
        { icon: faInstagram, href: 'https://www.instagram.com/bdn_bnj?igsh=MXdkZmRiejkwYTNjeQ==', label: 'Instagram' },
        { icon: faLinkedin, href: 'linkedin.com/in/bondan-banuaji', label: 'LinkedIn' },
        { icon: faTelegram, href: 'https://t.me/bxooxbxa', label: 'Telegram' },
        { icon: faDiscord, href: 'https://discord.com/users/1413391132452192307', label: 'Discord' },
        { icon: faEnvelope, href: 'mailto:bondanbanuaji@gmail.com', label: 'Email' },
        { icon: faGithub, href: 'https://github.com/bondanbanuaji', label: 'GitHub' },
    ];

    const handleScrollTop = () => {
        lenis?.scrollTo(0);
    };

    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement && lenis) {
            lenis.scrollTo(targetElement, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    };

    useGSAP(() => {
        if (!footerRef.current) return;

        // Ensure content is visible first (fallback)
        gsap.set(['.go-top-indicator', '.footer-content', '.social-icon', '.sitemap-link'], { 
            clearProps: 'all'
        });

        // Animate Go Top Indicator
        gsap.from('.go-top-indicator', {
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                onEnter: () => gsap.set('.go-top-indicator', { opacity: 1 }),
            },
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: 'power3.out',
        });

        // Animate Footer Content
        const footerContent = gsap.utils.toArray<HTMLElement>('.footer-content');
        if (footerContent.length > 0) {
            gsap.from(footerContent, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => gsap.set(footerContent, { opacity: 1 }),
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            });
        }

        // Animate Social Icons
        const socialIcons = gsap.utils.toArray<HTMLElement>('.social-icon');
        if (socialIcons.length > 0) {
            gsap.from(socialIcons, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => gsap.set(socialIcons, { opacity: 1 }),
                },
                opacity: 0,
                scale: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
            });
        }

        // Animate Sitemap Links
        const sitemapLinks = gsap.utils.toArray<HTMLElement>('.sitemap-link');
        if (sitemapLinks.length > 0) {
            gsap.from(sitemapLinks, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => gsap.set(sitemapLinks, { opacity: 1 }),
                },
                opacity: 0,
                x: 20,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
            });
        }

        // Immediate visibility timeout fallback
        setTimeout(() => {
            gsap.set(['.go-top-indicator', '.footer-content', '.social-icon', '.sitemap-link'], { 
                opacity: 1,
                clearProps: 'transform'
            });
        }, 100);

    }, { scope: footerRef });

    return (
        <footer ref={footerRef} data-cursor-inverse="true" className="w-full bg-white/95 backdrop-blur-md text-black relative z-20 mt-20 md:mt-32 lg:mt-40">
            {/* Go Top Indicator */}
            <div
                onClick={handleScrollTop}
                className="go-top-indicator absolute top-0 right-6 md:right-20 -translate-y-1/2 cursor-pointer group z-20 flex flex-col items-center gap-4 mix-blend-difference"
            >
                <div className="relative w-[1px] h-32 md:h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-white animate-scrollY"></div>
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase rotate-90 origin-center translate-y-2 text-white group-hover:opacity-70 transition-opacity">
                    Top
                </span>
            </div>

            <div className="w-full px-6 md:max-w-[80vw] lg:max-w-[70vw] mx-auto py-12 md:py-20">
                <div className="footer-content flex flex-col mt-10 md:flex-row justify-between gap-12 md:gap-8 mb-16 md:mb-24">
                    {/* Left Side: Brand & Socials */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <Link href='/' className='block mb-6'>
                                <Image
                                    src='/img/Logo/boba-light-logo-removebg-preview.png'
                                    alt='Logo'
                                    width={100}
                                    height={100}
                                    className='w-20 h-auto md:w-36'
                                    priority
                                />
                            </Link>
                            <div className="flex gap-5 flex-wrap max-w-[calc(4*28px+3*16px)] md:max-w-[calc(6*28px+5*16px)] lg:max-w-[calc(8*28px+7*16px)]">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target={social.href.startsWith('http') ? '_blank' : undefined}
                                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={social.label}
                                        className="social-icon size-[28px] rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
                                    >
                                        <FontAwesomeIcon icon={social.icon} className="text-2xl transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sitemap */}
                    <div className="md:text-right">
                        <ul className="space-y-4 flex flex-col md:items-end">
                            {[
                                { name: 'Home', href: '#home' },
                                { name: 'About', href: '#about' },
                                { name: 'Work', href: '#work' },
                                { name: 'Services', href: '#services' },
                                { name: 'Contact', href: '#contact' }
                            ].map((item) => (
                                <li key={item.name} className="sitemap-link">
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleScrollToSection(e, item.href)}
                                        className="text-xl md:text-lg font-medium text-black uppercase hover:text-black/60 transition-colors inline-block tracking-tight cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-content flex flex-col md:flex-row justify-start items-start pt-8 text-[8px] text-black/50 tracking-widest gap-4 md:gap-0 uppercase border-t border-black/10">
                    <p>&copy; {currentYear} Boba.dev. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
