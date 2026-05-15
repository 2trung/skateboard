'use client'
import { clsx } from 'clsx'
import { Bounded } from '../Bounded'
import { Heading } from '../Heading'
import { ButtonLink } from '../ButtonLink'
import ParallaxImage from './ParallaxImage'
import SlideIn from '../SlideIn'

type Props = {
  foregroundImage: string
  backgroundImage: string
  header: string
  text: string
  theme: 'Blue' | 'Navy' | 'Orange' | 'Lime'
  variant: 'imageOnLeft' | 'imageOnRight'
  index: number
}

const TextAndImage = ({
  foregroundImage,
  backgroundImage,
  header,
  text,
  theme,
  variant,
  index,
}: Props) => {
  return (
    <Bounded
      className={clsx(
        'sticky top-[calc(var(--index)*2rem)]',
        theme === 'Blue' && 'bg-texture bg-brand-blue text-white',
        theme === 'Navy' && 'bg-texture bg-brand-navy text-white',
        theme === 'Orange' && 'bg-texture bg-brand-orange text-white',
        theme === 'Lime' && 'bg-texture bg-brand-lime text-black',
      )}
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24'>
        <div
          className={clsx(
            'flex flex-col items-center gap-8 text-center md:items-start md:text-left',
            variant === 'imageOnLeft' && 'md:order-2',
          )}
        >
          <SlideIn>
            <Heading as='h2' size='lg'>
              {header}
            </Heading>
          </SlideIn>
          <SlideIn>
            <p className='max-w-md text-lg leading-relaxed'>{text}</p>
          </SlideIn>
          <SlideIn>
            <ButtonLink
              href='/build'
              className='mt-4'
              color={theme == 'Lime' ? 'orange' : 'lime'}
            >
              Shop Boards
            </ButtonLink>
          </SlideIn>
        </div>
        <ParallaxImage
          foregroundImage={foregroundImage}
          backgroundImage={backgroundImage}
        />
      </div>
    </Bounded>
  )
}

export default TextAndImage
