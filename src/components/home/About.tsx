'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Parallax from '@/components/ui/Parallax';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { number: '559+', label: 'Contributions', sublabel: 'Last Year' },
    { number: '30+', label: 'Projects', sublabel: 'Built' },
    { number: '5+', label: 'Tech Stacks', sublabel: 'Mastered' },
    { number: '100%', label: 'Dedication', sublabel: 'Always' },
];

const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'Python',
    'Three.js', 'GSAP', 'TailwindCSS', 'MongoDB', 'MySQL', 'PostgreSQL'
];

const hobbies = [
    { emoji: '💻', text: 'Ngoding' },
    { emoji: '🎵', text: 'Listening Music' },
    { emoji: '✈️', text: 'Traveling' },
    { emoji: '😴', text: 'Sleeping' },
    { emoji: '🗿', text: 'Ngising' },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Ensure content is visible first (fallback)
        gsap.set(['.about-paragraph', '.stat-card', '.skill-badge', '.hobby-item', '.profile-card'], { 
            clearProps: 'all'
        });

        // Split Title Animation
        const titleChars = titleRef.current?.textContent?.split('') || [];
        if (titleRef.current && titleChars.length > 0) {
            titleRef.current.innerHTML = titleChars
                .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');

            gsap.fromTo(titleRef.current.children,
                {
                    opacity: 0,
                    y: 80,
                    rotationX: -90,
                },
                {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                        end: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.03,
                    duration: 0.6,
                    ease: 'back.out(1.5)',
                }
            );
        }

        // Text Content Animation
        const paragraphs = gsap.utils.toArray<HTMLElement>('.about-paragraph');
        if (paragraphs.length > 0) {
            gsap.fromTo(paragraphs,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    scrollTrigger: {
                        trigger: '.about-content',
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.set(paragraphs, { opacity: 1 }),
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );
        }

        // Stats Animation
        const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');
        if (statCards.length > 0) {
            gsap.fromTo(statCards,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 50,
                    rotationY: 45,
                },
                {
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 80%',
                        end: 'top 40%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.set(statCards, { opacity: 1 }),
                    },
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                }
            );
        }

        // Skills Animation
        const skillBadges = gsap.utils.toArray<HTMLElement>('.skill-badge');
        if (skillBadges.length > 0) {
            gsap.fromTo(skillBadges,
                {
                    opacity: 0,
                    scale: 0,
                },
                {
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.set(skillBadges, { opacity: 1 }),
                    },
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'back.out(2)',
                }
            );
        }

        // Hobbies Animation
        const hobbies = gsap.utils.toArray<HTMLElement>('.hobby-item');
        if (hobbies.length > 0) {
            gsap.fromTo(hobbies,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    scrollTrigger: {
                        trigger: '.hobby-item',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.set(hobbies, { opacity: 1 }),
                    },
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                }
            );
        }

        // Profile Image 3D Tilt Animation
        const profileCard = containerRef.current.querySelector('.profile-card');
        if (profileCard) {
            gsap.fromTo(profileCard,
                {
                    opacity: 0,
                    scale: 0.9,
                    rotationY: 30,
                },
                {
                    scrollTrigger: {
                        trigger: profileCard,
                        start: 'top 80%',
                        end: 'top 40%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => gsap.set(profileCard, { opacity: 1 }),
                    },
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                }
            );
        }

        // Immediate visibility timeout fallback
        setTimeout(() => {
            gsap.set(['.about-paragraph', '.stat-card', '.skill-badge', '.hobby-item', '.profile-card'], { 
                opacity: 1,
                clearProps: 'transform'
            });
        }, 100);

    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[85vw] mx-auto relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 md:mb-24">
                    <Parallax speed={-0.03}>
                        <div className="mb-6">
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
                                Get To Know
                            </span>
                        </div>
                        <h2 
                            ref={titleRef}
                            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none"
                            style={{ perspective: '1000px' }}
                        >
                            About Me
                        </h2>
                    </Parallax>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 md:gap-16 lg:gap-20 items-start mb-20 md:mb-32">
                    {/* Left: Text Content */}
                    <div className="about-content space-y-8">
                        <Parallax speed={0.02}>
                            <div className="about-paragraph space-y-6">
                                <p className="text-lg md:text-xl lg:text-2xl opacity-80 leading-relaxed font-light">
                                    Hi! I&apos;m <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Bondan Banuaji</span>, also known as <span className="font-semibold">Boba</span>
                                </p>
                                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                                    I&apos;m an <span className="text-white/90 font-medium">Informatics Engineering student</span> from Karawang, Indonesia, 
                                    passionate about experimenting with anything tech-related. From building modern web applications 
                                    to tinkering with AI and creating immersive digital experiences.
                                </p>
                            </div>

                            <div className="about-paragraph space-y-6 pt-6">
                                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                                    My philosophy is simple: <span className="italic text-white/90">&ldquo;never stop learning&rdquo;</span>. 
                                    I&apos;m constantly exploring new technologies, pushing boundaries with creative development, 
                                    and building projects that solve real-world problems.
                                </p>
                                <p className="text-base md:text-lg opacity-70 leading-relaxed">
                                    When I&apos;m not coding, you&apos;ll find me contributing to open-source projects, 
                                    learning new frameworks, or experimenting with AI and 3D web experiences.
                                </p>
                            </div>
                        </Parallax>

                        {/* Hobbies */}
                        <Parallax speed={0.03}>
                            <div className="pt-8">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white/90">Hobbies</h3>
                                <div className="flex flex-wrap gap-3">
                                    {hobbies.map((hobby, index) => (
                                        <div
                                            key={index}
                                            className="hobby-item px-4 py-2 md:px-5 md:py-3 border border-white/20 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-default"
                                        >
                                            <span className="text-lg md:text-xl">{hobby.emoji}</span>
                                            <span className="text-sm md:text-base font-medium">{hobby.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Parallax>
                    </div>

                    {/* Right: Profile Image */}
                    <Parallax speed={0.05}>
                        <div className="profile-card relative group h-full">
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/30 transition-all duration-500 h-full">
                                
                                {/* Profile Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src="https://avatars.githubusercontent.com/bondanbanuaji" 
                                    alt="Bondan Banuaji"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                                {/* Decorative Elements */}
                                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full blur-sm opacity-50"></div>
                                <div className="absolute bottom-4 left-4 w-32 h-32 border-2 border-white/20 rounded-full blur-sm opacity-50"></div>
                            </div>
                        </div>
                    </Parallax>
                </div>

                {/* Stats Grid */}
                <Parallax speed={0.03}>
                    <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card p-6 md:p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-white/30 hover:scale-105 transition-all duration-300 text-center group"
                            >
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base font-medium opacity-80">{stat.label}</div>
                                <div className="text-xs opacity-50">{stat.sublabel}</div>
                            </div>
                        ))}
                    </div>
                </Parallax>

                {/* Skills Section */}
                <Parallax speed={0.02}>
                    <div className="skills-container">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
                            Tech Stack & Tools
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="skill-badge px-4 py-2 md:px-6 md:py-3 border border-white/20 rounded-full text-sm md:text-base bg-white/5 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </Parallax>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
