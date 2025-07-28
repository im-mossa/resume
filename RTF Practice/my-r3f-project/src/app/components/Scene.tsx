"use client"

import { useRef } from "react"
import { OrbitControls, useHelper } from "@react-three/drei"
import { DirectionalLightHelper, DirectionalLight } from "three"
import Cube from "./Cube"
import Sphere from "./Sphere"
import TorusKnot from "./TorusKnot"
import { useControls } from "leva"

export default function Scene() {
    const directionalLightRef = useRef<DirectionalLight>(null!)
    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'red')
    const { lightColor, lightIntensity } = useControls({
        lightColor: 'red',
        lightIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.01,
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                ref={directionalLightRef}
                position={[10, 5, 5]}
                color={lightColor}
                intensity={lightIntensity}
            />

            <group position={[0, -0.5, 0]}>
                <Cube position={[2, -2, 0]} side={[1, 1, 1]} color="red" />
                <Cube position={[2, 2, 0]} side={[1, 1, 1]} color="orange" />
                <Cube position={[-2, -2, 0]} side={[1, 1, 1]} color="blue" />
                <Cube position={[-2, 2, 0]} side={[1, 1, 1]} color="green" />

                <Sphere args={[1, 30, 10]} color="hotpink" position={[0, 0, 0]} />

                <TorusKnot
                    position={[-6, 2, 0]}
                    side={[0.4, 64, 16, 2, 3]}
                    initialColor={'lightblue'}
                    factor={2}
                    speed={3}
                />
            </group>

            <OrbitControls enableZoom={false} />
        </>
    )
}
