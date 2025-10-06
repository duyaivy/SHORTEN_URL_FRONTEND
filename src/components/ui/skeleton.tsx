import { cn } from '@/utils/lib'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-gray-50/30 animate-pulse rounded-md dark:bg-gray-200', className)}
      {...props}
    />
  )
}

export { Skeleton }
