import { InputHTMLAttributes, useState } from 'react'
import { Input } from '../ui/input'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

export default function InputPassword({ placeholder, ...field }: InputHTMLAttributes<HTMLInputElement>) {
  const [isShow, setIsShow] = useState<boolean>(false)
  return (
    <Input
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
