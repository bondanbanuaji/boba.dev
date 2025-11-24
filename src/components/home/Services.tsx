'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Parallax from '@/components/ui/Parallax';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: '01',
        title: 'Web Development',
        description: 'Crafting high-performance, scalable web applications with cutting-edge technologies. From responsive websites to complex web platforms, delivering seamless user experiences.',
        skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'TailwindCSS'],
        gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        number: '02',
        title: 'Creative Development',
        description: 'Pushing boundaries with immersive 3D experiences and interactive animations. Bringing designs to life with WebGL, Three.js, and advanced motion graphics.',
        skills: ['Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Canvas API'],
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        number: '03',
        title: 'UI/UX Design',
        description: 'Designing intuitive, user-centered interfaces that blend aesthetics with functionality. Creating memorable digital experiences that users love.',
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'Accessibility'],
        gradient: 'from-orange-500/20 to-yellow-500/20'
    },
    {
        number: '04',
        title: 'Full-Stack Development',
        description: 'Building end-to-end solutions with modern backend architectures and databases. Seamlessly integrating frontend and backend for robust applications.',
        skills: ['REST API', 'GraphQL', 'PostgreSQL', 'MongoDB', 'AWS'],
        gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
        number: '05',
        title: 'Performance Optimization',
        description: 'Optimizing web performance for lightning-fast load times and smooth interactions. Implementing best practices for SEO, Core Web Vitals, and accessibility.',
        skills: ['Lighthouse', 'Webpack', 'Code Splitting', 'Lazy Loading', 'CDN'],
        gradient: 'from-red-500/20 to-rose-500/20'
    },
    {
        number: '06',
        title: 'Technical Consulting',
        description: 'Providing strategic technical guidance for digital transformation. Architecture planning, technology stack selection, and scalability solutions.',
        skills: ['System Design', 'Code Review', 'Tech Strategy', 'DevOps', 'CI/CD'],
        gradient: 'from-indigo-500/20 to-violet-500/20'
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Animated Title with Split Text Effect
        const titleChars = titleRef.current?.textContent?.split('') || [];
        if (titleRef.current) {
            titleRef.current.innerHTML = titleChars
                .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
                .join('');
        }

        gsap.from(titleRef.current?.children || [], {
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 100,
            rotationX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: 'back.out(1.7)',
        });

        // 3D Card Entrance Animation
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                end: 'top 25%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
            z: -100,
            duration: 1,
            stagger: {
                amount: 0.6,
                from: 'start',
            },
            ease: 'power3.out',
        });

        // Subtle Parallax Effect for Cards (reduced to prevent overlap)
        gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
            const isEven = index % 2 === 0;
            
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: isEven ? 20 : -20,
                ease: 'none',
            });
        });

        // Number Animation
        gsap.from('.service-number', {
            scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                end: 'top 25%',
                toggleActions: 'play none none reverse',
            },
            scale: 0,
            rotation: 360,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
        });

        // Skills Tag Animation
        gsap.from('.skill-tag', {
            scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            x: -20,
            duration: 0.6,
            stagger: {
                amount: 0.8,
                from: 'start',
            },
            ease: 'power2.out',
        });

    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef} 
            className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[90vw] lg:max-w-[85vw] mx-auto relative">
                {/* Header */}
                <div className="mb-16 md:mb-24 lg:mb-32">
                    <Parallax speed={-0.05}>
                        <div className="text-center mb-6 md:mb-8">
                            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
                                What I Offer
                            </span>
                        </div>
                        <h2 
                            ref={titleRef}
                            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-6 md:mb-8 tracking-tighter leading-none"
                            style={{ perspective: '1000px' }}
                        >
                            Services
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl opacity-60 max-w-3xl mx-auto text-center font-light leading-relaxed">
                            Transforming ideas into exceptional digital experiences with precision, creativity, and technical excellence.
                        </p>
                    </Parallax>
                </div>

                {/* Services Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="relative"
                            style={{ minHeight: '420px' }}
                        >
                            <div
                                className="service-card group relative p-6 md:p-8 pt-10 md:pt-12 border border-white/10 rounded-3xl 
                                bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm
                                hover:border-white/30 hover:shadow-2xl hover:shadow-white/10
                                transition-all duration-500 cursor-default flex flex-col h-full min-h-[420px]
                                hover:scale-[1.02] overflow-hidden"
                            >
                                {/* Gradient Overlay */}
                                <div 
                                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`}
                                ></div>

                                {/* Number Badge */}
                                <div className="absolute top-4 right-4 service-number z-20">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md 
                                    border border-white/20 flex items-center justify-center
                                    group-hover:bg-white group-hover:text-black transition-all duration-500
                                    group-hover:scale-110">
                                        <span className="text-lg md:text-xl font-bold">{service.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-6 flex-grow pr-16">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 
                                    group-hover:text-transparent group-hover:bg-clip-text 
                                    group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400
                                    transition-all duration-500 leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm md:text-base opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Skills Tags */}
                                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                                    {service.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="skill-tag text-xs px-2.5 py-1 rounded-full 
                                            bg-white/5 border border-white/10 
                                            group-hover:bg-white/10 group-hover:border-white/30
                                            transition-all duration-300 whitespace-nowrap"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <Parallax speed={0.05}>
                    <div className="mt-20 md:mt-32 text-center">
                        <p className="text-lg md:text-xl opacity-60 mb-6">
                            Ready to bring your vision to life?
                        </p>
                    </div>
                </Parallax>
            </div>
        </section>
    );
}
