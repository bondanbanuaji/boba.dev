'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';

function CarouselItem({ index, position, url }: { index: number; position: [number, number, number]; url: string }) {
    const ref = useRef<THREE.Group>(null);
    const scroll = useScroll();
    const [hovered, hover] = useState(false);

    useFrame((state, delta) => {
        if (ref.current) {
            const y = scroll.range(index * 0.25, 1 / 4);
            ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, position[1] + y * 2, 4, delta);
            ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, hovered ? 1.2 : 1, 4, delta);
            ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, hovered ? 1.2 : 1, 4, delta);
        }
    });

    return (
        <group ref={ref} position={position}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                url={url}
                scale={[4, 2.5]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                transparent
                opacity={0.8}
            />
            <Text position={[0, -1.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
                Project {index + 1}
            </Text>
        </group>
    );
}

export default function WorkCarousel() {
    return (
        <ScrollControls pages={2} damping={0.3}>
            <group position={[0, 0, 0]}>
                <CarouselItem index={0} position={[0, 2, 0]} url="/img/project/img1.jpg" />
                <CarouselItem index={1} position={[0, -1, 0]} url="/img/project/img2.jpg" />
                <CarouselItem index={2} position={[0, -4, 0]} url="/img/project/img3.jpg" />
                <CarouselItem index={3} position={[0, -7, 0]} url="/img/project/img4.jpg" />
            </group>
        </ScrollControls>
    );
}
