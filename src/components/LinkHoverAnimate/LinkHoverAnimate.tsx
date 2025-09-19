import { cn } from '@/utils/lib'
import { Link, To } from 'react-router-dom'

interface LinkHoverAnimateProps {
  text: string
  to: To
  className?: string
}

export default function LinkHoverAnimate({ text, to, className }: LinkHoverAnimateProps) {
  return (
    <Link
      to={to}
      className={cn(
        'relative inline-block overflow-hidden rounded-sm md:px-4 mo:!px-8 py-2 border-2 border-main text-sub2',
        'md:text-main duration-300 hover:text-black group',
        className
      )}
    >
      <span
        className='
          absolute inset-0 bg-main
          transform scale-x-0 origin-left
          transition-transform duration-300
          group-hover:scale-x-100
          z-0
        '
      />
      <span className='relative z-10 text-lg'>{text}</span>
    </Link>
  )
}
