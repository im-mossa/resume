"use client";

import * as THREE from 'three';
import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from 'gsap';
import { Group } from 'three';
import type { GLTF } from 'three-stdlib';

type RobotProps = ThreeElements['group'];

// اگر مدل GLB خودت رو تایپ‌کنی خیلی بهتر می‌شه:
type GLTFResult = GLTF & {
    nodes: {
        Cube003: THREE.Mesh;
        Cube003_1: THREE.Mesh;
    };
    materials: {
        Metal: THREE.Material;
    };
};

export function Robot(props: RobotProps) {
    const gltf = useGLTF('./models/robot/phantoms-transformed.glb');
    const { nodes, materials } = (gltf as unknown) as GLTFResult

    const robot = useRef<Group>(null!);
    const scroll = useScroll();
    const tl = useRef<gsap.core.Timeline>(gsap.timeline());

    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
    });

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ defaults: { duration: 2, ease: 'power1.inOut' } });

        tl.current
            .to(robot.current.rotation, { y: -1 }, 2)
            .to(robot.current.position, { x: 1 }, 2)

            .to(robot.current.rotation, { y: 1 }, 6)
            .to(robot.current.position, { x: -1 }, 6)

            .to(robot.current.rotation, { y: 0 }, 11)
            .to(robot.current.rotation, { x: 1 }, 11)
            .to(robot.current.position, { x: 0 }, 11)

            .to(robot.current.rotation, { y: 0 }, 13)
            .to(robot.current.rotation, { x: -1 }, 13)
            .to(robot.current.position, { x: 0 }, 13)

            .to(robot.current.rotation, { y: 0 }, 16)
            .to(robot.current.rotation, { x: 0 }, 16)
            .to(robot.current.position, { x: 0 }, 16)

            .to(robot.current.rotation, { y: 0 }, 20)
            .to(robot.current.rotation, { x: 0 }, 20)
            .to(robot.current.position, { x: 0 }, 20)
    }, []);

    return (
        <group {...props} dispose={null} ref={robot}>
            <group position={[-0.21, 0.16, 0.37]} rotation={[0, 0, 0]} scale={0.15}>
                <mesh geometry={nodes.Cube003.geometry} material={materials.Metal} castShadow>
                    <meshPhysicalMaterial
                        color="#aaa"
                        roughness={0.2}
                        metalness={1}
                        reflectivity={0.5}
                        iridescence={0.3}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100, 1000]}
                    />
                </mesh>
                <mesh geometry={nodes.Cube003_1.geometry} material={materials.Metal} castShadow>
                    <meshPhysicalMaterial
                        color="#000000"
                        roughness={1}
                        emissive={'#000'}
                        clearcoat={1}
                        reflectivity={0.2}
                        metalness={0}
                        iridescence={0.1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100, 1000]}
                    />
                </mesh>
            </group>
        </group>
    );
}