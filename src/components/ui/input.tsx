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
      <div className={cn('relative flex items-center w-full', classNameInput)}>
        <input
          type={type}
          className={cn(
            'focus:outline-none text-sm bg-transparent flex h-11 w-full rounded-xl border border-white/20 px-3.5 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-1 focus:ring-main focus:border-main placeholder:text-white/40 outline-none pr-10 text-white appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition-colors duration-200',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn('absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer text-white/50 hover:text-white transition-colors', classNameIcon)}
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
