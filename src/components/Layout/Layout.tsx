import { bg_dot } from '@/assets/images'
import Header from '@/components/Header'
import Helmet from '@/components/Helmet/Helmet'

import { ReactNode } from 'react'
import Footer from '../Footer'

interface LayoutProps {
  children?: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        background: 'radial-gradient(circle,rgba(18, 3, 41, 1) 0%, rgba(14, 2, 26, 1) 100%)'
      }}
      className='min-h-screen flex flex-col'
    >
      <Helmet />
      <Header />
      <div
        className='flex-1 bg-no-repeat bg-cover flex flex-col justify-center '
        style={{
          backgroundImage: window.innerWidth >= 768 ? `url(${bg_dot})` : 'none'
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}
