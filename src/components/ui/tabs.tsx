import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils/lib'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'flex gap-2 h-9 items-center justify-center rounded-lg text-white min-w-sm sm:min-w-xl md:min-w-3xl mo:!min-w-5xl',
        className
      )}
      {...props}
    />
  )
)
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center cursor-pointer whitespace-nowrap  px-3 py-1 text-lg font-medium transition-all border-b-2 border-transparent data-[state=active]:border-b-2  data-[state=active]:border-main data-[state=active]:text-main',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn('mt-2', className)} {...props} />)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
