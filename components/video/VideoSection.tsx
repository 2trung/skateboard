'use client'
import { useEffect, useRef, useState } from 'react'
import { Bounded } from '../Bounded'
import { clsx } from 'clsx'
import Image from 'next/image'

type Props = {}

export default function VideoSection({}: Props) {
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])
  return (
    <Bounded className='bg-texture bg-zinc-900'>
      <h2 className='sr-only'>Video Reel</h2>
      <div className='relative aspect-video'>
        <div
          className={clsx(
            'absolute inset-0 mask-[url(/video-mask.png)] mask-alpha] mask-[center_center] mask-no-repeat mask-[100%_auto]',
            'bg-brand-lime translate-y-2 translate-x-2',
          )}
        />
        <div
          className={clsx(
            'absolute inset-0 mask-[url(/video-mask.png)] mask-alpha] mask-[center_center] mask-no-repeat mask-[100%_auto]',
            'bg-black translate-y-1 translate-x-1',
          )}
        />
        <div
          className={clsx(
            'absolute inset-0 mask-[url(/video-mask.png)] mask-alpha] mask-[center_center] mask-no-repeat mask-[100%_auto]',
            'bg-white -translate-y-1 translate-x-1',
          )}
        />

        <div
          className={clsx(
            'absolute inset-0 mask-[url(/video-mask.png)] mask-alpha] mask-[center_center] mask-no-repeat mask-[100%_auto]',
            'relative h-full w-full',
          )}
          ref={containerRef}
        >
          {isInView && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&loop=1`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              className='pointer-events-none h-full w-full border-0'
            />
          )}
          <Image
            fill
            className='pointer-events-none object-cover opacity-50'
            src={'/image-texture.png'}
            alt={'Grainy background texture'}
          />
        </div>
      </div>
    </Bounded>
  )
}
