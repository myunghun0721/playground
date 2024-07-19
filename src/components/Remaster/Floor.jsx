import { RigidBody } from "@react-three/rapier"

function Ground() {
    return <>
        <RigidBody type="fixed" friction={0.7}>
            <mesh receiveShadow position-y={- 1.25}>
                <boxGeometry args={[100, 0.5, 100]} />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </RigidBody>
    </>
}

export function Floor() {
    return <>
        <Ground />
    </>
}
