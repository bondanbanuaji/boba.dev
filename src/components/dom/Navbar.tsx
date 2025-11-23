'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Initial Load Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.nav-link-desktop', { y: -20, opacity: 0 });
            gsap.to('.nav-link-desktop', {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.5,
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Mobile Menu Animation
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(150% at 100% 0%)',
                duration: 1,
                ease: 'power4.inOut',
            });

            gsap.fromTo(
                '.mobile-nav-link',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            gsap.to(mobileMenuRef.current, {
                clipPath: 'circle(0% at 100% 0%)',
                duration: 0.8,
                ease: 'power4.inOut',
            });
        }
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className='fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white'
            >
                <div className='relative z-[60] md:left-5 md:top-1'>
                    <Link href='/' className='block'>
                        <Image 
                            src='/img/Logo/boba-dark-logo-removebg-preview.png' 
                            alt='Logo' 
                            width={100} 
                            height={100}
                            className='w-16 h-auto sm:w-20 md:w-24 lg:w-28'
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex gap-8'>
                    {navLinks.map((link) => (
                        <MagneticButton key={link.name} strength={0.2} className="inline-block">
                            <Link
                                href={link.href}
                                className='nav-link-desktop text-white text-sm uppercase tracking-widest hover:opacity-70 transition-opacity px-4 py-2 block'
                            >
                                {link.name}
                            </Link>
                        </MagneticButton>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className='md:hidden relative z-[60]'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-sm uppercase tracking-widest hover:opacity-70 transition-opacity'
                    >
                        {isOpen ? 'Close' : 'Menu'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={mobileMenuRef}
                className='fixed inset-0 bg-white z-40 flex flex-col justify-center items-center md:hidden'
                style={{ clipPath: 'circle(0% at 100% 0%)' }}
            >
                <div className='flex flex-col gap-6 items-center'>
                    {navLinks.map((link) => (
                        <div key={link.name} className='overflow-hidden'>
                            <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className='mobile-nav-link relative block text-black text-5xl font-bold tracking-tighter after:content-[""] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-[4px] after:bg-black after:transition-all after:duration-500 hover:after:w-full'
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
