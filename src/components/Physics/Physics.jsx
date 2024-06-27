import { Text, ContactShadows, Environment, Float, Html, PresentationControls, useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'


export default function Experience() {

    const cube = useRef()
    const cubeJump = () => {
        cube.current.applyImpulse({ x: 0, y: 5, z: 0 })
        cube.current.applyTorqueImpulse({ x: 0, y: 0.5, z: 0 })
    }

    return <Canvas
        shadows
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [4, 2, 6]
        }}
    >
        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <Physics debug gravity={[0, -9.08, 0]}>

            <RigidBody colliders="ball">
                <mesh castShadow position={[-1.5, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody ref={cube}
                position={[1.5, 2, 0]}
                gravityScale={1}
                restitution={0}
                friction={0.7}
            >
                <mesh castShadow onClick={cubeJump}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>

            <RigidBody
                type='fixed'
                friction={0.7}
            >
                <mesh receiveShadow position-y={- 1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
        </Physics>

    </Canvas>

}
