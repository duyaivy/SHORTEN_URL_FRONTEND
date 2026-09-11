import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Link2, Sparkles } from 'lucide-react'

import { ShortenURLSchemaType } from '@/zods/url.zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import InputPassword from '@/components/InputPassword/InputPassword'
import LoginNowDialog from '@/pages/Login/LoginNowDialog'

interface ShortenFormPanelProps {
  form: UseFormReturn<ShortenURLSchemaType>
  isAuthenticated: boolean
  isPending: boolean
  isCustomAlias: boolean
  setIsCustomAlias: (val: boolean) => void
  onSubmit: () => void
  onReset: () => void
}

export default function ShortenFormPanel({
  form,
  isAuthenticated,
  isPending,
  isCustomAlias,
  setIsCustomAlias,
  onSubmit,
  onReset
}: ShortenFormPanelProps) {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-5 w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onReset}
          className='space-y-4'
          noValidate
        >
          {/* Target URL Input */}
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-1.5'>
                <FormLabel className='text-xs md:text-sm font-medium text-white/80'>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='off'
                    placeholder={t('url_placeholder')}
                    type='url'
                    {...field}
                    icon={<Link2 className='size-4 text-white/50' />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Custom Alias Switch Toggle */}
          <div className='flex items-center justify-between p-3.5 rounded-xl border border-white/15 bg-white/5 transition-all'>
            <div className='flex flex-col gap-0.5'>
              <span className='text-xs md:text-sm font-medium text-white/90'>Tùy chỉnh Alias</span>
              <span className='text-[11px] md:text-xs text-white/50'>
                {isCustomAlias ? 'Tự nhập alias tùy chọn cho liên kết' : 'Tắt để hệ thống tự động tạo alias ngẫu nhiên'}
              </span>
            </div>
            <Switch
              checked={isCustomAlias}
              onCheckedChange={(checked) => {
                setIsCustomAlias(checked)
                if (!checked) {
                  form.setValue('alias', '')
                }
              }}
            />
          </div>

          {/* Conditional Custom Alias Input */}
          <AnimatePresence>
            {isCustomAlias && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <FormField
                  control={form.control}
                  name='alias'
                  render={({ field }) => (
                    <FormItem className='space-y-1.5 pt-1'>
                      <FormLabel className='text-xs md:text-sm font-medium text-white/80'>{t('alias')}</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='off'
                          placeholder={t('alias_placeholder')}
                          {...field}
                          icon={<ExternalLink className='size-4 text-white/50' />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Protection Input (for authenticated users) */}
          {isAuthenticated && (
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1.5'>
                  <FormLabel className='text-xs md:text-sm font-medium text-white/80'>{t('password')}</FormLabel>
                  <FormControl>
                    <InputPassword autoComplete='off' placeholder={t('password_url_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Form Action Buttons */}
          <div className='flex gap-3 pt-2'>
            <Button
              type='reset'
              className='min-w-20 h-11 cursor-pointer bg-transparent border border-white/20 text-white/70 hover:border-white hover:text-white rounded-xl duration-200'
            >
              {t('clear')}
            </Button>

            {!isAuthenticated ? (
              <LoginNowDialog
                handleEvent={onSubmit}
                trigger={
                  <Button
                    type='button'
                    loading={isPending}
                    className='flex-1 h-11 cursor-pointer bg-main/15 border border-main text-main hover:bg-main hover:text-black rounded-xl duration-300 font-semibold'
                  >
                    <Sparkles className='size-4 mr-2' />
                    {t('shorten_link')}
                  </Button>
                }
              />
            ) : (
              <Button
                loading={isPending}
                type='submit'
                className='flex-1 h-11 cursor-pointer bg-main/15 border border-main text-main hover:bg-main hover:text-black rounded-xl duration-300 font-semibold'
              >
                <Sparkles className='size-4 mr-2' />
                {t('shorten_link')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
