'use client';

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense, type ReactNode } from 'react';
import ThreeContent from './ThreeContent';

interface SceneProps extends Omit<CanvasProps, 'children'> {
    children?: ReactNode;
}

export default function Scene({ children, ...props }: SceneProps) {
    return (
        <div className='fixed top-0 left-0 w-full h-full -z-10 pointer-events-none'>
            <Canvas {...props}>
                <Suspense fallback={null}>
                    <ThreeContent />
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
