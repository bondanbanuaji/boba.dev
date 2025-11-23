'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experience = [
    {
        role: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        period: '2022 - Present',
        description: [
            'Led a team of 5 developers in rebuilding the core product dashboard.',
            'Improved application performance by 60% through code splitting and optimization.',
            'Implemented a comprehensive design system using React and Tailwind CSS.'
        ]
    },
    {
        role: 'Creative Developer',
        company: 'Digital Agency X',
        period: '2020 - 2022',
        description: [
            'Developed award-winning immersive websites for Fortune 500 clients.',
            'Integrated WebGL experiences using Three.js and GSAP.',
            'Collaborated closely with designers to bridge the gap between design and code.'
        ]
    },
    {
        role: 'Frontend Developer',
        company: 'StartUp Y',
        period: '2018 - 2020',
        description: [
            'Built the MVP for a fintech platform from scratch.',
            'Implemented real-time data visualization features.',
            'Mentored junior developers and established code quality standards.'
        ]
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>('.timeline-item');

        items.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            <div className="max-w-[90vw] lg:max-w-[60vw] mx-auto">
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 lg:mb-32 text-center tracking-tight">Experience</h2>

                <div className="relative border-l border-white/20 ml-2 md:ml-0 space-y-12 md:space-y-16 lg:space-y-24">
                    {experience.map((job, index) => (
                        <div key={index} className="timeline-item relative pl-8 md:pl-20 lg:pl-32">
                            {/* Timeline Dot */}
                            <div className="absolute left-[-5px] top-2 md:top-3 w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 md:mb-4">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold">{job.role}</h3>
                                <span className="text-sm md:text-lg lg:text-xl opacity-60 font-mono mt-1 md:mt-0">{job.period}</span>
                            </div>

                            <div className="text-lg md:text-xl lg:text-2xl text-purple-400 mb-4 md:mb-6">{job.company}</div>

                            <ul className="space-y-2 md:space-y-3 lg:space-y-4 opacity-80 list-disc ml-4 text-sm md:text-base lg:text-lg font-light">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="pl-1 md:pl-2">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
