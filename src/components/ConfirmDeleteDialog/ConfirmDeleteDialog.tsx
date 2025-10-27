import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { FormEvent, ReactNode, useState } from 'react'
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

interface ConfirmDeleteDialogProps {
  children: ReactNode
  requiredText: string
  onConfirm?: () => void
}

export default function ConfirmDeleteDialog({ requiredText, onConfirm, children }: ConfirmDeleteDialogProps) {
  const [input, setInput] = useState('')
  const { t } = useTranslation()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input === requiredText) {
      onConfirm?.()
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('confirm_delete_title')}</DialogTitle>
          <DialogDescription>{t('confirm_delete_description', { requiredText })}</DialogDescription>
        </DialogHeader>
        <form className='space-y-2' onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('confirm_delete_placeholder', { requiredText })}
            className='mt-4'
          />

          <DialogFooter>
            <DialogClose>{t('cancel')}</DialogClose>
            <Button
              className=' text-lg cursor-pointer h-12  py-3 border-2 bg-main text-black duration-300 hover:shadow-lg '
              disabled={input !== requiredText}
            >
              {t('delete')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
