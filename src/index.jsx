import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'


import { router } from "./router";
import { RouterProvider } from 'react-router-dom';
import React, { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />

        </Suspense>
    </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.querySelector('#root'))

// root.render(
//     <Canvas
//         className="r3f"
//         camera={ {
//             fov: 45,
//             near: 0.1,
//             far: 2000,
//             position: [ -3, 1.5, 4 ]
//         } }
//     >
//         <Experience />
//     </Canvas>
// )
