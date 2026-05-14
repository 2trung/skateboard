import Link from 'next/link'
import React from 'react'
import { ButtonLink } from '../ButtonLink'
import { Logo } from './Logo'

type Props = {}

export default function Header({}: Props) {
  const links = [
    {
      name: 'Team',
      href: '/',
    },
    {
      name: 'Customize',
      href: '/board',
    },
    {
      name: 'About',
      href: '/',
    },
  ]

  return (
    <header className='header absolute left-0 top-0 right-0 z-50 h-32 md:h-48 p-4 md:p-6'>
      <div className='mx-auto grid w-full max-w-6xl grid-cols-[auto_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]'>
        <Link href='/' className='justify-self-start'>
          <Logo className='text-brand-purple h-12 md:h-20' />
        </Link>
        <nav className='col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1'>
          <ul className='flex flex-wrap items-center justify-center gap-8'>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className='text-xl font-medium md:text-lg'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='justify-self-end'>
          <ButtonLink href='/cart' color='purple' icon='cart'>
            <span className='md:hidden'>1</span>
            <span className='hidden md:inline'>Cart (1)</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
