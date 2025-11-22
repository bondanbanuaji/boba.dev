'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Contact3D() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        }
    });

    return (
        <group position={[2, 0, 0]}>
            <Icosahedron ref={meshRef} args={[1.5, 0]}>
                <MeshDistortMaterial
                    color='#f472b6'
                    attach='material'
                    distort={0.6}
                    speed={3}
                    roughness={0}
                    metalness={1}
                />
            </Icosahedron>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
        </group>
    );
}
