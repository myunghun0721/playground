import { Torus, useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import useGame from "../../stores/useGame";

export default function Player() {
    const fox = useGLTF('./glTF/Fox.gltf')
    fox.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })
    const animation = useAnimations(fox.animations, fox.scene)


    const [subscribeKeys, getKeys] = useKeyboardControls()
    const body = useRef()
    const { rapier, world } = useRapier()

    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    const start = useGame((state) => state.start)
    const end = useGame((state) => state.end)
    const restart = useGame((state) => state.restart)
    const blocksCount = useGame((state) => state.blocksCount)

    const jump = () => {
        const origin = body.current.translation()
        origin.y -= 0.31

        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = world.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })

        }

    }

    const reset = () => {
        body.current.setTranslation({ x: 0, y: 1, z: 0 })
        body.current.setLinvel({ x: 0, y: 0, z: 0 })
        body.current.setAngvel({ x: 0, y: 0, z: 10 })

    }

    useEffect(() => {

        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => {
                if (value === 'ready')
                    reset()
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => {
                return state.jump
            },
            (value) => {
                if (value) {
                    jump()
                }
            }
        )

        const unsubscribeAny = subscribeKeys(() => {
            start()
        })

        return () => {
            unsubscribeJump()
            unsubscribeAny()
            unsubscribeReset()
        }
    }, [])

    useFrame((state, delta) => {
        const { foward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 31 * delta
        const torqueStrength = 0.6 * delta

        if (foward) {
            animation.actions.Run.play()
            impulse.z -= impulseStrength
            // torque.x -= torqueStrength
        }
        else{
            animation.actions.Run.stop()
        }
        if (backward) {
            impulse.z += impulseStrength
            // torque.x += torqueStrength
        }
        if (leftward) {
            impulse.x -= impulseStrength
            torque.y += torqueStrength
        }
        if (rightward) {
            impulse.x += impulseStrength
            torque.y -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        // camera
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 3
        cameraPosition.y += 3

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25


        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        // state.camera.position.copy(smoothedCameraPosition)
        // state.camera.lookAt(smoothedCameraTarget)

        // phases
        if (bodyPosition.z < - (blocksCount * 4 + 2)) {
            end()
        }
        if (bodyPosition.y < - 4)
            restart()
    })

    return <RigidBody
        ref={body}
        canSleep={false}
        restitution={0.2}
        friction={0.7}
        colliders="cuboid"
        position={[0, 0, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
    >

        <primitive
            castShadow
            object={fox.scene}
            scale={0.02}
            position={[0, 0, 0]}
            rotation-y={3}
        />



    </RigidBody>

}