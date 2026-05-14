import React from 'react'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { ButtonLink } from '../ButtonLink'
import { HorizontalLine, VerticalLine } from './Line'
import { Scribble } from './Scribble'

type Props = {
  id: number
  name: string
  price: string
  image: string
  strokeColor?: string
}

export default function ProductItem({
  id,
  name,
  price,
  image,
  strokeColor,
}: Props) {
  return (
    <div className='group relative mx-auto w-full max-w-72 px-8 pt-4'>
      <VerticalLine className='absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400 left-4' />
      <VerticalLine className='absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400 right-4' />

      <HorizontalLine className='-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400' />

      <div className='flex items-center justify-between text-sm md:text-2xl'>
        <span className=''>{price}</span>
        <span className='inline-flex items-center gap-1'>
          <FaStar className='text-yellow-400' /> 37
        </span>
      </div>
      <div className='-mb-1 overflow-hidden py-4 justify-self-center'>
        <Scribble
          className='absolute inset-0 h-full w-full'
          color={strokeColor || '#f00'}
        />
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className='h-auto mx-auto w-[58%] origin-top transform-gpu trasition-transform duration-500 ease-in-out group-hover:scale-150'
        />
      </div>
      <HorizontalLine className='-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400' />

      <h3 className='my-2 text-center font-sans leading-tight text-lg md:text-xl'>
        {name}
      </h3>
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <ButtonLink>Customize</ButtonLink>
      </div>
    </div>
  )
}
