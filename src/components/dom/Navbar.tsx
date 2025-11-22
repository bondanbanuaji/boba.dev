'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
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

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.nav-link', { y: -20, opacity: 0 });
            gsap.to('.nav-link', {
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

    return (
        <nav
            ref={navRef}
            className='fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white'
        >
            <div className='text-xl font-bold tracking-tighter'>
                <Link href='/'>&lt;Boba.dev /&gt;</Link>
            </div>
            <div className='hidden md:flex gap-8'>
                {navLinks.map((link) => (
                    <MagneticButton key={link.name} strength={0.2} className="inline-block">
                        <Link
                            href={link.href}
                            className='nav-link text-white text-sm uppercase tracking-widest hover:opacity-70 transition-opacity px-4 py-2 block'
                        >
                            {link.name}
                        </Link>
                    </MagneticButton>
                ))}
            </div>
            {/* Mobile Menu Toggle (Placeholder) */}
            <div className='md:hidden'>
                <button className='text-sm uppercase'>Menu</button>
            </div>
        </nav>
    );
}
