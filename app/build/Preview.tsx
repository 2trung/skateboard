'use client'

import {
  CameraControls,
  Environment,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useCustomizerControls } from './context'
import { Skateboard } from '@/components/hero/Skateboard'
import * as THREE from 'three'

type Props = {
  wheelTextureUrls: string[]
  deckTextureUrls: string[]
}

export default function Preview({ wheelTextureUrls, deckTextureUrls }: Props) {
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } =
    useCustomizerControls()

  const cameraControls = useRef<CameraControls>(null)
  return (
    <Canvas className='z-10' shadows>
      <Suspense fallback={null}>
        <Environment
          files={'/hdr/warehouse-512.hdr'}
          environmentIntensity={0.6}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          intensity={1.6}
          position={[1, 1, 1]}
        />
        <StageFloor />

        <Skateboard
          deckTextureUrls={deckTextureUrls}
          deckTextureUrl={selectedDeck || deckTextureUrls[0]}
          wheelTextureUrls={wheelTextureUrls}
          wheelTextureUrl={selectedWheel || wheelTextureUrls[0]}
          truckColor={selectedTruck || '#333333'}
          boltsColor={selectedBolt || '#333333'}
          constantWheelSpin={true}
          pose='side'
        />
        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

function StageFloor() {
  const normalMap = useTexture('/concrete-normal.avif')
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(30, 30)
  normalMap.anisotropy = 8

  const material = new THREE.MeshStandardMaterial({
    color: '#444444',
    roughness: 0.75,
    normalMap: normalMap,
  })

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.005, 0]}
      receiveShadow
      material={material}
    >
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}
