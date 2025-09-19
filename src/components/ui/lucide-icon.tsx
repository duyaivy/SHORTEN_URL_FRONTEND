import { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
}
export default function LucideIcons({ icon: Icon }: Props) {
  return <Icon className='!w-6 !h-6 ' />
}
