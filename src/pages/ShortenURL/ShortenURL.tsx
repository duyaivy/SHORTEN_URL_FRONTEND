import { useRecapchaMutation, useShortenUrlMutation } from '@/apis/url.api'
import InputPassword from '@/components/InputPassword/InputPassword'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AppContext } from '@/contexts/app.context'
import { useHandleError } from '@/utils/handleErrorAPI'
import { ShortenURLSchema, ShortenURLSchemaType } from '@/zod/url.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ExternalLink, Link2 } from 'lucide-react'
import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ReturnValue from './ReturnValue'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/helpers/key-tanstack'
import ReCAPTCHA from 'react-google-recaptcha'
import config from '@/constants/config.const'
import { Toast } from '@/utils/toastMessage'

export default function ShortenURL() {
  const { t } = useTranslation()
  const { isAuthenticated } = useContext(AppContext)
  const queryClient = useQueryClient()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const useRecaptcha = useRecapchaMutation({
    onError: (error: any) => {
      Toast.error({ description: error.response?.data.message })
    }
  })
  const form = useForm<ShortenURLSchemaType>({
    resolver: zodResolver(ShortenURLSchema()),
    defaultValues: {
      url: '',
      alias: '',
      password: ''
    }
  })
  const { handleErrorAPI } = useHandleError()
  const shortenLinkMutation = useShortenUrlMutation({
    onError: (error) => handleErrorAPI(error, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.myUrls] })
    }
  })
  const handleSubmit = async () => {
    const recapchaValue = await recaptchaRef.current?.executeAsync()
    recaptchaRef.current?.reset()
    if (recapchaValue) {
      try {
        await useRecaptcha.mutateAsync(recapchaValue)
        const data = { ...form.getValues(), password: form.getValues('password') || undefined }
        shortenLinkMutation.mutate(data)
      } catch (error: any) {
        Toast.error({ description: error.response?.data.message })
      }
    }
  }
  const handleReset = () => {
    form.reset()
  }
  return (
    <div className='max-w-3xl mx-auto '>
      <div className='flex justify-center flex-col items-center min-w-sm sm:min-w-xl md:min-w-2xl'>
        <h1 className='text-xl md:text-3xl font-semibold  mb-2'>{t('shorten_link')}</h1>
        <p className='text-center text-white mb-6 text-muted-foreground'>{t('shorten_link_description')}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onReset={handleReset}
            className='w-10/12 space-y-2 px-4'
            noValidate
          >
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('url')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder={t('url_placeholder')}
                      type='url'
                      {...field}
                      icon={<Link2 />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'alias'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('alias')}</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' placeholder={t('alias_placeholder')} {...field} icon={<ExternalLink />} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isAuthenticated && (
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <InputPassword autoComplete='off' placeholder={t('password_url_placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey={config.siteKeyCapcha} />
            <div className='flex w-full gap-2 items-center my-10'>
              <Button
                type='reset'
                className='min-w-20 h-12 text-lg cursor-pointer  bg-transparent py-3 border-2 border-white text-white duration-300 hover:shadow-lg'
              >
                {t('clear')}
              </Button>
              <Button
                loading={shortenLinkMutation.isPending}
                className='w-full flex-1 text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg '
                type='submit'
              >
                {t('shorten_link')}
              </Button>
            </div>
          </form>
        </Form>
      </div>{' '}
      {shortenLinkMutation.isSuccess && (
        <ReturnValue
          qr_code_link={shortenLinkMutation.data?.data.data.qr_code}
          short_url={shortenLinkMutation.data?.data.data.short_url}
        />
      )}
    </div>
  )
}
