import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import FakeGlowMaterial from './material/FakeGlow'

export function RoomGlow(props) {
  const { nodes, materials } = useGLTF('/models/som-chat-room-glow.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={materials['Material.001']}
        position={[0.098, 1.013, -0.955]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane013.geometry}
        material={materials['Material.001']}
        position={[0.05, 1.013, -0.955]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane020.geometry}
        material={materials['Material.001']}
        position={[7.124, 1.589, 4.189]}
        rotation={[Math.PI / 2, 0, Math.PI]}
      />
    </group>
  )
}

useGLTF.preload('/models/som-chat-room-glow.glb')
