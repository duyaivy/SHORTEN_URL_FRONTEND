import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'
import { cn } from '@/utils/lib'
interface SecctionInViewProps {
  className?: string
  children: ReactNode
}
export default function SectionInView({ className, children }: SecctionInViewProps) {
  const { ref, inView } = useInView({
    triggerOnce: true
  })
  return (
    <div ref={ref} className={cn(className, { 'animate-fade-up': inView })}>
      {children}
    </div>
  )
}
