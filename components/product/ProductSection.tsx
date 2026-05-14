import { Bounded } from '../Bounded'
import { Heading } from '../Heading'
import ProductItem from './ProductItem'

type Props = {}

export default function ProductSection({}: Props) {
  const products = [
    {
      id: 1,
      name: 'Thank you',
      price: '$59.99',
      image: '/product/thank-you-complete.png',
      strokeColor: '#E43032',
    },
    {
      id: 2,
      name: 'Gray & Black',
      price: '$55.99',
      image: '/product/gray-black-complete.png',
      strokeColor: '#100E0A',
    },
    {
      id: 3,
      name: 'Grid Streaks',
      price: '$59.99',
      image: '/product/grid-streaks-complete.png',
      strokeColor: '#ACBBBF',
    },
    {
      id: 4,
      name: 'Pink Drop',
      price: '$59.99',
      image: '/product/pink-drop-complete.png',
      strokeColor: '#F05C7B',
    },
  ]

  return (
    <Bounded className='bg-texture bg-brand-gray'>
      <Heading className='text-center mb-4 lg:mb-6' as='h2'>
        Latest drop
      </Heading>
      <div className='text-center mb-6 lg:mb-10'>
        Grab out freshest designs before theys sell out!
      </div>

      <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Product items would go here */}
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </Bounded>
  )
}
