import React from 'react'
import { Bounded } from '../Bounded'
import { Heading } from '../Heading'
import Skater from './Skater'
import SlideIn from '../SlideIn'

type Props = {}

const TeamSection = (props: Props) => {
  const skaters = [
    {
      firstName: 'Sophie',
      lastName: 'Castillo',
      backgroundImage: '/team/sophie-back.png',
      image: '/team/sophie-front.png',
      colorClassName: 'text-brand-blue',
    },
    {
      firstName: 'Dylan',
      lastName: 'Foster',
      backgroundImage: '/team/dylan-back.png',
      image: '/team/dylan-front.png',
      colorClassName: 'text-brand-orange',
    },
    {
      firstName: 'Jordan',
      lastName: 'Lee',
      backgroundImage: '/team/jordan-back.png',
      image: '/team/jordan-front.png',
      colorClassName: 'text-brand-pink',
    },
    {
      firstName: 'Carter',
      lastName: 'Bell',
      backgroundImage: '/team/carter-back.png',
      image: '/team/carter-front.png',
      colorClassName: 'text-brand-purple',
    },
  ]
  return (
    <Bounded className='bg-texture bg-brand-navy text-white'>
      <SlideIn>
        <Heading as='h2' size='lg' className='text-center'>
          The Team
        </Heading>
      </SlideIn>
      <div className='mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4'>
        {skaters.map((skater, index) => (
          <Skater key={index} {...skater} />
        ))}
      </div>
    </Bounded>
  )
}

export default TeamSection
