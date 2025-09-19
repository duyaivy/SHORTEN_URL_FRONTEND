import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email không được để trống.'
    })
    .email({
      message: 'Email không đúng định dạng.'
    }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 kí tự.'
  })
})
