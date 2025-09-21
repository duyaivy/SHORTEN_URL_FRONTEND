import { useState } from 'react'
import Lottie, { LottieProps } from 'react-lottie-player'

export default function IconAnimateClick(data: LottieProps) {
  const [isShow, setIsShow] = useState<boolean>(false)
  return (
    <Lottie
      onClick={() => {
        setIsShow(!isShow)
      }}
      direction={isShow ? 1 : -1}
      goTo={isShow ? 0 : undefined}
      {...data}
    />
  )
}
