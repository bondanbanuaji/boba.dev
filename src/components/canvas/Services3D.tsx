'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Services3D() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={[3, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    fontSize={1}
                    color="#8b5cf6"
                    position={[0, 2, 0]}
                    anchorX="center"
                    anchorY="middle"
                >
                    DESIGN
                </Text>
                <Text
                    fontSize={1}
                    color="#3b82f6"
                    position={[1, 0, 1]}
                    anchorX="center"
                    anchorY="middle"
                >
                    CODE
                </Text>
                <Text
                    fontSize={1}
                    color="#f472b6"
                    position={[-1, -2, -1]}
                    anchorX="center"
                    anchorY="middle"
                >
                    CREATE
                </Text>
            </Float>
        </group>
    );
}
