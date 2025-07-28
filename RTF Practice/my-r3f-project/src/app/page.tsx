import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <Scene />
    </Canvas>
  );
}
