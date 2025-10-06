import { easeOut } from 'framer-motion'

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
}

export const item = {
  hidden: { opacity: 0.5, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: easeOut
    }
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.35, ease: easeOut } }
}
