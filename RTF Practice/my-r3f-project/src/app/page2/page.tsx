"use client";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import baffle from 'baffle';
import gsap from "gsap";

export default function Page2() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const b = baffle(textRef.current, {
      characters: "█▓▒░█▓▒░<>/",
      speed: 75,
    });
    b.start();
    b.reveal(2000);

    setTimeout(() => {
      gsap.to(textRef.current, {
        y: 200,
        duration: 2,
        ease: 'power2.out',
      });
    }, 2000);

    return () => {
      b.stop();
    }
  }, []);

  return (
    <div className="w-full h-screen relative pt-12">
      <span
        ref={textRef}
        className="text-2xl text-red-800 text-center block absolute top-0 left-1/2 translate-x-[-50%]"
      >
        page 2. this page created by baffle.js and GSAP
      </span>

      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        className="w-full h-full"
      >
        {/* add your R3F scene here if needed */}
      </Canvas>
    </div>
  );
}
