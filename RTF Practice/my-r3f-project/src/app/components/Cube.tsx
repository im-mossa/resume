import { useFrame } from "@react-three/fiber";
import { CubeProps } from "../types";
import { useRef } from "react";
import * as THREE from 'three';

export default function Cube({ position, side, color }: CubeProps) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta * 2.0;
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    })
    return (
        <mesh position={position} ref={ref}>
            <boxGeometry args={side} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}
