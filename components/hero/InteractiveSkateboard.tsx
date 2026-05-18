'use client'
import { Canvas, ThreeEvent, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Skateboard } from './Skateboard'
import * as THREE from 'three'
import gsap from 'gsap'
import HotSpot from './HotSpot'

type SkateboardProps = {
  deckTextureUrls: string[]
  wheelTextureUrls: string[]
  deckTextureUrl: string
  wheelTextureUrl: string
  truckColor: string
  boltsColor: string
  constantWheelSpin?: boolean
}

type Props = SkateboardProps
const INIT_CAMERA_POSITION: [number, number, number] = [1.5, 1, 1.4]

export default function InteractiveSkateboard(props: Props) {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center '>
      <Canvas
        className='min-h-120 w-full'
        camera={{ position: INIT_CAMERA_POSITION, fov: 55 }}
      >
        <Suspense>
          <Scene
            deckTextureUrls={props.deckTextureUrls}
            wheelTextureUrls={props.wheelTextureUrls}
            deckTextureUrl={props.deckTextureUrl}
            wheelTextureUrl={props.wheelTextureUrl}
            truckColor={props.truckColor}
            boltsColor={props.boltsColor}
            constantWheelSpin={props.constantWheelSpin}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Scene({
  deckTextureUrls,
  wheelTextureUrls,
  deckTextureUrl,
  wheelTextureUrl,
  truckColor,
  boltsColor,
  constantWheelSpin,
}: Props) {
  const containerRef = useRef<THREE.Group>(null)
  const originRef = useRef<THREE.Group>(null)

  const [animating, setAnimating] = useState(false)
  const [showHotSpot, setShowHotSpot] = useState({
    front: true,
    middle: true,
    back: true,
  })

  const { camera } = useThree()

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.2, 0.15, 0))
    setZoom()
    window.addEventListener('resize', setZoom)

    function setZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1)
      camera.position.x = INIT_CAMERA_POSITION[0] * scale
      camera.position.y = INIT_CAMERA_POSITION[1] * scale
      camera.position.z = INIT_CAMERA_POSITION[2] * scale
    }
    return () => {
      window.removeEventListener('resize', setZoom)
    }
  }, [camera])

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    const board = containerRef.current
    const origin = originRef.current

    if (!board || !origin || animating) return

    const { name } = event.object
    setShowHotSpot((current) => {
      return { ...current, [name]: false }
    })
    if (name === 'back') {
      oille(board)
    } else if (name === 'middle') {
      kickFlip(board)
    } else if (name === 'front') {
      frontSide360(origin, board)
    }
  }

  function oille(board: THREE.Group) {
    jumpBoard(board)
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: 'none',
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: 'power2.in',
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: 'none',
      })
  }
  function kickFlip(board: THREE.Group) {
    jumpBoard(board)
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: 'none',
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: 'power2.in',
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: 'none',
        },
        0.3,
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.12,
        ease: 'none',
      })
  }
  function frontSide360(origin: THREE.Group, board: THREE.Group) {
    jumpBoard(origin)
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: 'none',
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: 'power2.in',
      })
      .to(
        origin.rotation,
        {
          y: `+=${Math.PI * 2}`,
          duration: 0.77,
          ease: 'none',
        },
        0.3,
      )
      .to(board.rotation, {
        x: 0,
        duration: 0.14,
        ease: 'none',
      })
  }

  function jumpBoard(board: THREE.Group) {
    setAnimating(true)
    return gsap
      .timeline({ onComplete: () => setAnimating(false) })
      .to(board.position, {
        y: 0.6,
        duration: 0.51,
        ease: 'power2.out',
        delay: 0.26,
      })
      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: 'power2.in',
      })
  }
  return (
    <group>
      <Environment files={'/hdr/warehouse-256.hdr'} />
      {/* <OrbitControls /> */}
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.25, 0, -0.635]}>
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              deckTextureUrls={deckTextureUrls}
              wheelTextureUrls={wheelTextureUrls}
              deckTextureUrl={deckTextureUrl}
              wheelTextureUrl={wheelTextureUrl}
              truckColor={truckColor}
              boltsColor={boltsColor}
              constantWheelSpin={constantWheelSpin}
            />
            <HotSpot
              isVisible={!animating && showHotSpot.front}
              position={[0, 0.38, 1]}
              color='#B8FC39'
            />
            <HotSpot
              isVisible={!animating && showHotSpot.middle}
              position={[0, 0.33, 0]}
              color='#FF7A51'
            />
            <HotSpot
              isVisible={!animating && showHotSpot.back}
              position={[0, 0.35, -0.9]}
              color='#46BCFA'
            />
            <mesh position={[0, 0.27, 0.9]} name='front' onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh position={[0, 0.27, 0]} name='middle' onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshStandardMaterial visible={false} />
            </mesh>
            <mesh position={[0, 0.27, -0.9]} name='back' onClick={onClick}>
              <boxGeometry args={[0.6, 0.1, 0.58]} />
              <meshStandardMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows />
    </group>
  )
}
