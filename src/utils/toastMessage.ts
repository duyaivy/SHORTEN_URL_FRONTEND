import { toast } from 'sonner'

interface Toast {
  title?: string
  description?: string
}

export const Toast = {
  success: ({ title, description }: Toast) => {
    toast.success(title || 'Thành công!', {
      description,
      duration: 5000
    })
  },

  info: ({ title, description }: Toast) => {
    toast.info(title || 'Thông tin', {
      description,
      duration: 5000
    })
  },

  error: ({ title, description }: Toast) => {
    toast.error(title || 'Lỗi!', {
      description,
      duration: 5000
    })
  }
}
