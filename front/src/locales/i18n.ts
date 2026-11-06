import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import te from './te.json';
import hi from './hi.json';
import ta from './ta.json';
import ml from './ml.json';

const fontMap: Record<string, string> = {
  en: "'Inter', sans-serif",
  te: "'Noto Sans Telugu', 'Inter', sans-serif",
  hi: "'Noto Sans Devanagari', 'Inter', sans-serif",
  ta: "'Noto Sans Tamil', 'Inter', sans-serif",
  ml: "'Noto Sans Malayalam', 'Inter', sans-serif",
};

export const applyLanguageFont = (lang: string) => {
  const font = fontMap[lang] || fontMap.en;
  document.documentElement.lang = lang;
  document.documentElement.style.fontFamily = font;
  document.body.style.fontFamily = font;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te },
      hi: { translation: hi },
      ta: { translation: ta },
      ml: { translation: ml },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'te', 'hi', 'ta', 'ml'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'farmflow_language',
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Initial font application
const initialLang = i18n.language || 'en';
applyLanguageFont(initialLang);

i18n.on('languageChanged', (lng) => {
  applyLanguageFont(lng);
  localStorage.setItem('farmflow_language', lng);
});

export default i18n;
