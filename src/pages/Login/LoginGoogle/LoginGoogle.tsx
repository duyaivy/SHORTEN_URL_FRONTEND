import { Button } from '@/components/ui/button'
import config from '@/constants/config.const'
import { useLoginMutation } from '@/apis/auth.api'
import { useGetMe } from '@/apis/user.api'
import { authApi } from '@/services/auth.service'
// import { useParamsString } from '@/hooks/usePrdQueryConfig'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/utils/storage'
import { Toast } from '@/utils/toastMessage'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginGoogle() {
  const { access_token, refresh_token } = { access_token: '', refresh_token: '' } // useParamsString()
  // const { access_token, refresh_token } = useParamsString()
  const navigate = useNavigate()
  const getMeMutation = useGetMe()
  useEffect(() => {
    if (access_token && refresh_token) {
      setAccessTokenToLS(access_token as string)
      setRefreshTokenToLS(refresh_token as string)
      getMeMutation.mutate()
    }
  }, [access_token, refresh_token, getMeMutation, navigate])

  // xuly
  const { t } = useTranslation()
  const myRef = useRef<HTMLAnchorElement>(null)
  const mutationLogin = useLoginMutation({
    mutationFn: authApi.loginWithGG,
    handleError: () => {
      Toast.error({ description: 'Đăng nhập với Google thất bại, vui lòng thử lại sau!' })
    }
  })
  const getGoogleURL = () => {
    const url = config.googleURL
    const query = {
      client_id: config.googleId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      promt: 'consent'
    }
    const queryString = new URLSearchParams(query).toString()
    return `${url}?${queryString}`
  }
  const loginGG = () => {
    myRef?.current?.click()
  }

  return (
    <div className='mt-6'>
      <Button
        onClick={() => {
          loginGG()
        }}
        loading={mutationLogin.isPending}
        className='flex items-center justify-center w-full text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg'
      >
        <svg
          className='!size-6 mr-2'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='-0.5 0 48 48'
          version='1.1'
        >
          <g id='Icons' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
            <g id='Color-' transform='translate(-401.000000, -860.000000)'>
              <g id='Google' transform='translate(401.000000, 860.000000)'>
                <path
                  d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
                  id='Fill-1'
                  fill='#FBBC05'
                >
                  {'{'}' '{'}'}
                </path>
                <path
                  d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
                  id='Fill-2'
                  fill='#EB4335'
                >
                  {'{'}' '{'}'}
                </path>
                <path
                  d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
                  id='Fill-3'
                  fill='#34A853'
                >
                  {'{'}' '{'}'}
                </path>
                <path
                  d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
                  id='Fill-4'
                  fill='#4285F4'
                >
                  {'{'}' '{'}'}
                </path>
              </g>
            </g>
          </g>
        </svg>
        <span>{t('login_with_google')}</span>
        <Link hidden ref={myRef} to={getGoogleURL()}></Link>
      </Button>
    </div>
  )
}
