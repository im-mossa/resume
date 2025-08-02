import { Backdrop, Environment, Float, Html, Ring, Scroll, ScrollControls, Sparkles } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import baffle from "baffle";
import { useEffect, useRef } from "react";
import { Robot } from "./Robot";

export default function Scene2() {
    const textH1 = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!textH1.current) return console.log('heading is not loading!');

            const target = baffle(textH1.current);
            target.set({
                characters: '░P░h░a░n░t░o░m░',
                speed: 100
            });
            target.start();
            target.reveal(1000, 1000);
            setTimeout(() => target.stop(), 2000);
        }, 100); // 100ms برای اطمینان از رندر شدن DOM

        return () => clearTimeout(timeout);
    }, []);


    return (
        <>
            <color attach={'background'} args={['#333333']} />
            <ambientLight intensity={0.2} />
            <spotLight position={[0, 25, 0]} angle={1.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
            <Environment preset="warehouse" />
            <ScrollControls pages={5} damping={0.1} >
                <Robot scale={0.8} />
                <Sparkles size={2} color={'#fff'} scale={[10, 10, 10]} />
                <Backdrop receiveShadow floor={20.5} segments={100} scale={[220, 30, 10]} position={[4, -10, 0]} >
                    <meshStandardMaterial color="#0a1a1f" />
                </Backdrop>
                <Float speed={4} rotationIntensity={0.5} floatIntensity={1} floatingRange={[1, 1]}>
                    <Ring scale={3.5} position-z={-2.5} position-y={-1} args={[0, 0.95, 60]} receiveShadow >
                        <meshStandardMaterial color="#2a3a3f" />
                    </Ring>
                </Float>
                <Scroll></Scroll>
                <Scroll></Scroll>
                <Scroll></Scroll>
                <Scroll></Scroll>
                <Scroll></Scroll>
            </ScrollControls>
            <Html center className="text-[#cdcbca]">
                <h3
                    ref={textH1}
                    className="text-[13em] whitespace-nowrap"
                >
                    PHANTOM
                </h3>
                <div className='row' style={{ position: 'absolute', top: `132vh` }}>
                    <h2>Be a Man of the Future.</h2>
                    <p style={{ maxWidth: '400px' }}>Featuring a sleek, metallic design inspired by advanced technology, this aftershave bottle is as stylish as it is functional. But it's not just a pretty face - inside, you'll find a nourishing and protective aftershave formula that will leave your skin feeling refreshed and hydrated.</p>
                    <button>Read more</button>
                </div>

                <div className='row' style={{ position: 'absolute', top: `230vh` }}>
                    <div className='col' style={{ position: 'absolute', right: `40px`, width: "540px" }}>
                        <h2 style={{ maxWidth: "440px" }}>Tech-Savvy Side</h2>
                        <p style={{ maxWidth: '440px' }}>Featuring a sleek, metallic design inspired by advanced technology, this aftershave bottle is as stylish as it is functional. But it's not just a pretty face - inside, you'll find a nourishing and protective aftershave formula that will leave your skin feeling refreshed and hydrated.</p>
                        <button>Read more</button>
                    </div>
                </div>

                <h2 style={{ position: 'absolute', top: '350vh', left: '50%', transform: `translate(-50%,-50%)` }}>Cutting-Edge of Grooming</h2>

                <button style={{ position: 'absolute', top: `590vh`, left: '50%', transform: `translate(-50%,-50%)` }}>Buy now</button>
            </Html>
            {/* <OrbitControls /> */}
        </>
    );
}
