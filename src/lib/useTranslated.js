import { useMemo } from 'react';
import { useT } from '@/i18n';

const LOCAL_TRANSLATIONS = {
  ar: {
    'Take turns': 'تبادل الأدوار',
    'Pause and listen': 'توقف واستمع',
    'Family discussion': 'نقاش عائلي',
    'Shared concern': 'الاهتمام المشترك',
    'Screen time': 'وقت الشاشات',
    'Responsibilities': 'المسؤوليات',
    'Family time': 'وقت العائلة',
  },
};

export function translateText(lang, text) {
  if (!text || lang === 'en') return Promise.resolve(text);
  return Promise.resolve(LOCAL_TRANSLATIONS[lang]?.[text] || text);
}

export function useTranslated(text) {
  const { lang } = useT();
  return useMemo(() => {
    if (!text || lang === 'en') return text;
    return LOCAL_TRANSLATIONS[lang]?.[text] || text;
  }, [lang, text]);
}
