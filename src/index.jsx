import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = () => {
    console.log('created')
}

root.render(
    <Canvas
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [4, 2, 6]
        }}
    >
        <Experience />
    </Canvas>
)

// root.render(
//     <Canvas
//         flat
//         shadows
//         camera={{
//             fov: 45,
//             near: 0.1,
//             far: 200,
//             position: [- 4, 6, 10]
//         }}
//         onCreated={created}
//     >
//         <Experience />
//     </Canvas>
// )
