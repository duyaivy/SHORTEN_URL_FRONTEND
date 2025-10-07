import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(detector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: ['common', 'message', 'helmet'],
    defaultNS: 'common',
    lng: localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: { escapeValue: false }
  })

export default i18n
