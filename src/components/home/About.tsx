'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10">
            <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
                <div className="about-content order-2 md:order-1">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-10 tracking-tight">About Me</h2>
                    <div className="text-base md:text-lg lg:text-2xl opacity-80 space-y-6 lg:space-y-8 leading-relaxed font-light">
                        <p>
                            I'm a creative technologist with a passion for building immersive digital experiences.
                            My journey began with a curiosity for how things work, which evolved into a career
                            bridging the gap between design and engineering.
                        </p>
                        <p>
                            With over 5 years of experience, I specialize in creating high-performance websites
                            and applications that not only look beautiful but also solve real-world problems.
                            I believe in the power of code to tell stories and evoke emotions.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-12 lg:mt-16 flex flex-wrap gap-3 md:gap-4">
                        {['Problem Solver', 'Detail Oriented', 'Collaborative', 'Continuous Learner'].map((trait) => (
                            <span key={trait} className="px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 border border-white/10 rounded-full text-xs md:text-sm lg:text-base bg-white/5">
                                {trait}
                            </span>
                        ))}
                    </div>

                    <div className="mt-10 md:mt-12 lg:mt-16">
                        <MagneticButton strength={0.2}>
                            <a href="/resume.pdf" className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors inline-block text-sm md:text-base lg:text-lg">
                                Download Resume
                            </a>
                        </MagneticButton>
                    </div>
                </div>

                <div className="about-content order-1 md:order-2 relative h-[300px] md:h-[500px] lg:h-[700px] bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                    {/* Placeholder for profile image or 3D avatar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                    <span className="text-white/20 text-xl md:text-2xl lg:text-4xl font-bold uppercase tracking-widest">Profile Visual</span>
                </div>
            </div>
        </section>
    );
}
