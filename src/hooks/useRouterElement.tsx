import { Navigate, Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom'
import { Fragment, lazy, ReactNode, useContext, Suspense } from 'react'
import { path } from '@/constants/path'
import { AppContext } from '@/contexts/app.context'
import { CleanLoading } from '@/assets/videos'
import CommingSoon from '@/pages/CommingSoon'
import ShortenURL from '@/pages/ShortenURL'
import ScanQR from '@/pages/ScanQR'
import AuthLayout from '@/components/AuthLayout'
// Lazy load all components
const MyURL = lazy(() => import('@/pages/MyURL'))
const Layout = lazy(() => import('@/components/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const PageNotFound = lazy(() => import('@/pages/404/PageNotFound'))
const HomePage = lazy(() => import('@/pages/Home'))

const AnimatedOutlet = lazy(() => import('@/components/AnimatedOutlet'))

const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-screen flex-col gap-4'>
    <video autoPlay loop muted className='size-80 object-cover'>
      <source src={CleanLoading} type='video/mp4' />
    </video>
    <h1 className='text-2xl font-bold'>Loading...</h1>
  </div>
)

const LazyComponent = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
)

interface RouteConfig {
  path: string
  element: ReactNode
  children?: RouteObject[] | undefined
}

function ProtectedRoute() {
  //admin
  const { isAuthenticated, profile } = useContext(AppContext)
  if (profile && isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to={path.login} />
}

function RejectedRoute() {
  //login
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRoutesElements() {
  const location = useLocation()

  const routes: RouteConfig[] = [
    {
      path: '',
      element: (
        <LazyComponent>
          <AnimatedOutlet />
        </LazyComponent>
      ),
      children: [
        {
          path: path.home,
          element: (
            <LazyComponent>
              <Layout>
                <HomePage />
              </Layout>
            </LazyComponent>
          )
        },
        {
          path: path.coming_soon,
          element: (
            <LazyComponent>
              <Layout>
                <CommingSoon />
              </Layout>
            </LazyComponent>
          )
        },
        {
          path: path.shorten_link,
          element: (
            <LazyComponent>
              <Layout>
                <ShortenURL />
              </Layout>
            </LazyComponent>
          )
        },
        {
          path: path.scan_qr,
          element: (
            <LazyComponent>
              <Layout>
                <ScanQR />
              </Layout>
            </LazyComponent>
          )
        },

        {
          path: '',
          element: <ProtectedRoute />,
          children: [
            {
              path: path.my_url,
              element: (
                <LazyComponent>
                  <Layout>
                    <MyURL />
                  </Layout>
                </LazyComponent>
              )
            }
          ]
        },
        {
          path: '',
          element: <RejectedRoute />,
          children: [
            {
              path: path.login,
              element: (
                <LazyComponent>
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                </LazyComponent>
              )
            },
            {
              path: path.register,
              element: (
                <LazyComponent>
                  <AuthLayout>
                    <Register />
                  </AuthLayout>
                </LazyComponent>
              )
            }
          ]
        },
        {
          path: '*',
          element: (
            <LazyComponent>
              <Layout>
                <PageNotFound />
              </Layout>
            </LazyComponent>
          )
        }
      ]
    }
  ]

  const routeElements = useRoutes(routes, location)

  return <Fragment>{routeElements}</Fragment>
}
