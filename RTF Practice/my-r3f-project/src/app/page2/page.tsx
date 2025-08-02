"use client";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useRef, useEffect } from "react";
// import baffle from 'baffle';
// import gsap from "gsap";
import Scene2 from "../components/Scene2";
import { useGLTF } from '@react-three/drei';

export default function Page2() {
  // const textRef = useRef<HTMLSpanElement>(null);

  // useEffect(() => {
  //   if (!textRef.current) return;

  //   const b = baffle(textRef.current, {
  //     characters: "█▓▒░█▓▒░<>/",
  //     speed: 75,
  //   });
  //   b.start();
  //   b.reveal(2000);

  //   setTimeout(() => {
  //     gsap.to(textRef.current, {
  //       y: 200,
  //       duration: 2,
  //       ease: 'power2.out',
  //     });
  //   }, 2000);

  //   return () => {
  //     b.stop();
  //   }
  // }, []);

  useGLTF.preload('./models/robot/phantoms-transformed.glb');


  return (
    <div className="w-full h-screen relative pt-12">
      {/* <span
        ref={textRef}
        className="text-2xl text-red-800 text-center block absolute top-0 left-1/2 translate-x-[-50%]"
      >
        page 2. this page created by baffle.js and GSAP
      </span> */}

      <Canvas className="m-0 p-0" camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene2 />
      </Canvas>

    </div>
  );
}
