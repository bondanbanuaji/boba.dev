'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import Parallax from '@/components/ui/Parallax';

import { useLenis } from '@/components/layout/SmoothScroll';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const lenis = useLenis();

    const handleScrollTop = () => {
        lenis?.scrollTo(0);
    };

    return (
        <footer className="w-full bg-white/90 backdrop-blur-sm text-black relative z-10">
            {/* Go Top Indicator */}
            <div
                onClick={handleScrollTop}
                className="absolute top-0 right-6 md:right-20 -translate-y-1/2 cursor-pointer group z-20 flex flex-col items-center gap-4 mix-blend-difference"
            >
                <div className="relative w-[1px] h-32 md:h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-white animate-scrollY"></div>
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase rotate-90 origin-center translate-y-2 text-white group-hover:opacity-70 transition-opacity">
                    Top
                </span>
            </div>

            <Parallax speed={0.3} className="w-full px-6 md:max-w-[80vw] lg:max-w-[70vw] mx-auto py-12 md:py-20">
                    <div className="flex flex-col mt-10 md:flex-row justify-between gap-12 md:gap-8 mb-16 md:mb-24">
                        {/* Left Side: Brand & Socials */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <Link href='/' className='block mb-6'>
                                    <Image
                                        src='/img/Logo/boba-light-logo-removebg-preview.png'
                                        alt='Logo'
                                        width={100}
                                        height={100}
                                        className='w-20 h-auto md:w-36'
                                        priority
                                    />
                                </Link>
                                <div className="flex gap-4">
                                    <a href="#" className="size-[28px] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                                        <FontAwesomeIcon icon={faTwitter} className="text-2xl transition-transform" />
                                    </a>
                                    <a href="#" className="size-[28px] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                                        <FontAwesomeIcon icon={faInstagram} className="text-2xl transition-transform" />
                                    </a>
                                    <a href="#" className="size-[28px] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                                        <FontAwesomeIcon icon={faLinkedin} className="text-2xl transition-transform" />
                                    </a>
                                    <a href="#" className="size-[28px] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                                        <FontAwesomeIcon icon={faGithub} className="text-2xl transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Sitemap */}
                        <div className="md:text-right">
                            <ul className="space-y-4 flex flex-col md:items-end">
                                {['Home', 'About', 'Work', 'Services', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                            className="text-xl md:text-lg font-medium text-black uppercase hover:text-black/60 transition-colors inline-block tracking-tight"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-start items-start pt-8 text-[8px] text-black/50 tracking-widest gap-4 md:gap-0 uppercase">
                        <p>&copy; {currentYear} Boba.dev. All Rights Reserved.</p>
                    </div>
                </Parallax>
        </footer>
    );
}
