import { BakeShadows, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls, useHelper, SoftShadows, Sky, Environment, Stage, useGLTF, useTexture, Center, Sparkles, shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Suspense } from 'react'
import Model from './Model'
import Placeholder from './Placeholder'
import Hamburger from './Hamburger'
import Fox from './Fox'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { DepthOfField, Bloom, Glitch, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { GlitchMode, ToneMappingMode } from 'postprocessing'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#fff'),
        uColorEnd: new THREE.Color('#000'),
    },
    portalVertexShader,
    portalFragmentShader
)
extend({ PortalMaterial })

export default function Experience() {
    // model setup
    const { nodes } = useGLTF('./model/portal.glb')
    const hamburger = useGLTF('./hamburger.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    const cube = useRef()

    const eventHandler = () => {
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }
    const portalEvent = () => {
        portalMaterial.current.uniforms.uColorStart.value.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        portalMaterial.current.uniforms.uColorEnd.value.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }
    return <>
        <color args={['#000000']} attach={"background"} />

        <EffectComposer>
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            {/* <Glitch
                delay={ [ 0.5, 1 ] }
                duration={ [ 0.1, 0.3 ] }
                strength={ [ 0.2, 0.4 ] }
                mode={ GlitchMode.CONSTANT_MILD }
            /> */}
            {/* <Bloom
                mipmapBlur
                intensity={0.5}
                luminanceThreshold={0}
            /> */}
            <DepthOfField
                focusDistance={ 0.025 }
                focalLength={ 0.025 }
                bokehScale={ 6 }
            />
        </EffectComposer>

        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
        <ambientLight intensity={0.5} />
        <Center>

            <mesh
                castShadow
                geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh
                castShadow
                geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
                <meshBasicMaterial color={"#ffffe5"} />
            </mesh>
            <mesh
                castShadow
                geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
                <meshBasicMaterial color={"#ffffe5"} />
            </mesh>

            <mesh

                castShadow
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
                onClick={portalEvent}
                onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                onPointerLeave={() => { document.body.style.cursor = 'default' }}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <mesh
                castShadow
                ref={cube}
                position-x={4}
                position-y={1}
                scale={1.5}
                onClick={eventHandler}
                onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                onPointerLeave={() => { document.body.style.cursor = 'default' }}
            >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            {/* sparkles */}
            <Sparkles
                size={6}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.2}
                count={40}
            />
        </Center>

        <primitive
            object={hamburger.scene}
            scale={0.25}
            position-x={-6}
            position-y={-0.5}
            onClick={(e) => {
                e.stopPropagation()
            }}
        />

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04}/>
        <ambientLight intensity={0.5} />

        <mesh receiveShadow position-y={-1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color={"greenyellow"} />
        </mesh>
        <Suspense
            fallback={<Placeholder position-y={-1} scale={[3, 3, 3]} />}
        >
            <Hamburger scale={0.35}/>
        </Suspense>

        <Fox/> */}
    </>
}
// export default function Experience() {
//     const directionalLight = useRef()
//     useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

//     const cube = useRef()
//     const sphere = useRef()

//     // animate cube
//     useFrame((state, delta) => {
//         cube.current.rotation.y += delta * 0.2

//         const time = state.clock.elapsedTime
//         cube.current.position.x = 2 + Math.sin(time)
//     })

//     const { sunPosition } = useControls('sky', {
//         sunPosition: { value: [1, 2, 3] }
//     })

//     const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
//         envMapIntensity: { value: 7, min: 0, max: 12 },
//         envMapHeight: { value: 7, min: 0, max: 100 },
//         envMapRadius: { value: 28, min: 10, max: 1000 },
//         envMapScale: { value: 100, min: 10, max: 1000 }
//     })

//     return <>

//         {/* <BakeShadows /> */}
//         <SoftShadows size={25} samples={10} focus={0} />


//         <OrbitControls makeDefault />

//         <directionalLight
//             ref={directionalLight}
//             position={sunPosition}
//             intensity={4.5}
//             castShadow
//             shadow-mapSize={[1024, 1024]}
//         />
//         <ambientLight intensity={1.5} />

//         <Sky sunPosition={sunPosition} />
//         <PivotControls
//             anchor={[0, 0, 0]}
//             depthTest={false}
//             lineWidth={4}
//             axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
//             scale={1}
//         // fixed={true}
//         >
//             <mesh castShadow ref={sphere} position-x={- 2}>
//                 <sphereGeometry />
//                 <meshStandardMaterial color="orange" />
//                 <Html
//                     position={[1, 1, 0]}
//                     wrapperClass="label"
//                     center
//                     distanceFactor={8}
//                     occlude={[sphere, cube]}
//                 >
//                     That's a sphere 👍
//                 </Html>
//             </mesh>
//         </PivotControls>

//         <mesh castShadow ref={cube} position-x={2} scale={1.5}>
//             <boxGeometry />
//             <meshStandardMaterial color="mediumpurple" />
//         </mesh>

//         {/* <TransformControls object={cube} /> */}

//         <Environment
//             background
//             // files={ [
//             //     './environmentMaps/2/px.jpg',
//             //     './environmentMaps/2/nx.jpg',
//             //     './environmentMaps/2/py.jpg',
//             //     './environmentMaps/2/ny.jpg',
//             //     './environmentMaps/2/pz.jpg',
//             //     './environmentMaps/2/nz.jpg',
//             // ] }
//             files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
//             preset="sunset"
//             resolution={32}
//             ground={{
//                 height: envMapHeight,
//                 radius: envMapRadius,
//                 scale: envMapScale
//             }}
//         >
//         </Environment>
//         <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
//             <planeGeometry />
//             <MeshReflectorMaterial
//                 resolution={512}
//                 blur={[1000, 1000]}
//                 mixBlur={1}
//                 mirror={0.5}
//                 color="greenyellow"
//             />
//         </mesh>


//         <Float
//             speed={5}
//             floatIntensity={2}
//         >
//             <Text
//                 font="./bangers-v20-latin-regular.woff"
//                 fontSize={1}
//                 color="salmon"
//                 position-y={2}
//                 maxWidth={2}
//                 textAlign="center"
//             >
//                 Hello!
//             </Text>
//         </Float>

//         {/* <Stage
//             shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
//             environment="sunset"
//             preset="portrait"
//             intensity={envMapIntensity}
//         >
//             <mesh ref={sphere} position-y={1} position-x={- 2}>
//                 <sphereGeometry />
//                 <meshStandardMaterial color="orange" />
//             </mesh>

//             <mesh ref={cube} position-y={1} position-x={2} scale={1.5}>
//                 <boxGeometry />
//                 <meshStandardMaterial color="mediumpurple" />
//             </mesh>

//         </Stage> */}
//     </>
// }
