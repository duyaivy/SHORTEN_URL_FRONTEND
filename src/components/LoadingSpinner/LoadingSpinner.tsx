import { loading } from '@/assets/icons'
import Lottie from 'react-lottie-player'

export default function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center min-h-screen flex-col gap-4 fixed top-0 left-0 right-0 bottom-0 bg-white/50 z-50'>
      <Lottie speed={2} play loop className='size-80' animationData={loading} />
    </div>
  )
}
