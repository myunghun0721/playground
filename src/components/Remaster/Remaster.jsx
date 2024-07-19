import { NavLink, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import "./Remaster.css"
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Floor } from "./Floor";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights";
import Player from "./Player";
function Remaster() {

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
                <OrbitControls />
                <color args={['#bdedfc']} attach={'background'} />
                <Physics debug={true}>
                    <Lights />
                    <Floor />
                    <Player />
                </Physics>
            </Canvas>
        </KeyboardControls>
    </>
}

export default Remaster;
