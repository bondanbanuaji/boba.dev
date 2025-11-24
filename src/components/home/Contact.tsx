'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import Parallax from '@/components/ui/Parallax';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.contact-title', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="contact" ref={containerRef} className="py-20 md:py-32 lg:py-40 px-4 md:px-6 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="max-w-[90vw] mx-auto text-center">
                <Parallax speed={-0.1}>
                    <h2 className="contact-title text-[12vw] leading-[0.8] font-bold tracking-tighter mb-8 md:mb-12 lg:mb-16 mix-blend-difference">
                        Let&apos;s Work<br />Together
                    </h2>
                </Parallax>

                <Parallax speed={0.1} className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center mb-16 md:mb-20 lg:mb-32">
                    <MagneticButton strength={0.3}>
                        <Link
                            href="https://wa.me/628978601538"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors text-sm md:text-base lg:text-xl flex items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 md:w-6 md:h-6 text-2xl" />
                            Contact Me
                        </Link>
                    </MagneticButton>
                </Parallax>
            </div>
        </section>
    );
}
