import TextAndImage from './TextAndImage'

type ParallaxItem = {
  foregroundImage: string
  backgroundImage: string
  header: string
  text: string
  theme: 'Blue' | 'Navy' | 'Orange' | 'Lime'
  variant: 'imageOnLeft' | 'imageOnRight'
}

export default function ParallaxImageSection() {
  const parallaxItems: ParallaxItem[] = [
    {
      backgroundImage: '/parallax/guy-1.png',
      foregroundImage: '/parallax/paint-background.png',
      header: 'Crafted for the Kickflip',
      text: 'Built for big tricks and hard landings, our boards are designed to handle every flip, grind, and bail. Perfect balance, every time.',
      theme: 'Blue',
      variant: 'imageOnRight',
    },
    {
      backgroundImage: '/parallax/guy-2.png',
      foregroundImage: '/parallax/paint-background.png',
      header: 'Not Just a Deck, It’s Your Canvas',
      text: 'Each board is a canvas for expression, crafted for those who treat the backstreets as their own art gallery.',
      theme: 'Orange',
      variant: 'imageOnLeft',
    },
    {
      backgroundImage: '/parallax/guy-3.png',
      foregroundImage: '/parallax/paint-background.png',
      header: 'Built for Hard Landings',
      text: 'Skateboarding isn’t always smooth. Our boards are built tough to survive the scuffs, scratches, and slams that come with real skating.',
      theme: 'Navy',
      variant: 'imageOnRight',
    },

    {
      backgroundImage: '/parallax/guy-4.png',
      foregroundImage: '/parallax/paint-background.png',
      header: 'Fueling the Next Generation',
      text: 'We’re committed to supporting young skaters and DIY projects, giving back to the communities that keep skateboarding alive and evolving.',
      theme: 'Lime',
      variant: 'imageOnLeft',
    },
  ]
  return (
    <div className=''>
      {parallaxItems.map((item, index) => (
        <TextAndImage key={index} {...item} index={index} />
      ))}
    </div>
  )
}
