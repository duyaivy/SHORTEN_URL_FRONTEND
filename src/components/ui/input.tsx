import { cn } from '@/utils/lib'
import { forwardRef, ReactNode } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  classNameIcon?: string
  iconOnClick?: () => void
  classNameInput?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconOnClick, classNameInput, classNameIcon, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', classNameInput)}>
        <input
          type={type}
          className={cn(
            'focus:outline-0 text-lg mt-1 bg-transparent flex h-10 w-full rounded-md border border-slate-200  px-3 py-6  file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-primary focus:ring-2 placeholder:text-slate-500 outline-none pr-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn('absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer', classNameIcon)}
            onClick={iconOnClick}
          >
            {icon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
