import Footer from '@/components/footer/Footer'
import Header from '@/components/navbar/Header'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
