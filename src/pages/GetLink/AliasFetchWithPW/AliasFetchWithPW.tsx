import { useGetShortenUrlMutation } from '@/apis/url.api'
import { alert } from '@/assets/icons'
import InputPassword from '@/components/InputPassword/InputPassword'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { path } from '@/constants/path'
import { useHandleError } from '@/utils/handleErrorAPI'
import { ShortenURLPasswordSchema, ShortenURLPasswordSchemaType } from '@/zod/url.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'
import { useParams } from 'react-router-dom'

export default function AliasFetchWithPW() {
  const { t } = useTranslation()
  const { handleErrorAPI } = useHandleError()
  const { alias } = useParams<{ alias: string }>()
  const form = useForm<ShortenURLPasswordSchemaType>({
    resolver: zodResolver(ShortenURLPasswordSchema()),
    defaultValues: {
      password: ''
    }
  })
  const getShortenUrlMutation = useGetShortenUrlMutation({
    onSuccess: (data) => {
      window.location.href = data.data.data.url || path.home
    },
    onError: (error) => handleErrorAPI(error, form)
  })
  const handleSubmit = () => {
    if (alias) {
      const { password } = form.getValues()
      getShortenUrlMutation.mutate({ alias, password })
    }
  }
  return (
    <div className='max-w-3xl mx-auto '>
      <div className='flex justify-center flex-col items-center min-w-sm sm:min-w-xl md:min-w-2xl'>
        <h1 className='text-xl md:text-3xl font-semibold  mb-2'>
          <Lottie className='size-30' animationData={alert} play loop />
        </h1>
        <p className='text-center text-white mb-6 text-muted-foreground'>{t('get_link_pw_description')}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-10/12 space-y-2 px-4' noValidate>
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
                </FormItem>
              )}
            />
            <div className='flex w-full gap-2 items-center my-10'>
              <Button
                loading={getShortenUrlMutation.isPending}
                className='w-full flex-1 text-lg cursor-pointer h-12 bg-transparent py-3 border-2 border-main text-main duration-300 hover:shadow-lg '
                type='submit'
              >
                {t('access')}
              </Button>
            </div>
          </form>
        </Form>
      </div>{' '}
    </div>
  )
}
