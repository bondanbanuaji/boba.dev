'use client';

import { usePathname } from 'next/navigation';
import Hero3D from './Hero3D';
import WorkCarousel from './WorkCarousel';
import About3D from './About3D';
import Services3D from './Services3D';
import Contact3D from './Contact3D';

export default function ThreeContent() {
    const pathname = usePathname();

    return (
        <>
            {pathname === '/' && <Hero3D />}
            {pathname === '/work' && <WorkCarousel />}
            {pathname === '/about' && <About3D />}
            {pathname === '/services' && <Services3D />}
            {pathname === '/contact' && <Contact3D />}
            {/* Add other page 3D components here */}
        </>
    );
}
