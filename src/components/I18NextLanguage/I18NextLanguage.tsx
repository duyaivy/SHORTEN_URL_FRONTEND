import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' }
]

export default function I18NextLanguage() {
  const { i18n } = useTranslation()

  const onChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <Select value={i18n.language} onValueChange={onChange}>
      <SelectTrigger aria-label='select_language' className='w-30'>
        {languages.find((lang) => lang.value === i18n.language)?.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
