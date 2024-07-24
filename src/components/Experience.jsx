'use client'

import { Box, CameraControls, Environment, Gltf, OrbitControls , useEnvironment} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {Teacher} from '../components/Teacher'
import { degToRad } from 'three/src/math/MathUtils.js'
import { TypingBox } from "./TypingBox";
import Chat from "./chat.tsx";
import FakeGlowMaterial from '../components/material/FakeGlow'
import {RoomGlow} from '../components/RoomGlow'
import { Bloom, Noise, Glitch, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing'
import { XR, createXRStore } from '@react-three/xr'
const store = createXRStore()
export const Experience = () => {

    return (
       <>
        <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
        <Chat />
        </div>
        <button onClick={() => store.enterAR()}>Enter AR</button>
       <Canvas 
           camera={{ position: [0, 0, .0001], fov: 50 }}
        >
             <XR store={store}>
            {/* <OrbitControls /> */}
			<EnvironmentManager />
            <CameraManager />
            <Teacher teacher="Nanami" position={[0, -1.7, -4]} scale={1} rotation-y={degToRad(0)}/>
            <Gltf src="/models/som-chat-room.glb" position={[0,-1.7,-4]} />
            <Gltf src="/models/som-chat-room-glow.glb" position={[0,-1.7,-4]} />
            <EffectComposer>
                {/* ... */}
                <Bloom luminanceThreshold={ 3 }mipmapBlur
    intensity={ 0.5 }/>
            </EffectComposer>
            </XR>
       </Canvas>
       </>
    )
}

const CameraManager = () => {
    return (
        <CameraControls
            minZoom={1}
            maxZoom={3}
            polarRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
            azimuthRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
            mouseButtons={{
            left: 1, //ACTION.ROTATE
            wheel: 16, //ACTION.ZOOM
            }}
            touches={{
            one: 32, //ACTION.TOUCH_ROTATE
            two: 512, //ACTION.TOUCH_ZOOM
            }}
        />    
    )
}

const EnvironmentManager = () => {
	// const skybox = useEnvironment({ files: '/images/space.hdr' })
    const skybox = useEnvironment({ files: '/images/env.hdr' })

	return (
		<>
				<Environment map={skybox}   />
				{/* <Environment preset="sunset" /> */}
				<ambientLight intensity={0.8}  />
				<directionalLight intensity={2.5} position={[10, 10, 0]} />
		</>
	)
}