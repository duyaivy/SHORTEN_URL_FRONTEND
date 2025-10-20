import { Navigate, Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom'
import { Fragment, lazy, ReactNode, useContext, Suspense } from 'react'
import { path } from '@/constants/path'
import { AppContext } from '@/contexts/app.context'

// Lazy load all components
const ShortenURL = lazy(() => import('@/pages/ShortenURL'))
const ScanQR = lazy(() => import('@/pages/ScanQR'))
const AuthLayout = lazy(() => import('@/components/AuthLayout'))
const HistoryQr = lazy(() => import('@/pages/HistoryQr'))
const AliasFetch = lazy(() => import('@/pages/GetLink/AliasFetch'))
const AliasFetchWithPW = lazy(() => import('@/pages/GetLink/AliasFetchWithPW'))
const LoadingSpinner = lazy(() => import('@/components/LoadingSpinner'))
const MyURL = lazy(() => import('@/pages/MyURL'))
const Layout = lazy(() => import('@/components/Layout'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const PageNotFound = lazy(() => import('@/pages/404/PageNotFound'))
const HomePage = lazy(() => import('@/pages/Home'))

const LazyComponent = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
)

interface RouteConfig {
  path: string
  element: ReactNode
  children?: RouteObject[] | undefined
}

function ProtectedRoute() {
  //a
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
      path: '/a',
      element: <Outlet />,
      children: [
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
          path: '/a',
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
            },
            {
              path: path.history,
              element: (
                <LazyComponent>
                  <Layout>
                    <HistoryQr />
                  </Layout>
                </LazyComponent>
              )
            }
          ]
        },
        {
          path: '/a',
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
        }
      ]
    },
    {
      path: '',
      element: <Outlet />,
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
          path: path.get_alias_with_pw,
          element: (
            <LazyComponent>
              <Layout>
                <AliasFetchWithPW />
              </Layout>
            </LazyComponent>
          )
        },
        {
          path: path.get_alias,
          element: <AliasFetch />
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
