import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../locales/en/translation.json';
import translationVN from '../locales/vi/translation.json';

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'vi',
    resources: {
      en: {
        translation: translationEN,
      },
      vi: {
        translation: translationVN,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
