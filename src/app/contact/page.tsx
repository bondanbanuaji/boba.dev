'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Parallax from '@/components/ui/Parallax';
import MagneticButton from '@/components/ui/MagneticButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/bondanbanuaji',
        icon: faGithub,
        color: 'hover:text-gray-400',
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/bondanbanuaji',
        icon: faLinkedin,
        color: 'hover:text-blue-400',
    },
    {
        name: 'Email',
        href: 'mailto:bondan.banuaji@gmail.com',
        icon: faEnvelope,
        color: 'hover:text-red-400',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/bondanbanuaji',
        icon: faTwitter,
        color: 'hover:text-sky-400',
    },
];

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Title Animation
        const titleChars = gsap.utils.toArray<HTMLElement>('.contact-title-char');
        gsap.fromTo(titleChars,
            { opacity: 0, y: 50, rotationX: -90 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                stagger: 0.02,
                duration: 0.8,
                ease: 'back.out(1.5)',
            }
        );

        // Social Icons Animation
        const socialIcons = gsap.utils.toArray<HTMLElement>('.social-icon');
        gsap.fromTo(socialIcons,
            { opacity: 0, scale: 0, rotation: -180 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.5)',
                delay: 0.5,
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10 flex items-center">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[70vw] mx-auto relative z-10 w-full">
                {/* Page Title */}
                <div className="text-center mb-16 md:mb-20">
                    <Parallax speed={-0.03}>
                        <div className="mb-6">
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
                                Let&apos;s Connect
                            </span>
                        </div>
                        <h1 className="contact-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none mb-8">
                            {'Get In Touch'.split('').map((char, i) => (
                                <span key={i} className="contact-title-char inline-block">
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-70 max-w-3xl mx-auto font-light">
                            Have a project in mind or just want to say hello? I&apos;d love to hear from you!
                        </p>
                    </Parallax>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-12">
                    {/* Email CTA */}
                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl opacity-80">
                            Feel free to reach out anytime
                        </p>
                        <MagneticButton strength={0.4}>
                            <a
                                href="mailto:bondan.banuaji@gmail.com"
                                className="inline-block px-10 py-5 md:px-12 md:py-6 bg-white text-black rounded-full font-bold text-lg md:text-xl uppercase tracking-widest hover:bg-gray-200 transition-colors"
                            >
                                bondan.banuaji@gmail.com
                            </a>
                        </MagneticButton>
                    </div>

                    {/* Divider */}
                    <div className="py-8">
                        <div className="w-24 h-[1px] bg-white/20 mx-auto"></div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-8">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            Or connect with me on
                        </h2>
                        <div className="flex justify-center gap-6 md:gap-8">
                            {socialLinks.map((social) => (
                                <MagneticButton key={social.name} strength={0.5}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`social-icon group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-all duration-500 ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <FontAwesomeIcon
                                            icon={social.icon}
                                            className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <span className="text-sm md:text-base font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                            {social.name}
                                        </span>
                                    </a>
                                </MagneticButton>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-12 space-y-4 opacity-60">
                        <p className="text-sm md:text-base">
                            Based in Karawang, Indonesia 🇮🇩
                        </p>
                        <p className="text-sm md:text-base">
                            Available for freelance opportunities and collaborations
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
