import Image from 'next/image'
import React from 'react'
import { ButtonLink } from '../ButtonLink'
import { SkaterScribble } from './SkaterScribble'
import { clsx } from 'clsx'

type Props = {
  firstName: string
  lastName: string
  backgroundImage: string
  image: string
  colorClassName?: string
}

function Skater({
  firstName,
  lastName,
  backgroundImage,
  image,
  colorClassName,
}: Props) {
  return (
    <div className='skater group relative flex flex-col items-center gap-4'>
      <div className='stack-layout overflow-hidden'>
        <Image
          src={backgroundImage}
          alt={`${firstName} ${lastName} background`}
          width={500}
          height={500}
          className='w-auto h-auto scale-110 transform transition-all duration-500 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturation[.8]'
        />
        <SkaterScribble className={clsx('relative', colorClassName)} />
        <Image
          src={image}
          alt={`${firstName} ${lastName} profile`}
          width={500}
          height={500}
          className='w-auto h-auto transform transition-all duration-500 ease-in-out group-hover:scale-110 z-1'
        />
        <div className='relative h-48 w-full place-self-end bg-linear-to-t from-black via-transparent to-transparent' />
        <h3 className='relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray text-2xl md:text-3xl z-1'>
          <span className='mb-[-.3em] block'>{firstName}</span>
          <span className='block'>{lastName}</span>
        </h3>
      </div>
      <ButtonLink size='sm'>Build their Board</ButtonLink>
    </div>
  )
}
export default Skater
