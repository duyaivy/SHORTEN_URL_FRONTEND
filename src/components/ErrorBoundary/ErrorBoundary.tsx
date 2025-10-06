import { path } from '@/constants/path'
import { Component, ErrorInfo, ReactNode } from 'react'
type Props = {
  children: ReactNode
  fallbackImageUrl?: string
  fallbackTitle?: string
  fallbackMessage?: string
}

type State = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }
  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center h-screen bg-white text-center p-6'>
          <h1 className='text-7xl font-semibold text-gray-800 mb-2'>500</h1>
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Internal Server Error</h2>
          <p className='text-gray-600 mb-4'>Some thing went wrong! Try again later.</p>
          <a href={path.home} className='px-4 py-2 text-white rounded transition'>
            Go to home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
