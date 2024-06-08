import { BakeShadows, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls, useHelper, SoftShadows, Sky, Environment, Stage } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Experience() {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    const sphere = useRef()

    // animate cube
    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2

        const time = state.clock.elapsedTime
        cube.current.position.x = 2 + Math.sin(time)
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: { value: 7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 }
    })

    return <>

        {/* <BakeShadows /> */}
        <SoftShadows size={25} samples={10} focus={0} />


        <OrbitControls makeDefault />

        <directionalLight
            ref={directionalLight}
            position={sunPosition}
            intensity={4.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
        />
        <ambientLight intensity={1.5} />

        <Sky sunPosition={sunPosition} />
        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={1}
        // fixed={true}
        >
            <mesh castShadow ref={sphere} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={8}
                    occlude={[sphere, cube]}
                >
                    That's a sphere 👍
                </Html>
            </mesh>
        </PivotControls>

        <mesh castShadow ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* <TransformControls object={cube} /> */}

        <Environment
            background
            // files={ [
            //     './environmentMaps/2/px.jpg',
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg',
            // ] }
            files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
            preset="sunset"
            resolution={32}
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale
            }}
        >
        </Environment>
        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.5}
                color="greenyellow"
            />
        </mesh>


        <Float
            speed={5}
            floatIntensity={2}
        >
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                color="salmon"
                position-y={2}
                maxWidth={2}
                textAlign="center"
            >
                Hello!
            </Text>
        </Float>

        {/* <Stage
            shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
            environment="sunset"
            preset="portrait"
            intensity={envMapIntensity}
        >
            <mesh ref={sphere} position-y={1} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh ref={cube} position-y={1} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

        </Stage> */}
    </>
}
