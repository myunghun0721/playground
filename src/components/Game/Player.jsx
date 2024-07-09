import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";


export default function Player() {

    const [subscribeKeys, getKeys] = useKeyboardControls()
    const body = useRef()
    const { rapier, world } = useRapier()


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

    useEffect(() => {
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
        return ()=>{
            unsubscribeJump()
        }
    }, [])

    useFrame((state, delta) => {
        const { foward, backward, leftward, rightward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (foward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }
        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
    })

    return <RigidBody
        ref={body}
        canSleep={false}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
    >
        <mesh castShadow>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial flatShading color={"mediumpurple"} />
        </mesh>
    </RigidBody>

}
