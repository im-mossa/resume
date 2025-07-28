// components/Sphere.tsx
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { SphereProps } from "../types";
import { useCursor } from '@react-three/drei';


export default function Sphere({ args = [15, 32, 16], color = 0xffff00, position = [0, 0, 0] }: SphereProps) {
  const ref = useRef<THREE.Mesh>(null!)
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  useCursor(isHovered);

  useFrame((_, delta) => {
    if (ref.current) {
      const speed = isHovered ? 1 : 0.2;
      ref.current.rotation.y += delta * speed
      ref.current.rotation.x += delta * speed
    }
  })
  return (
    <mesh ref={ref} position={position} 
    onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
    onPointerLeave={() => setIsHovered(false)}
    onClick={() => setIsClicked(!isClicked)}
    scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial color={isHovered ? 'blue' : color} wireframe />
    </mesh>
  )
}