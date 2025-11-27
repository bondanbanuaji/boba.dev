'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/ui/SplitText';
import Parallax from '@/components/ui/Parallax';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import About3D from '@/components/canvas/About3D';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

// Skills data
const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'WebGL'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Supabase', 'Firebase'],
    devOps: ['Git', 'Docker', 'Vercel', 'AWS'],
    designTools: ['Figma', 'Blender'],
    testing: ['Jest']
};

// Counter component for animated numbers
function Counter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const counter = { value: 0 };
        gsap.to(counter, {
            value,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                once: true
            },
            onUpdate: () => setCount(Math.floor(counter.value))
        });
    }, { scope: ref });

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('about');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Setup GSAP animations
    useGSAP(() => {
        // Profile section animations
        gsap.from('.profile-text', {
            scrollTrigger: {
                trigger: '.profile-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Marquee animation
        if (marqueeRef.current) {
            const wrapper = marqueeRef.current.querySelector('.flex') as HTMLElement;
            const content = marqueeRef.current.querySelector('.marquee-content') as HTMLElement;

            if (content && wrapper) {
                const clone1 = content.cloneNode(true);
                const clone2 = content.cloneNode(true);
                wrapper.appendChild(clone1);
                wrapper.appendChild(clone2);

                const contentWidth = content.offsetWidth;

                gsap.to(wrapper.children, {
                    x: -contentWidth,
                    repeat: -1,
                    duration: 40,
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

        // Skills categories animation
        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 75%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Timeline animations
        const timelineItems = gsap.utils.toArray<HTMLElement>('.timeline-item');
        timelineItems.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Values cards animation
        gsap.from('.value-card', {
            scrollTrigger: {
                trigger: '.values-section',
                start: 'top 70%'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)'
        });

        // Stats animation
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 70%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });

    }, { scope: containerRef });

    // Get translated experience data
    const experience = [
        {
            role: t('page.experience.senior.role'),
            company: t('page.experience.senior.company'),
            period: t('page.experience.senior.period'),
            description: t('page.experience.senior.description', { returnObjects: true }) as string[]
        },
        {
            role: t('page.experience.mid.role'),
            company: t('page.experience.mid.company'),
            period: t('page.experience.mid.period'),
            description: t('page.experience.mid.description', { returnObjects: true }) as string[]
        },
        {
            role: t('page.experience.junior.role'),
            company: t('page.experience.junior.company'),
            period: t('page.experience.junior.period'),
            description: t('page.experience.junior.description', { returnObjects: true }) as string[]
        }
    ];

    // Get translated values data
    const values = [
        {
            title: t('page.values.problemSolver.title'),
            description: t('page.values.problemSolver.description'),
            icon: '🎯'
        },
        {
            title: t('page.values.detailOriented.title'),
            description: t('page.values.detailOriented.description'),
            icon: '🔍'
        },
        {
            title: t('page.values.continuousLearner.title'),
            description: t('page.values.continuousLearner.description'),
            icon: '📚'
        },
        {
            title: t('page.values.collaborative.title'),
            description: t('page.values.collaborative.description'),
            icon: '🤝'
        }
    ];

    // Get translated stats data
    const stats = [
        { value: parseInt(t('page.statsData.experience.value')), label: t('page.statsData.experience.label'), suffix: t('page.statsData.experience.suffix') },
        { value: parseInt(t('page.statsData.projects.value')), label: t('page.statsData.projects.label'), suffix: t('page.statsData.projects.suffix') },
        { value: parseInt(t('page.statsData.technologies.value')), label: t('page.statsData.technologies.label'), suffix: t('page.statsData.technologies.suffix') },
        { value: parseInt(t('page.statsData.satisfaction.value')), label: t('page.statsData.satisfaction.label'), suffix: t('page.statsData.satisfaction.suffix') }
    ];

    // Get translated traits
    const traits = [
        t('page.traits.creative'),
        t('page.traits.innovative'),
        t('page.traits.detailOriented'),
        t('page.traits.teamPlayer')
    ];

    return (
        <div ref={containerRef} className="min-h-screen w-full">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />

                <Parallax speed={0.1} className="text-center z-10">
                    <div className="mb-6 md:mb-8">
                        <SplitText
                            text={isMounted ? t('page.heroTitle') : 'About Me'}
                            tag="h1"
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
                            splitType="chars"
                            delay={50}
                            duration={0.8}
                        />
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl opacity-70 max-w-2xl mx-auto font-light">
                        {isMounted ? t('page.heroSubtitle') : 'Creative technologist passionate about building immersive digital experiences'}
                    </p>
                </Parallax>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest opacity-50">{isMounted ? t('page.scroll') : 'Scroll'}</span>
                    <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                        <div className="w-full h-full bg-white/60 animate-scrollY" />
                    </div>
                </div>
            </section>

            {/* Profile Section */}
            <section className="profile-section py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
                <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* 3D Visual */}
                    <Parallax speed={0.15} className="order-1 lg:order-1">
                        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10">
                            <Canvas
                                camera={{ position: [0, 0, 3], fov: 50 }}
                                className="w-full h-full"
                            >
                                <About3D />
                            </Canvas>
                        </div>
                    </Parallax>

                    {/* Profile Content */}
                    <div className="order-2 lg:order-2">
                        <Parallax speed={0.05}>
                            <h2 className="profile-text text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
                                {isMounted ? t('page.profileTitle') : "Hi, I'm Bondan Banuaji"}
                            </h2>
                            <div className="profile-text text-base md:text-lg lg:text-xl opacity-80 space-y-4 md:space-y-6 leading-relaxed font-light">
                                <p>
                                    {isMounted ? t('page.profileIntro') : "I'm a creative technologist with a passion for building immersive digital experiences. My journey began with a curiosity for how things work, which evolved into a career bridging the gap between design and engineering."}
                                </p>
                                <p>
                                    {isMounted ? t('page.profileDescription') : "With over 5 years of experience, I specialize in creating high-performance websites and applications that not only look beautiful but also solve real-world problems. I believe in the power of code to tell stories and evoke emotions."}
                                </p>
                            </div>

                            <div className="profile-text mt-8 md:mt-10 flex flex-wrap gap-3">
                                {traits.map((trait) => (
                                    <span
                                        key={trait}
                                        className="px-4 py-2 md:px-5 md:py-2.5 border border-white/10 rounded-full text-xs md:text-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
                                    >
                                        {trait}
                                    </span>
                                ))}
                            </div>

                            <div className="profile-text mt-10 md:mt-12">
                                <MagneticButton strength={0.3}>
                                    <a
                                        href="/resume.pdf"
                                        className="inline-block px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm md:text-base"
                                    >
                                        {isMounted ? t('page.downloadResume') : 'Download Resume'}
                                    </a>
                                </MagneticButton>
                            </div>
                        </Parallax>
                    </div>
                </div>
            </section>

            {/* Skills Marquee */}
            <section className="py-12 md:py-16 lg:py-20 overflow-hidden">
                <div className="mb-8 md:mb-12 text-center px-4">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4">
                        {isMounted ? t('page.skillsTitle') : 'Skills & Technologies'}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl opacity-60 font-light">
                        {isMounted ? t('page.skillsSubtitle') : 'The tools I use to bring ideas to life'}
                    </p>
                </div>

                {/* Infinite Marquee */}
                <div className="w-full bg-white/5 py-8 md:py-10 lg:py-12 mb-12 md:mb-16 overflow-hidden border-y border-white/10" ref={marqueeRef}>
                    <div className="flex whitespace-nowrap">
                        <div className="marquee-content flex gap-8 md:gap-12 lg:gap-16 items-center shrink-0">
                            {[...skills.frontend, ...skills.backend, ...skills.devOps, ...skills.designTools, ...skills.testing].map((skill, i) => (
                                <span
                                    key={i}
                                    className="text-2xl md:text-4xl lg:text-6xl font-bold opacity-30 whitespace-nowrap hover:opacity-100 transition-opacity duration-500 cursor-default px-4 md:px-6"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="skills-grid max-w-[90vw] lg:max-w-[80vw] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {Object.entries(skills).map(([category, items], index) => (
                        <Parallax key={category} speed={index % 2 === 0 ? 0.05 : 0.1} className="skill-category">
                            <div className="glass rounded-2xl p-6 md:p-8 h-full hover:bg-white/10 transition-all duration-300">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider mb-4 md:mb-6 pb-3 border-b border-white/20">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-lg text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Parallax>
                    ))}
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
                <div className="max-w-[90vw] lg:max-w-[70vw] mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 lg:mb-28 text-center tracking-tight">
                        {isMounted ? t('page.experienceTitle') : 'Experience'}
                    </h2>

                    <div className="relative border-l-2 border-white/20 ml-2 md:ml-0 space-y-12 md:space-y-16 lg:space-y-20">
                        {experience.map((job, index) => (
                            <Parallax key={index} speed={0.05} className="timeline-item relative pl-8 md:pl-16 lg:pl-24">
                                {/* Timeline Dot */}
                                <div className="absolute left-[-9px] top-2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)]" />

                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 md:mb-4 gap-2">
                                    <h3 className="text-xl md:text-2xl lg:text-4xl font-bold">{job.role}</h3>
                                    <span className="text-sm md:text-base lg:text-lg opacity-60 font-mono">{job.period}</span>
                                </div>

                                <div className="text-lg md:text-xl lg:text-2xl text-purple-400 mb-4 md:mb-6 font-medium">
                                    {job.company}
                                </div>

                                <ul className="space-y-2 md:space-y-3 opacity-80 list-disc ml-4 text-sm md:text-base lg:text-lg font-light">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="pl-2">{desc}</li>
                                    ))}
                                </ul>
                            </Parallax>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values & Philosophy */}
            <section className="values-section py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
                <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 text-center tracking-tight">
                        {isMounted ? t('page.valuesTitle') : 'Core Values'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                        {values.map((value, index) => (
                            <Parallax key={index} speed={index % 2 === 0 ? 0.05 : 0.08} className="value-card">
                                <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 h-full hover:bg-white/10 transition-all duration-300 border border-white/10">
                                    <div className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm md:text-base lg:text-lg opacity-70 font-light leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </Parallax>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
                <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 md:mb-20 text-center tracking-tight">
                        {isMounted ? t('page.statsTitle') : 'By The Numbers'}
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <Parallax key={index} speed={0.05} className="stat-card">
                                <div className="glass rounded-2xl p-6 md:p-8 lg:p-10 text-center hover:bg-white/10 transition-all duration-300 border border-white/10">
                                    <div className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        <Counter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs md:text-sm lg:text-base opacity-70 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            </Parallax>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none" />

                <div className="max-w-[90vw] lg:max-w-[70vw] mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-10 tracking-tight">
                        {isMounted ? t('page.ctaTitle') : "Let's Build Something Amazing"}
                    </h2>
                    <p className="text-base md:text-lg lg:text-2xl opacity-70 mb-10 md:mb-14 font-light max-w-2xl mx-auto">
                        {isMounted ? t('page.ctaSubtitle') : "I'm always excited to collaborate on new projects and innovative ideas."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                        <MagneticButton strength={0.3}>
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm md:text-base"
                            >
                                {isMounted ? t('page.ctaButtons.contact') : 'Get In Touch'}
                            </Link>
                        </MagneticButton>

                        <MagneticButton strength={0.3}>
                            <Link
                                href="/work"
                                className="inline-block px-8 py-4 md:px-10 md:py-5 glass rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-sm md:text-base border border-white/20"
                            >
                                {isMounted ? t('page.ctaButtons.work') : 'View My Work'}
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
