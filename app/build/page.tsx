import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { Logo } from '@/components/navbar/Logo'
import Link from 'next/link'
import React from 'react'
import { CustomizerControlsProvider } from './context'
import Preview from './Preview'

type Props = {}

export default function page({}: Props) {
  const wheels = [
    '/product/wheel-cream.png',
    '/product/wheel-yellow.png',
    '/product/wheel-green.png',
    '/product/wheel-blue.png',
    '/product/wheel-purple.png',
    '/product/wheel-black.png',
    '/product/wheel-red.png',
    '/product/wheel-navy.png',
    '/product/wheel-pink.png',
  ]
  const decks = [
    '/product/thank-you-deck.png',
    '/product/grid-streaks.png',
    '/product/against-the-tide.png',
    '/product/OniMask.png',
    '/product/red-and-black.png',
    '/product/red-and-white.png',
    '/product/black-and-yellow.png',
    '/product/yellow-and-black.png',
    '/product/green-and-navy.png',
    '/product/gray-and-black.png',
  ]
  const metals = [
    '#333333',
    '#6F6E6A',
    '#34495E',
    '#DEB887',
    '#EEEEEE',
    '#E84118',
    '#068BD3',
    '#A6E22E',
    '#F1C40F',
    '#8E44AD',
    '#BA3763',
    '#F1396E',
  ]
  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <CustomizerControlsProvider
        defaultWheel={wheels[0]}
        defaultDeck={decks[0]}
        defaultTruck={metals[0]}
        defaultBolt={metals[0]}
      >
        <div className='relative aspect-square shink-0 bg-[#3a414a] lg:aspect-auto lg:grow'>
          <Link href='/' className='absolute left-6 top-6'>
            <Logo className='h-12 text-white' />
          </Link>
          <div className='absolute inset-0'>
            <Preview wheelTextureUrls={wheels} deckTextureUrls={decks} />
          </div>
        </div>
        <div className='grow bg-texture bg-zinc-900 text-white p-4 md:p-6 lg:w-96 lg:shrink-0 lg:grow-0'>
          <Heading as='h1' size='sm' className='mb-6 mt-0'>
            Build your board
          </Heading>

          <ButtonLink href='/' color='lime' icon='plus'>
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  )
}
