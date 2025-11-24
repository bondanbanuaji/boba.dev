'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isInverse, setIsInverse] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const mouse = { x: 0, y: 0 };
        const cursorPos = { x: 0, y: 0 };
        const followerPos = { x: 0, y: 0 };
        let animationId: number;
        let hoveringElement: HTMLElement | null = null;

        const updateMousePosition = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            const elementAtPoint = document.elementFromPoint(mouse.x, mouse.y) as HTMLElement;
            const hoverSelectors = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'SPAN'];

            let target = elementAtPoint;
            let isHoverable = false;
            let isInverseZone = false;

            while (target && target !== document.body) {
                if (
                    hoverSelectors.includes(target.tagName) ||
                    (target.hasAttribute('role') && target.getAttribute('role') === 'button') ||
                    target.classList.contains('hoverable')
                ) {
                    isHoverable = true;
                }

                if (target.getAttribute('data-cursor-inverse') === 'true') {
                    isInverseZone = true;
                }

                if (isHoverable && isInverseZone) break; // Optimization: stop if both found

                target = target.parentElement as HTMLElement;
            }

            if (isHoverable && target !== hoveringElement) {
                hoveringElement = target;
                setIsHovering(true);
            } else if (!isHoverable && hoveringElement) {
                hoveringElement = null;
                setIsHovering(false);
            }

            setIsInverse(isInverseZone);
        };

        const animate = () => {
            cursorPos.x = mouse.x;
            cursorPos.y = mouse.y;

            followerPos.x += (cursorPos.x - followerPos.x) * 0.1;
            followerPos.y += (cursorPos.y - followerPos.y) * 0.15;

            cursor.style.transform = `translate3d(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%), 0)`;

            follower.style.transform = `translate3d(calc(${followerPos.x}px - 50%), calc(${followerPos.y}px - 50%), 0)`;

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', updateMousePosition, false);

        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-3 h-3 rounded-full transition-all duration-300 ease-out ${isInverse
                    ? 'bg-black mix-blend-normal'
                    : 'bg-white mix-blend-difference'
                    } ${isHovering ? 'w-5 h-5 border-0' : 'w-3 h-3'}`}
            />
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out ${isInverse
                    ? 'border-black mix-blend-normal'
                    : 'border-white mix-blend-difference'
                    } ${isHovering
                        ? `w-2 h-2 ${isInverse ? 'bg-black' : 'bg-white'}`
                        : 'w-20 h-20'
                    }`}
            />
        </div>
    );
}