import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import LoginGoogle from './LoginGoogle'
import { path } from '@/constants/path'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { logo } from '@/assets/images'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import isEqual from 'lodash/isEqual'
import { useLoginMutation } from '@/apis/auth.api'
import { authApi } from '@/services/auth.service'
import { useHandleError } from '@/utils/handleErrorAPI'
import { useTranslation } from 'react-i18next'
import InputPassword from '@/components/InputPassword/InputPassword'
import { LoginSchema } from '@/zods/login.zod'
import { Mail } from 'lucide-react'
import AuthModal from './AuthModal'
import { useParamsString } from '@/hooks/useUrlParams'

export default function Login() {
  const REMEMBER = localStorage.getItem('remmberMe') || 'false'
  const [rememberMe, setRememberMe] = useState<boolean>(isEqual(REMEMBER, 'true') ? true : false)
  const { t } = useTranslation()
  const { handleErrorAPI } = useHandleError()
  const { token } = useParamsString()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: isEqual(REMEMBER, 'true') ? localStorage.getItem('email') || '' : '',
      password: ''
    }
  })
  const mutationLogin = useLoginMutation({
    mutationFn: authApi.login,
    handleError: (error) => handleErrorAPI(error, form)
  })
  function onSubmit() {
    const loginData = form.getValues() as z.infer<typeof LoginSchema>
    mutationLogin.mutate(loginData)
  }

  const handleChangeRememberMe = (event: boolean) => {
    setRememberMe(event)
    localStorage.setItem('remembeMe', JSON.stringify(event))
  }
  useEffect(() => {
    const email = form.getValues('email')
    if (rememberMe) {
      localStorage.setItem('email', email)
    }
  }, [rememberMe, form])
  return (
    <div className='max-w-3xl mx-auto '>
      <div className='flex justify-center flex-col items-center min-w-2sm sm:min-w-xl md:min-w-2xl'>
        <Link to={path.home}>
          <img src={logo} alt='logo' className='hidden md:block mb-4 h-20' />
        </Link>
        <h1 className='text-xl md:text-3xl font-semibold  mb-6'>{t('login')}</h1>
        <div className='flex items-center justify-start gap-2 mb-4'>
          <p className='text-md text-left'>{t('login_description')}</p>
          <Link to={path.home} className='text-main text-sub1 font-bold'>
            ShortLink
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-10/12 space-y-2 px-4' noValidate>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')} </FormLabel>
                  <FormControl>
                    <Input placeholder={t('email_placeholder')} type='email' {...field} icon={<Mail />} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')} </FormLabel>
                  <FormControl>
                    <InputPassword placeholder={t('password_placeholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-center space-x-2'>
                <input
                  onChange={(e) => handleChangeRememberMe((e.target as HTMLInputElement).checked)}
                  checked={rememberMe}
                  type='checkbox'
                  id='terms'
                  className='accent-[green] w-4 h-4'
                />

                <Label htmlFor='terms' className=' text-sub2 text-base text-gray-500 cursor-pointer'>
                  {t('remember_me')}
                </Label>
              </div>
              <AuthModal type='forgot-password' />
            </div>

            <Button
              loading={mutationLogin.isPending}
              className='w-full text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg '
              type='submit'
            >
              {t('login')}
            </Button>
            <p className='flex items-center justify-center'>
              {t('no_account')}?&nbsp;
              <Link to={path.register} className='cursor-pointer text-main hover:underline'>
                {t('register')}
              </Link>
            </p>
          </form>
        </Form>
        {token && <AuthModal type='reset-password' token={token} />}
        <div className='w-10/12 space-y-6 px-4 pt-4 mb-10'>
          <div className='flex justify-center'>
            <div className=' flex justify-center items-center gap-3 w-1/2'>
              <hr className='h-px w-full' />
              {t('or')}
              <hr className='h-px w-full' />
            </div>
          </div>
          <LoginGoogle />
        </div>
      </div>
    </div>
  )
}
