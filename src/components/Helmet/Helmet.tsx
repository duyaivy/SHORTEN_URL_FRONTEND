import { useLocation } from 'react-router-dom'
import { path } from '@/constants/path'
import { Helmet as ReactHelmet } from 'react-helmet-async'

const PAGE_TITLES = {
  // Public routes
  [path.home]: 'Trang Chủ - ShortLink',
  [path.my_url]: 'Quản lý Link - ShortLink',
  [path.scan_qr]: 'Quét mã QR - ShortLink',
  [path.shorten_link]: 'Rút gọn Link - ShortLink',
  [path.coming_soon]: 'Sắp ra mắt - ShortLink',
  [path.notFound]: 'Trang không tìm thấy - ShortLink',

  // Auth routes
  [path.login]: 'Đăng nhập - ShortLink',
  [path.register]: 'Đăng ký - ShortLink'
} as const

const PAGE_DESCRIPTIONS = {
  // Public routes
  [path.home]: 'ShortLink - Dịch vụ vệ sinh chuyên nghiệp, uy tín, tận tâm tại Việt Nam.',
  [path.scan_qr]: 'Tìm hiểu lý do tại sao nên chọn ShortLink cho nhu cầu vệ sinh của bạn.',
  [path.shorten_link]: 'Khám phá các dịch vụ vệ sinh mà ShortLink cung cấp.',
  [path.my_url]: 'Thông tin chi tiết về các dịch vụ vệ sinh của ShortLink.',
  [path.coming_soon]: 'Các dịch vụ và tính năng mới sắp ra mắt tại ShortLink.',
  [path.notFound]: 'Trang không tồn tại hoặc đã bị xóa trên ShortLink.',

  // Auth routes
  [path.login]: 'Đăng nhập vào hệ thống ShortLink để sử dụng các dịch vụ tiện ích.',
  [path.register]: 'Tạo tài khoản mới để trải nghiệm dịch vụ vệ sinh chuyên nghiệp từ ShortLink.'
} as const

interface HelmetProps {
  title?: string
  description?: string
}

export default function Helmet({ title, description }: HelmetProps) {
  const location = useLocation()
  const titleAuto = PAGE_TITLES[location.pathname as keyof typeof PAGE_TITLES] || 'ShortLink'
  const descriptionAuto =
    PAGE_DESCRIPTIONS[location.pathname as keyof typeof PAGE_DESCRIPTIONS] ||
    'ShortLink - Dịch vụ vệ sinh chuyên nghiệp'

  return (
    <ReactHelmet>
      <title>{title ? title : titleAuto}</title>
      <meta name='description' content={description ? description : descriptionAuto} />
    </ReactHelmet>
  )
}
