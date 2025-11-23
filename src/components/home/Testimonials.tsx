'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        quote: "One of the most talented developers I've had the pleasure of working with. Their attention to detail and ability to translate complex designs into pixel-perfect code is unmatched.",
        author: "Sarah Johnson",
        role: "Product Design Lead",
        company: "TechFlow"
    },
    {
        quote: "They didn't just build a website; they crafted an experience. The 3D elements and smooth animations completely elevated our brand perception.",
        author: "Michael Chen",
        role: "Founder",
        company: "Nexus Studios"
    },
    {
        quote: "A true problem solver. They navigated technical challenges with ease and delivered a high-performance application that exceeded our expectations.",
        author: "Emily Rodriguez",
        role: "CTO",
        company: "FinStream"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        gsap.from('.testimonial-container', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    const handleDotClick = (index: number) => {
        if (index === activeIndex) return;

        const direction = index > activeIndex ? 1 : -1;

        gsap.to('.quote-content', {
            x: -50 * direction,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setActiveIndex(index);
                gsap.fromTo('.quote-content',
                    { x: 50 * direction, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    };

    return (
        <section ref={containerRef} className="py-32 px-6 relative z-10">
            <div className="max-w-4xl mx-auto testimonial-container">
                <div className="text-center mb-16">
                    <h2 className="text-sm uppercase tracking-[0.3em] opacity-60 mb-4">Testimonials</h2>
                    <div className="w-12 h-[1px] bg-white/30 mx-auto" />
                </div>

                <div className="relative min-h-[300px] flex flex-col items-center justify-center text-center quote-content">
                    <div className="text-6xl opacity-20 font-serif absolute -top-8 left-0">"</div>
                    <p className="text-2xl md:text-4xl font-light leading-relaxed mb-8 relative z-10">
                        {testimonials[activeIndex].quote}
                    </p>
                    <div className="text-6xl opacity-20 font-serif absolute -bottom-8 right-0">"</div>

                    <div>
                        <h4 className="text-xl font-bold">{testimonials[activeIndex].author}</h4>
                        <p className="opacity-60">{testimonials[activeIndex].role} at {testimonials[activeIndex].company}</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white w-8' : 'bg-white/20 hover:bg-white/50'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
