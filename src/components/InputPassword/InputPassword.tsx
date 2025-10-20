import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Input } from '../ui/input'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

const InputPassword = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ placeholder, ...field }, ref) => {
    const [isShow, setIsShow] = useState<boolean>(false)

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        autoComplete='off'
        type={isShow ? 'text' : 'password'}
        {...field}
        classNameIcon='text-white'
        iconOnClick={() => setIsShow((prev) => !prev)}
        icon={isShow ? <EyeIcon /> : <EyeClosedIcon />}
      />
    )
  }
)

InputPassword.displayName = 'InputPassword'
export default InputPassword
