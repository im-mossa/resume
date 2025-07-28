
import { MeshWobbleMaterial } from "@react-three/drei";
import { TorusKnotProps } from "../types";
import { useControls } from "leva";

export default function TorusKnot({ position, side, initialColor, factor, speed}: TorusKnotProps) {
    const {color, radius} = useControls('TorusKnot', {
        color: initialColor,
        radius: {
            value: 1,
            min:0.1,
            max: 5,
            step: 0.1,
        }
    })
    return (
        <mesh position={position}>
            <torusKnotGeometry args={[radius, ...side]} />
            <MeshWobbleMaterial factor={factor} speed={speed} color={color} />
        </mesh>
    );
}
