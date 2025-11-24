'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Parallax from '@/components/ui/Parallax';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        description: 'Building modern, responsive websites and web applications using the latest technologies and best practices.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        icon: '🌐',
    },
    {
        title: 'Full Stack Development',
        description: 'End-to-end development from database design to frontend implementation with seamless API integration.',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
        icon: '⚙️',
    },
    {
        title: '3D Web Experiences',
        description: 'Creating immersive 3D experiences and animations using Three.js, WebGL, and GSAP for engaging user interactions.',
        skills: ['Three.js', 'WebGL', 'GSAP', 'Blender'],
        icon: '✨',
    },
    {
        title: 'UI/UX Development',
        description: 'Translating designs into pixel-perfect, interactive interfaces with smooth animations and transitions.',
        skills: ['Figma', 'Framer Motion', 'GSAP', 'CSS'],
        icon: '🎨',
    },
    {
        title: 'API Development',
        description: 'Designing and building RESTful and GraphQL APIs with proper authentication, validation, and documentation.',
        skills: ['REST', 'GraphQL', 'JWT', 'API Design'],
        icon: '🔌',
    },
    {
        title: 'Performance Optimization',
        description: 'Optimizing web applications for speed, SEO, and accessibility to deliver the best user experience.',
        skills: ['Lighthouse', 'SEO', 'Web Vitals', 'Optimization'],
        icon: '⚡',
    },
];

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Title Animation
        const titleChars = gsap.utils.toArray<HTMLElement>('.service-title-char');
        gsap.fromTo(titleChars,
            { opacity: 0, y: 50, rotationX: -90 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                stagger: 0.02,
                duration: 0.8,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: '.services-title',
                    start: 'top 80%',
                },
            }
        );

        // Service Cards Animation
        const cards = gsap.utils.toArray<HTMLElement>('.service-card');
        cards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[85vw] mx-auto relative z-10">
                {/* Page Title */}
                <div className="text-center mb-16 md:mb-24">
                    <Parallax speed={-0.03}>
                        <div className="mb-6">
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
                                What I Offer
                            </span>
                        </div>
                        <h1 className="services-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none mb-8">
                            {'Services'.split('').map((char, i) => (
                                <span key={i} className="service-title-char inline-block">
                                    {char}
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-70 max-w-3xl mx-auto font-light">
                            Specialized services to bring your digital ideas to life with cutting-edge technology and creative solutions.
                        </p>
                    </Parallax>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-all duration-500"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-base opacity-70 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                                {service.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs rounded-full border border-white/20 bg-white/5"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center py-16 md:py-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Ready to Start a Project?
                    </h2>
                    <p className="text-lg md:text-xl opacity-70 mb-10 max-w-2xl mx-auto">
                        Let&apos;s collaborate and create something extraordinary together.
                    </p>
                    <MagneticButton strength={0.3}>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Get In Touch
                        </Link>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
