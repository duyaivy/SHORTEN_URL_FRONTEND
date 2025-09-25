import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useTranslation } from 'react-i18next'
import { Edit, ExternalLink, Link2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ShortenURLSchema, ShortenURLSchemaType } from '@/zod/url.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import InputPassword from '../InputPassword/InputPassword'
import { URL } from '@/models/interface/url.interface'
import { useState } from 'react'

interface UpdateUrlDialogProps {
  onUpdate?: (alias: string, url: URL) => void
  isOnUpdate?: boolean
  url: URL
}

export default function UpdateUrlDialog({ onUpdate, isOnUpdate = false, url }: UpdateUrlDialogProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<ShortenURLSchemaType>({
    resolver: zodResolver(ShortenURLSchema()),
    defaultValues: {
      url: url?.url || '',
      alias: url?.alias || '',
      password: ''
    }
  })
  const handleSubmit = (data: ShortenURLSchemaType) => {
    onUpdate?.(url.alias as string, { ...url, ...data, password: data.password || undefined })
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button disabled={isOnUpdate} className='p-2 duration-300 cursor-pointer text-blue-500 hover:text-blue-600'>
          <Edit className='size-5 md:size-6' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('update_url_title')}</DialogTitle>
          <DialogDescription>{t('update_url_description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full space-y-2 ' noValidate>
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
            <DialogFooter>
              <DialogClose>{t('cancel')}</DialogClose>
              <Button
                loading={isOnUpdate}
                type='submit'
                className=' text-lg cursor-pointer h-12  py-3 border-2 bg-main text-black duration-300 hover:shadow-lg '
              >
                {t('update')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
