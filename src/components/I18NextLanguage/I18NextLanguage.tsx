import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslation } from 'react-i18next'

const languages = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' }
]

export default function I18NextLanguage() {
  const { i18n } = useTranslation()

  const onChange = (value: string) => {
    i18n.changeLanguage(value)
    console.log('Language changed:', value)
  }

  return (
    <Select value={i18n.language} onValueChange={onChange}>
      <SelectTrigger className='w-30'>
        <SelectValue placeholder={languages.find((lang) => lang.value === i18n.language)?.label} />
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
