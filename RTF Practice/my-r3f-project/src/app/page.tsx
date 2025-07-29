"use client"
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <Canvas className="m-0 p-0" camera={{ position: [0, 0, 10], fov: 60 }}>
      <Scene />
    </Canvas>
  );
}
