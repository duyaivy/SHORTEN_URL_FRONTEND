import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Mail } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Fragment } from 'react/jsx-runtime'
import { useRegisterSchema } from '@/zod/register.zod'
import { useState } from 'react'
import InputPassword from '@/components/InputPassword/InputPassword'
import { useForgotOrResetPWMutation } from '@/apis/auth.api'

interface AuthModalProps {
  type: 'forgot-password' | 'reset-password'
  token?: string
}

export default function AuthModal({ type, token }: AuthModalProps) {
  const { SentMailSchema, ResetPasswordSchema } = useRegisterSchema()
  const [open, setOpen] = useState<boolean>(type === 'forgot-password' ? false : true)
  const form = useForm<z.infer<typeof SentMailSchema | typeof ResetPasswordSchema>>({
    resolver: type === 'forgot-password' ? zodResolver(SentMailSchema) : (zodResolver(ResetPasswordSchema) as any),
    defaultValues: type === 'forgot-password' ? { email: '' } : { password: '', confirmPassword: '' }
  })
  const { t } = useTranslation()
  const emailConfig = {
    'forgot-password': {
      title: t('forgot_password_title'),
      description: t('forgot_password_description'),
      buttonText: t('forgot_password_button'),
      questionText: t('forgot_password_trigger')
    },
    'reset-password': {
      title: t('forgot_password'),
      description: t('reset_password_description'),
      buttonText: t('reset_password'),
      questionText: t('reset_password_trigger')
    }
  }

  const resetPWMutation = useForgotOrResetPWMutation(form, false, setOpen, token)
  const forgotPWMutation = useForgotOrResetPWMutation(form, true, setOpen)

  const onSubmit = () => {
    if (type === 'forgot-password') {
      forgotPWMutation.mutate()
    } else {
      resetPWMutation.mutate()
    }
  }

  const config = emailConfig[type]
  const isLoading = type === 'forgot-password' ? forgotPWMutation.isPending : resetPWMutation.isPending

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <p className='cursor-pointer hover:underline text-gray-500'>{config.questionText}</p>
      </SheetTrigger>
      <SheetContent side={'bottom'}>
        <div className='max-w-3xl mx-auto min-w-xs sm:min-w-xl md:min-w-2xl flex flex-col items-center'>
          <SheetHeader>
            <SheetTitle>{config.title}</SheetTitle>
            <SheetDescription>{config.description}</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' w-full md:w-xl space-y-4 py-2 ' noValidate>
              {type === 'forgot-password' ? (
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email')} </FormLabel>
                      <FormControl>
                        <Input
                          className='focus:outline-0 mt-1 bg-transparent'
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
              ) : (
                <Fragment>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('password')} </FormLabel>
                        <FormControl>
                          <InputPassword
                            className='focus:outline-0 mt-1 bg-transparent'
                            placeholder={t('password_placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('confirm_password')} </FormLabel>
                        <FormControl>
                          <InputPassword
                            className='focus:outline-0 mt-1 bg-transparent'
                            placeholder={t('confirm_password_placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Fragment>
              )}

              <Button
                loading={isLoading}
                className='w-full text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg '
                type='submit'
              >
                {config.buttonText}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
