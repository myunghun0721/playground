import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";

export default function Experience() {
    return <Canvas
        className="r3f"
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6]
        }}
    >
        <OrbitControls makeDefault />

        <Physics debug>
            <Lights />
            <Level />
        </Physics>
    </Canvas>
}
