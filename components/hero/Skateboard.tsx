import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

type SkateboardProps = {
  deckTextureUrls: string[]
  wheelTextureUrls: string[]
  deckTextureUrl: string
  wheelTextureUrl: string
  truckColor: string
  boltsColor: string
  constantWheelSpin?: boolean
}

type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh
    Wheel1: THREE.Mesh
    Wheel2: THREE.Mesh
    Deck: THREE.Mesh
    Wheel4: THREE.Mesh
    Bolts: THREE.Mesh
    Wheel3: THREE.Mesh
    Baseplates: THREE.Mesh
    Truck1: THREE.Mesh
    Truck2: THREE.Mesh
  }
  materials: {}
}

export function Skateboard({
  deckTextureUrls,
  deckTextureUrl,
  wheelTextureUrls,
  wheelTextureUrl,
  truckColor,
  boltsColor,
  constantWheelSpin,
}: SkateboardProps) {
  const wheelRefs = useRef<THREE.Object3D[]>([])

  const { nodes } = useGLTF('/skateboard.gltf') as unknown as GLTFResult

  const wheelTextures = wheelTextureUrls.map((url) => {
    const texture = useTexture(url)
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })
  const wheelTextureIndex = wheelTextureUrls.indexOf(wheelTextureUrl)
  const wheelTexture = wheelTextures[wheelTextureIndex]

  const deckTextures = deckTextureUrls.map((url) => {
    const texture = useTexture(url)
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })
  const deckTextureIndex = deckTextureUrls.indexOf(deckTextureUrl)
  const deckTexture = deckTextures[deckTextureIndex]

  const gripTapeDiffuse = useTexture('/skateboard/griptape-diffuse.webp')
  const gripTapeRoughness = useTexture('/skateboard/griptape-roughness.webp')

  const gripTapeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: gripTapeDiffuse,
      roughnessMap: gripTapeRoughness,
      bumpMap: gripTapeRoughness,
      roughness: 0.9,
      bumpScale: 3.5,
      color: boltsColor,
    })

    if (gripTapeDiffuse) {
      gripTapeDiffuse.wrapS = THREE.RepeatWrapping
      gripTapeDiffuse.wrapT = THREE.RepeatWrapping
      gripTapeDiffuse.repeat.set(9, 9)
      gripTapeDiffuse.needsUpdate = true
    }
    if (gripTapeRoughness) {
      gripTapeRoughness.wrapS = THREE.RepeatWrapping
      gripTapeRoughness.wrapT = THREE.RepeatWrapping
      gripTapeRoughness.repeat.set(9, 9)
      gripTapeRoughness.anisotropy = 8
      gripTapeRoughness.needsUpdate = true
    }

    return material
  }, [gripTapeDiffuse, gripTapeRoughness])

  const boltsMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: boltsColor,
      roughness: 0.1,
      metalness: 0.8,
    })
    return material
  }, [boltsColor])

  const metalNormal = useTexture('/skateboard/metal-normal.avif')
  metalNormal.wrapS = THREE.RepeatWrapping
  metalNormal.wrapT = THREE.RepeatWrapping
  metalNormal.repeat.set(9, 9)
  gripTapeRoughness.anisotropy = 8
  metalNormal.needsUpdate = true

  const truckMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: truckColor,
      roughness: 0.5,
      metalness: 0.3,
      normalMap: metalNormal,
      normalScale: new THREE.Vector2(0.5, 0.5),
    })
    return material
  }, [truckColor])

  deckTexture.flipY = false

  const deckMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: deckTexture,
      roughness: 0.1,
    })
    return material
  }, [deckTexture])

  wheelTexture.flipY = false

  const wheelMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: wheelTexture,
      roughness: 0.35,
    })
    return material
  }, [wheelTexture])

  const addToWheelRefs = (el: THREE.Object3D) => {
    if (el && !wheelRefs.current.includes(el)) {
      wheelRefs.current.push(el)
    }
  }

  useFrame(() => {
    if (constantWheelSpin && wheelRefs.current.length > 0) {
      wheelRefs.current.forEach((wheel) => {
        wheel.rotation.x += 0.2
      })
    }
  })
  useEffect(() => {
    if (!constantWheelSpin && wheelRefs.current.length > 0) {
      wheelRefs.current.forEach((wheel) => {
        gsap.to(wheel.rotation, {
          x: '-=30',
          duration: 3.5,
          ease: 'circ.out',
        })
      })
    }
  }, [constantWheelSpin, wheelTextureUrl])

  return (
    <group dispose={null}>
      <group name='Scene'>
        <mesh
          name='GripTape'
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={gripTapeMaterial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          name='Wheel1'
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={wheelMaterial}
          position={[0.238, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name='Wheel2'
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={wheelMaterial}
          position={[-0.237, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name='Deck'
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={deckMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name='Wheel4'
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={wheelMaterial}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name='Bolts'
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={boltsMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name='Wheel3'
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={wheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name='Baseplates'
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={nodes.Baseplates.material}
          position={[0, 0.211, 0]}
        />
        <mesh
          name='Truck1'
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={truckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name='Truck2'
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={truckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/skateboard.gltf')
