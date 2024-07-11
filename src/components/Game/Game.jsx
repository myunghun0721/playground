import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import { Level } from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import Interface from "./Interface";



export default function Experience() {
    return <>
        <KeyboardControls map={[
            { name: 'foward', keys: ['ArrowUp', 'KeyW'] },
            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
            { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
            { name: 'jump', keys: ['Space'] }
        ]}>
            <Canvas
                className="r3f"
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [2.5, 4, 6]
                }}
            >

                <Physics debug={false}>
                    <Lights />
                    <Level />
                    <Player />
                </Physics>
            </Canvas>

            <Interface />
        </KeyboardControls>
    </>
}
