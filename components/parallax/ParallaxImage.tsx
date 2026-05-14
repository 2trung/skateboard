'use client'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
  foregroundImage: string
  backgroundImage: string
  className?: string
}

export default function ParallaxImage({
  className,
  foregroundImage,
  backgroundImage,
}: Props) {
  const backgroundRef = useRef<HTMLImageElement>(null)
  const foregroundRef = useRef<HTMLImageElement>(null)
  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate)

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (event.clientX / innerWidth - 0.5) * 2
      const y = (event.clientY / innerHeight - 0.5) * 2
      targetPosition.current = { x, y }
    }
    window.addEventListener('mousemove', handleMouseMove)

    function animate() {
      currentPosition.current.x +=
        (targetPosition.current.x - currentPosition.current.x) * 0.1
      currentPosition.current.y +=
        (targetPosition.current.y - currentPosition.current.y) * 0.1

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${
          currentPosition.current.x * 50
        }px, ${currentPosition.current.y * 50}px)`
      }
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate(${
          currentPosition.current.x * 20
        }px, ${currentPosition.current.y * 20}px)`
      }
      requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className={clsx('grid grid-cols-1 place-items-center', className)}>
      <Image
        src={foregroundImage}
        ref={foregroundRef}
        alt={'Paint background texture'}
        width={600}
        height={400}
        className='col-start-1 row-start-1 transition-transform w-11/12'
      ></Image>
      <Image
        src={backgroundImage}
        ref={backgroundRef}
        alt={'Skateboarder performing a trick with a custom skateboard deck'}
        width={600}
        height={400}
        className='col-start-1 row-start-1 transition-transform h-full max-h-125 w-auto self-center'
      ></Image>
    </div>
  )
}
