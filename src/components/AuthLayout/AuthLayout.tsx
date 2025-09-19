import { bg_dot } from '@/assets/images'
import { ReactNode } from 'react'
import Helmet from '../Helmet'
interface LayoutProps {
  children?: ReactNode
}
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div
      style={{
        background: 'radial-gradient(circle,rgba(18, 3, 41, 1) 0%, rgba(14, 2, 26, 1) 100%)'
      }}
      className='min-h-screen flex flex-col'
    >
      <Helmet />
      <div
        className='flex-1 bg-no-repeat bg-cover flex flex-col justify-center '
        style={{ backgroundImage: `url('${bg_dot}')` }}
      >
        {children}
      </div>
    </div>
  )
}
