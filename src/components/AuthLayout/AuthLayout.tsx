import { bg_dot } from '@/assets/images'
import { ReactNode } from 'react'
import Helmet from '../Helmet'
import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
interface LayoutProps {
  children?: ReactNode
}
export default function AuthLayout({ children }: LayoutProps) {
  const location = useLocation()
  const direction = location.pathname.includes('login') ? -1 : 1
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
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 50 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 * direction }}
            transition={{ duration: 0.5, ease: easeInOut }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
