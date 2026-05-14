import Image from 'next/image'
import { Logo } from '../navbar/Logo'
import { Bounded } from '../Bounded'
import { FooterPhysics } from './FooterPhysics'

type Props = {}

export default function Footer({}: Props) {
  const links = [
    { label: 'Team', href: '#' },
    { label: 'Customize', href: '/customize' },
    { label: 'About', href: '#' },
  ]
  const boardTextures = [
    '/product/grid-streaks-complete.png',
    '/product/pink-drop-complete.png',
    '/product/thank-you-complete.png',
    '/product/black-yellow-complete.png',
    '/product/green-navy-complete.png',
    '/product/onimask-complete.png',
    '/product/yellow-black-complete.png',
    '/product/gray-black-complete.png',
    '/product/red-black-complete.png',
    '/product/red-white-complete.png',
  ]
  return (
    <footer className='bg-texture bg-zinc-900 text-white overflow-hidden'>
      <div className='relative md:aspect-auto'>
        <Image
          src='/footer.jpg'
          alt='Footer'
          width={1200}
          height={1200}
          className='w-full h-auto object-cover'
        />
        <FooterPhysics
          boardTextureURLs={boardTextures}
          className='absolute inset-0 z-10'
        />
        <Logo className='absolute pointer-events-none h-20 md:h-28 mix-blend-exclusion top-4 left-4' />
      </div>
      <Bounded as='nav'>
        <ul className='flex flex-wrap justify-center gap-8 text-lg md:text-xl'>
          {links.map((item) => (
            <li key={item.label}>
              <a href={item.href} className='hover:underline'>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  )
}
