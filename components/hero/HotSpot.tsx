import { Billboard } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

type HotSpotProps = {
  position: [number, number, number]
  isVisible: boolean
  color?: string
}

export default function HotSpot({
  position,
  isVisible,
  color = '#E6FC6A',
}: HotSpotProps) {
  const hotSpotRef = useRef<THREE.Mesh>(null)
  return (
    <Billboard
      position={position}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <mesh ref={hotSpotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]} />
        <meshBasicMaterial color={color} transparent opacity={1} />
      </mesh>
      <mesh
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
        visible={isVisible}
      >
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Billboard>
  )
}
