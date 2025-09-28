import { z } from 'zod'
import { validator } from '../helpers/validator'
export const useRegisterSchema = () => {
  const RegisterSchema = z
    .object({
      email: z
        .string()
        .min(2, {
          message: 'Email không được để trống.'
        })
        .email({
          message: 'Email không đúng định dạng.'
        }),
      password: z
        .string()
        .min(6, {
          message: 'Mật khẩu không được bỏ trống'
        })
        .regex(validator.passwordRegex, {
          message: 'Mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
        }),
      confirmPassword: z
        .string()
        .min(6, {
          message: 'Nhập lại mật khẩu không được bỏ trống'
        })
        .regex(validator.passwordRegex, {
          message: 'Nhập lại mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
        })
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Nhập lại mật khẩu không trùng khớp.',
          path: ['confirmPassword']
        })
      }
    })
  const SentMailSchema = z.object({
    email: z
      .string()
      .min(3, {
        message: 'Email không được để trống.'
      })
      .email({
        message: 'Email không đúng định dạng.'
      })
  })
  const ResetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(6, {
          message: 'Mật khẩu không được bỏ trống'
        })
        .regex(validator.passwordRegex, {
          message: 'Mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
        }),
      confirmPassword: z
        .string()
        .min(6, {
          message: 'Nhập lại mật khẩu không được bỏ trống'
        })
        .regex(validator.passwordRegex, {
          message: 'Nhập lại mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
        })
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Nhập lại mật khẩu không trùng khớp.',
          path: ['confirmPassword']
        })
      }
    })
  return { RegisterSchema, SentMailSchema, ResetPasswordSchema }
}
