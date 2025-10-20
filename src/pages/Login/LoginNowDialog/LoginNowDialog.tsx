'use client'

import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { path } from '@/constants/path'
interface LoginNowDialogProps {
  trigger?: ReactNode
  handleEvent?: any
}
export default function LoginNowDialog({ trigger, handleEvent }: LoginNowDialogProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const loginFeatures = [
    t('login_feature_unlimited_time'),
    t('login_feature_password'),
    t('login_feature_edit_link'),
    t('login_feature_history')
  ]

  const guestFeatures = [t('guest_feature_2weeks'), t('guest_feature_history'), t('guest_feature_edit')]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ? trigger : null}</DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-semibold'>{t('login_now_title')}</DialogTitle>
          <DialogDescription className='text-center text-white'>{t('login_now_description')}</DialogDescription>
        </DialogHeader>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='border rounded-2xl p-5'>
            <div className=''>
              <h3 className='text-main font-semibold text-center mb-3 flex flex-col justify-between'>
                {t('login_title')}
              </h3>
              <ul className='space-y-2'>
                {loginFeatures.map((item) => (
                  <li key={item} className='flex items-center gap-2 '>
                    <CheckCircle className='w-4 h-4 text-green-500 shrink-0' /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant='outline'
              className='mt-5 w-full border-main text-main hover:bg-main hover:text-black duration-300 cursor-pointer'
              onClick={() => {
                setOpen(false)
                navigate(path.login)
              }}
            >
              {t('login')}
            </Button>
          </div>

          <div className='border rounded-2xl p-5 flex flex-col justify-between'>
            <div className=''>
              <h3 className='text-main font-semibold text-center mb-3 '>{t('guest_title')}</h3>

              <ul className='space-y-2'>
                {guestFeatures.map((item) => (
                  <li key={item} className='flex items-center gap-2 '>
                    <XCircle className='size-4 text-red-500 shrink-0' /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              className='mt-5 w-full border cursor-pointer border-white/200 bg-transparent hover:bg-gray-500 hover:text-white'
              onClick={() => {
                setOpen(false)
                if (handleEvent) {
                  handleEvent()
                }
              }}
            >
              {t('continue_as_guest')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
