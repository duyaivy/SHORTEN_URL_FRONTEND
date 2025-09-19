import { z } from 'zod'
import { validator } from '../helpers/validator'

import isEqual from 'lodash/isEqual'

export const UpdateUserSchema = z.object({
  name: z.string().min(2, {
    message: 'Họ tên không được để trống.'
  }),
  dateOfBirth: z.date({ message: 'Ngày sinh không được để trống.' }),
  ph1: z
    .string()
    .min(10, { message: 'Số điện thoại không được để trống.' })
    .regex(validator.number, { message: 'Số điện thoại chỉ được chứa số.' }),
  imageId: z.number().optional(),
  address: z.string().min(5, {
    message: 'Địa chỉ không được để trống.'
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'])
})
export type UserUpdateForm = z.infer<typeof UpdateUserSchema>

// dung chung

export const AddUserSchema = UpdateUserSchema.extend({
  email: z.string().email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, {
      message: 'Mật khẩu không được bỏ trống'
    })
    .regex(validator.passwordRegex, {
      message: 'Mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
    }),
  confirmPassword: z
    .string()
    .min(1, {
      message: 'Nhập lại mật khẩu không được bỏ trống'
    })
    .regex(validator.passwordRegex, {
      message: 'Nhập lại mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
    })
}).refine(
  (data) => {
    if (data.password) {
      return isEqual(data.password, data.confirmPassword)
    }
    return true
  },
  {
    message: 'Xác nhận mật khẩu không khớp.',
    path: ['confirmPassword']
  }
)
export type UserAddForm = z.infer<typeof AddUserSchema>

export const UpdatePassUserSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, {
        message: 'Mật khẩu không được bỏ trống'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
      }),
    confirmPassword: z
      .string()
      .min(1, {
        message: 'Nhập lại mật khẩu không được bỏ trống'
      })
      .regex(validator.passwordRegex, {
        message: 'Nhập lại mật khẩu phải chứa ít nhất 6 kí tự bao gồm chữ in hoa in thường và chữ số.'
      }),
    oldPassword: z.string().min(6, {
      message: 'Mật khẩu cũ phải có ít nhất 6 ký tự.'
    })
  })
  .refine(
    (data) => {
      // Nếu newPassword tồn tại thì phải có confirmPassword và phải khớp
      if (data.newPassword) {
        return isEqual(data.newPassword, data.confirmPassword)
      }
      return true
    },
    {
      message: 'Xác nhận mật khẩu không khớp.',
      path: ['confirmPassword']
    }
  )
