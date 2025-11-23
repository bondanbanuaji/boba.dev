'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import Parallax from '@/components/ui/Parallax';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'E-Commerce Redesign',
        category: 'Development',
        description: 'A modern, high-performance e-commerce platform built with Next.js and Shopify.',
        tech: ['Next.js', 'Shopify', 'Tailwind', 'GSAP'],
        color: 'bg-blue-900/20',
        image: '/img/project/img1.jpg' // Placeholder
    },
    {
        id: 2,
        title: 'Immersive Portfolio',
        category: 'Design & Dev',
        description: 'An award-winning 3D portfolio featuring interactive WebGL experiences.',
        tech: ['Three.js', 'R3F', 'Blender', 'React'],
        color: 'bg-purple-900/20',
        image: '/img/project/img2.jpg' // Placeholder
    },
    {
        id: 3,
        title: 'Fintech Dashboard',
        category: 'Product Design',
        description: 'Real-time financial data visualization dashboard for enterprise clients.',
        tech: ['React', 'D3.js', 'TypeScript', 'Node.js'],
        color: 'bg-emerald-900/20',
        image: '/img/project/img3.jpg' // Placeholder
    },
    {
        id: 4,
        title: 'AI Content Generator',
        category: 'Full Stack',
        description: 'SaaS application leveraging OpenAI API for automated content creation.',
        tech: ['Next.js', 'OpenAI', 'Stripe', 'PostgreSQL'],
        color: 'bg-orange-900/20',
        image: '/img/project/img4.jpg' // Placeholder
    }
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const projects = gsap.utils.toArray<HTMLElement>('.project-card');

        projects.forEach((project, i) => {
            gsap.from(project, {
                scrollTrigger: {
                    trigger: project,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    return (
        <section id="work" ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            <div className="max-w-[90vw] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 lg:mb-32 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">Selected Work</h2>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-60 max-w-xl">
                            A collection of projects that define my approach to digital product design.
                        </p>
                    </div>
                    <Link href="/work" className="hidden md:block text-lg lg:text-xl border-b border-white/30 pb-1 hover:border-white transition-colors">
                        View All Projects
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24 lg:gap-x-20 lg:gap-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card group relative ${index % 2 === 1 ? 'md:mt-20 lg:mt-32' : ''}`}
                        >
                            <Parallax speed={index % 2 === 0 ? 0.05 : 0.1}>
                                <div className={`aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] ${project.color} rounded-2xl overflow-hidden mb-8 relative`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                </div>
                            </Parallax>

                            <div className="flex flex-col justify-between items-start gap-4">
                                <div className="w-full">
                                    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-3">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold group-hover:text-purple-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <Link
                                            href={`/work/${project.id}`}
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 w-4 h-4 md:w-5 md:h-5">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest whitespace-nowrap">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-base md:text-lg opacity-70 mb-6 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex gap-2 md:gap-3 flex-wrap">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs md:text-sm opacity-50"># {t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Link href="/work" className="text-lg border-b border-white/30 pb-1 hover:border-white transition-colors">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
