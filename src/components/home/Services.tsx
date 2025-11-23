'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Web Development',
        description: 'Building scalable, high-performance web applications using modern technologies like Next.js, React, and Node.js.',
        icon: 'Code'
    },
    {
        title: 'Creative Development',
        description: 'Crafting immersive web experiences with WebGL, Three.js, and GSAP to create memorable digital interactions.',
        icon: 'Box'
    },
    {
        title: 'UI/UX Design',
        description: 'Designing intuitive and accessible user interfaces that prioritize user experience and brand consistency.',
        icon: 'Layout'
    },
    {
        title: 'Technical Strategy',
        description: 'Consulting on technical architecture, performance optimization, and digital transformation strategies.',
        icon: 'Cpu'
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10 bg-white/5 backdrop-blur-sm">
            <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto">
                <div className="mb-12 md:mb-20 lg:mb-32 text-center">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">Expertise</h2>
                    <p className="text-lg md:text-xl lg:text-2xl opacity-60 max-w-3xl mx-auto px-4 font-light">
                        Comprehensive digital solutions tailored to your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card p-6 md:p-8 lg:p-10 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-default flex flex-col h-full"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 lg:mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                {/* Simple Icon Placeholder */}
                                <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-current rounded-sm" />
                            </div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 lg:mb-6 group-hover:text-purple-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg opacity-70 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
