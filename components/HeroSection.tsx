import { Bounded } from './Bounded'
import { ButtonLink } from './ButtonLink'
import { Heading } from './Heading'

const HeroSection = () => {
  return (
    <Bounded className='bg-brand-pink relative h-dvh bg-texture overflow-hidden'>
      <div className='grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr_auto] px-6 py-10 md:py-16'>
        <Heading
          as='h1'
          size='lg'
          className='max-w-2xl relative place-self-start'
        >
          Escape the Cul-de-sac
        </Heading>
        <div className='flex relative flex-col items-center justify-between gap-2 md:gap-4 lg:flex-row'>
          <p className='italic max-w-[45ch] font-semibold text-lg md:text-xl'>
            Not just a board, your board. Design a board that's as real as the
            places you take it
          </p>
          <ButtonLink
            size='lg'
            className='z-20 mt-2 px-4! button-cutout'
            icon='skateboard'
            href='/build'
          >
            Build Your Board
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  )
}

export default HeroSection
