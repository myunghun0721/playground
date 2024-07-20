import { RigidBody } from "@react-three/rapier"

function Ground() {
    return <>
        <RigidBody type="fixed" friction={0.7}>
            <mesh receiveShadow position-y={- 1.25}>
                <boxGeometry args={[10, 0.5, 10]} />
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
