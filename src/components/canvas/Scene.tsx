'use client';

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';
import { Suspense, type ReactNode, useState, useEffect } from 'react';
import ThreeContent from './ThreeContent';

interface SceneProps extends Omit<CanvasProps, 'children'> {
    children?: ReactNode;
}

export default function Scene({ children, ...props }: SceneProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className='fixed top-0 left-0 w-full h-full -z-10 pointer-events-none' />
        );
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full -z-10 pointer-events-none'>
            <Canvas
                {...props}
                eventSource={document.body}
                className="pointer-events-none"
            >
                <Suspense fallback={null}>
                    <ThreeContent />
                    {children}
                    <Preload all />
                </Suspense>
                <View.Port />
            </Canvas>
        </div>
    );
}
