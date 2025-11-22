'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

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

            // Check collision dengan elements
            const elementAtPoint = document.elementFromPoint(mouse.x, mouse.y) as HTMLElement;
            const hoverSelectors = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];

            // Recursive check for hoverable elements
            let target = elementAtPoint;
            let isHoverable = false;

            while (target && target !== document.body) {
                if (
                    hoverSelectors.includes(target.tagName) ||
                    (target.hasAttribute('role') && target.getAttribute('role') === 'button') ||
                    target.classList.contains('hoverable')
                ) {
                    isHoverable = true;
                    break;
                }
                target = target.parentElement as HTMLElement;
            }

            if (isHoverable && target !== hoveringElement) {
                hoveringElement = target;
                setIsHovering(true);
            } else if (!isHoverable && hoveringElement) {
                hoveringElement = null;
                setIsHovering(false);
            }
        };

        const animate = () => {
            // Cursor langsung ke mouse (no delay)
            cursorPos.x = mouse.x;
            cursorPos.y = mouse.y;

            // Follower mengikuti cursor dengan delay
            followerPos.x += (cursorPos.x - followerPos.x) * 0.1;
            followerPos.y += (cursorPos.y - followerPos.y) * 0.1;

            // Update cursor position langsung ke mouse
            cursor.style.transform = `translate3d(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%), 0)`;

            // Ring mengikuti cursor dengan delay
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
                className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference transition-all duration-300 ease-out ${isHovering ? 'w-12 h-12 bg-white border-0' : 'w-3 h-3'
                    }`}
            />
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-white mix-blend-difference transition-all duration-300 ease-out ${isHovering ? 'opacity-0' : 'opacity-100'
                    }`}
            />
        </div>
    );
}