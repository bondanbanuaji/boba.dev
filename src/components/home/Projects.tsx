'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import Parallax from '@/components/ui/Parallax';
import { type PinnedRepo } from '@/lib/github';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<PinnedRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const repos = await response.json();
                setProjects(repos);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    useGSAP(() => {
        if (loading || projects.length === 0) return;

        const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');

        projectCards.forEach((project) => {
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
    }, { scope: containerRef, dependencies: [loading, projects] });

    if (loading) {
        return (
            <section id="work" className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
                <div className="max-w-[90vw] mx-auto">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50"></div>
                        <p className="mt-4 text-white/50">Loading projects...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="work" ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            <div className="max-w-[90vw] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 lg:mb-32 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight">Work Projects</h2>
                        <p className="text-lg md:text-xl lg:text-2xl opacity-60 max-w-xl">
                            A collection of my featured open-source projects from GitHub.
                        </p>
                    </div>
                    <a
                        href="https://github.com/bondanbanuaji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 text-lg lg:text-xl border-b border-white/30 pb-1 hover:border-white transition-colors"
                    >
                        View GitHub Profile
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24 lg:gap-x-20 lg:gap-y-32">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card group relative ${index % 2 === 1 ? 'md:mt-20 lg:mt-32' : ''}`}
                        >
                            <Parallax speed={index % 2 === 0 ? 0.05 : 0.15} className="mb-8">
                                <div className="aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden relative">
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
                                        <a
                                            href={project.homepageUrl || project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300"
                                        >
                                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <span
                                            className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest whitespace-nowrap flex items-center gap-2"
                                            style={{ borderColor: project.languageColor + '40' }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: project.languageColor }}
                                            />
                                            {project.language}
                                        </span>
                                        <div className="flex items-center gap-3 text-xs opacity-50">
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {project.stars}
                                            </span>
                                            {project.forks > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <GitFork className="w-3 h-3" />
                                                    {project.forks}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-base md:text-lg opacity-70 mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-2 md:gap-3 flex-wrap">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="text-xs md:text-sm opacity-50">
                                                # {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
                                        >
                                            View on GitHub
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <a
                        href="https://github.com/bondanbanuaji"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg border-b border-white/30 pb-1 hover:border-white transition-colors"
                    >
                        View GitHub Profile
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
