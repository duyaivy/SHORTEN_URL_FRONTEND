import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { path } from '@/constants/path'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useRegisterMutation } from '@/apis/auth.api'
import InputPassword from '@/components/InputPassword/InputPassword'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Mail } from 'lucide-react'
import { logo } from '@/assets/images'
import { useHandleError } from '@/utils/handleErrorAPI'
import { useRegisterSchema } from '@/zods/register.zod'

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { RegisterSchema } = useRegisterSchema()
  const { handleErrorAPI } = useHandleError()
  const [isConfirm, setIsconfirm] = useState<boolean>(false)
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const mutationRegister = useRegisterMutation({ handleError: (error) => handleErrorAPI(error, form) })
  const handleRegister = async () => {
    const { email, password } = form.getValues()
    await mutationRegister.mutateAsync({ email, password })
    navigate(path.login)
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='flex justify-center flex-col items-center min-w-sm sm:min-w-xl md:min-w-2xl'>
        <Link to={path.home}>
          <img src={logo} alt='logo' className='hidden md:block mb-4 h-20' />
        </Link>
        <h1 className='text-xl md:text-3xl font-semibold  mb-6'>{t('register')}</h1>
        <div className='flex items-center justify-start gap-2 mb-4'>
          <p className='text-md text-left'>{t('register_description')}</p>
          <Link to={path.home} className='text-main text-sub1 font-bold'>
            ShortLink
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className='w-10/12  space-y-2 px-4' noValidate>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder={t('email_placeholder')}
                      type='email'
                      {...field}
                      icon={<Mail />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <InputPassword autoComplete='off' placeholder={t('password_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />

                  <div className='flex flex-col text-sub2 text-gray'>
                    <h4 className=''>{t('password_description')}</h4>
                    <ul className='flex flex-col '>
                      <li>- {t('password_description_1')}</li>
                      <li>- {t('password_description_2')}</li>
                    </ul>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('confirm_password')}</FormLabel>
                  <FormControl>
                    <InputPassword placeholder={t('confirm_password_placeholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <div className='flex items-center justify-center space-x-2'>
                <Checkbox
                  onClick={() => setIsconfirm((prev) => !prev)}
                  checked={isConfirm}
                  id='terms'
                  className='cursor-pointer w-4 h-4'
                />
                <Label htmlFor='terms' className='text-base font-normal text-gray-500 cursor-default'>
                  {t('common:agree')}{' '}
                  <span className='text-white hover:underline cursor-pointer'>{t('common:terms')}</span>{' '}
                  {t('common:and')}{' '}
                  <span className='text-white hover:underline cursor-pointer '>{t('common:privacy_policy')}</span>
                </Label>
              </div>
            </div>
            <Button
              loading={mutationRegister.isPending}
              className='w-full text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg '
              type='submit'
              disabled={!isConfirm}
            >
              {t('create_account_button')}
            </Button>
            {/* <SentEmail type='verification' /> */}
            <p className='flex items-center justify-center '>
              {t('have_account')}?&nbsp;
              <Link to={path.login} className='cursor-pointer  text-main hover:underline '>
                {t('login')}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
