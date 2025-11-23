'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
    frontend: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'GSAP',
        'Three.js',
        'WebGL'
    ],

    backend: [
        'Node.js',
        'Express',
        'PostgreSQL',
        'MongoDB',
        'GraphQL',
        'Supabase',
        'Firebase'
    ],

    devOps: [
        'Git',
        'Docker',
        'Vercel',
        'AWS'
    ],

    designTools: [
        'Figma',
        'Blender'
    ],

    testing: [
        'Jest'
    ]
};

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Marquee Animation
        if (marqueeRef.current) {
            const wrapper = marqueeRef.current.querySelector('.flex') as HTMLElement;
            const content = marqueeRef.current.querySelector('.marquee-content') as HTMLElement;
            if (content && wrapper) {
                // Clone the content twice to ensure seamless loop
                const clone1 = content.cloneNode(true);
                const clone2 = content.cloneNode(true);
                wrapper.appendChild(clone1);
                wrapper.appendChild(clone2);

                const contentWidth = content.offsetWidth;

                gsap.to(wrapper.children, {
                    x: -contentWidth,
                    repeat: -1,
                    duration: 30,
                    ease: 'linear',
                    modifiers: {
                        x: (x) => {
                            const distance = parseFloat(x);
                            return `${distance % contentWidth}px`;
                        }
                    }
                });
            }
        }

        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 lg:py-40 relative z-10 overflow-hidden">
            <div className="mb-12 md:mb-20 lg:mb-32 px-4 md:px-6 text-center">
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">Skills & Tools</h2>
                <p className="text-lg md:text-xl lg:text-2xl opacity-60 font-light">The technologies I use to bring ideas to life.</p>
            </div>

            {/* Infinite Marquee for Top Skills */}
            <div className="w-full bg-white/5 py-6 md:py-8 lg:py-12 mb-12 md:mb-20 lg:mb-32 overflow-hidden" ref={marqueeRef}>
                <div className="flex whitespace-nowrap">
                    <div className="marquee-content flex gap-8 md:gap-12 lg:gap-16 items-center shrink-0">
                        {[...skills.frontend, ...skills.backend, ...skills.devOps, ...skills.designTools, ...skills.testing].map((skill, i) => (
                            <span key={i} className="text-3xl md:text-4xl lg:text-7xl font-bold opacity-30 whitespace-nowrap hover:opacity-100 transition-opacity duration-500 cursor-default px-4 md:px-6 lg:px-8">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="skill-category">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-widest mb-6 md:mb-8 lg:mb-10 border-b border-white/20 pb-4">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-white/5 rounded-lg text-xs md:text-sm lg:text-base hover:bg-white hover:text-black transition-colors duration-300 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
