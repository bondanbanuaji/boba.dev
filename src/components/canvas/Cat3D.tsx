'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cone, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

export default function Cat3D() {
    const headRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Group>(null);
    const rightEyeRef = useRef<THREE.Group>(null);
    const leftPupilRef = useRef<THREE.Mesh>(null);
    const rightPupilRef = useRef<THREE.Mesh>(null);

    const furMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.8 }), []);
    const stripeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c2410c', roughness: 0.8 }), []);
    const whiteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), []);
    const eyeWhiteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 }), []);
    const pupilMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.1 }), []);
    const noseMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff9999', roughness: 0.5 }), []);
    const earInnerMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffedd5', roughness: 0.9 }), []);
    const whiskerMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#000000' }), []);

    useFrame((state) => {
        if (!headRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

        const t = state.clock.getElapsedTime();
        const mouse = state.pointer;

        headRef.current.position.y = Math.sin(t * 1.5) * 0.1;
        headRef.current.rotation.z = Math.sin(t * 1) * 0.05;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouse.x * 0.5, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouse.y * 0.3, 0.1);

        const lookAtTarget = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 5);

        if (leftEyeRef.current) {
            leftEyeRef.current.lookAt(lookAtTarget);
        }
        if (rightEyeRef.current) {
            rightEyeRef.current.lookAt(lookAtTarget);
        }
    });

    return (
        <group position={[0, 0, 0]} scale={1.5}>
            <group ref={headRef}>
                <Sphere args={[1, 24, 24]} material={furMaterial} />

                <group position={[0, -0.4, 0.85]}>
                    <Sphere args={[0.35, 24, 24]} position={[-0.2, 0, 0]} material={whiteMaterial} />
                    <Sphere args={[0.35, 24, 24]} position={[0.2, 0, 0]} material={whiteMaterial} />
                    <Sphere args={[0.3, 24, 24]} position={[0, -0.15, 0]} material={whiteMaterial} />
                </group>

                <group position={[0, 0.85, 0.8]} rotation={[0.5, 0, 0]}>
                    <Box args={[0.08, 0.4, 0.02]} position={[0, 0, 0]} material={stripeMaterial} />
                    <Box args={[0.08, 0.3, 0.02]} position={[-0.2, -0.05, -0.05]} rotation={[0, 0, 0.2]} material={stripeMaterial} />
                    <Box args={[0.08, 0.3, 0.02]} position={[0.2, -0.05, -0.05]} rotation={[0, 0, -0.2]} material={stripeMaterial} />
                </group>

                <group position={[-0.6, 0.8, 0]} rotation={[0, 0, 0.5]}>
                    <Cone args={[0.4, 0.8, 24]} material={furMaterial} />
                    <Cone args={[0.3, 0.6, 24]} position={[0, -0.1, 0.1]} material={earInnerMaterial} />
                </group>
                <group position={[0.6, 0.8, 0]} rotation={[0, 0, -0.5]}>
                    <Cone args={[0.4, 0.8, 24]} material={furMaterial} />
                    <Cone args={[0.3, 0.6, 24]} position={[0, -0.1, 0.1]} material={earInnerMaterial} />
                </group>

                <group position={[-0.35, 0.1, 0.85]} ref={leftEyeRef}>
                    <Sphere args={[0.25, 24, 24]} material={eyeWhiteMaterial} />
                    <Sphere ref={leftPupilRef} args={[0.12, 24, 24]} position={[0, 0, 0.2]} material={pupilMaterial} />
                </group>
                <group position={[0.35, 0.1, 0.85]} ref={rightEyeRef}>
                    <Sphere args={[0.25, 24, 24]} material={eyeWhiteMaterial} />
                    <Sphere ref={rightPupilRef} args={[0.12, 24, 24]} position={[0, 0, 0.2]} material={pupilMaterial} />
                </group>

                <Cone args={[0.1, 0.1, 24]} position={[0, -0.2, 1.2]} rotation={[0, 0, 3.14]} material={noseMaterial} />

                <group position={[0, -0.35, 1.2]}>
                    <Torus args={[0.1, 0.02, 16, 24, 2.5]} position={[-0.1, 0, 0]} rotation={[0, 0, 2.5]} material={new THREE.MeshBasicMaterial({ color: '#000000' })} />
                    <Torus args={[0.1, 0.02, 16, 24, 2.5]} position={[0.1, 0, 0]} rotation={[0, 0, 4.2]} material={new THREE.MeshBasicMaterial({ color: '#000000' })} />
                </group>

                <group position={[0, -0.3, 1.25]}>
                    <group position={[-0.4, 0, 0]} rotation={[0, 0.3, 0]}>
                        <Box args={[0.5, 0.03, 0.03]} position={[-0.25, 0.08, 0]} rotation={[0, 0, 0.1]} material={whiskerMaterial} />
                        <Box args={[0.5, 0.03, 0.03]} position={[-0.25, 0, 0]} material={whiskerMaterial} />
                        <Box args={[0.5, 0.03, 0.03]} position={[-0.25, -0.08, 0]} rotation={[0, 0, -0.1]} material={whiskerMaterial} />
                    </group>

                    <group position={[0.4, 0, 0]} rotation={[0, -0.3, 0]}>
                        <Box args={[0.5, 0.03, 0.03]} position={[0.25, 0.08, 0]} rotation={[0, 0, -0.1]} material={whiskerMaterial} />
                        <Box args={[0.5, 0.03, 0.03]} position={[0.25, 0, 0]} material={whiskerMaterial} />
                        <Box args={[0.5, 0.03, 0.03]} position={[0.25, -0.08, 0]} rotation={[0, 0, 0.1]} material={whiskerMaterial} />
                    </group>
                </group>
            </group>

            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} color="#blue" />
        </group>
    );
}
