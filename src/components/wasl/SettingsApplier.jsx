import React, { useEffect } from 'react';
import { useSettings } from '@/lib/SettingsContext';

export default function SettingsApplier() {
  const { settings } = useSettings();

  useEffect(() => {
    const map = { Small: 'small', Default: 'default', Large: 'large', 'Extra large': 'extralarge' };
    document.documentElement.dataset.textSize = map[settings.text_size] || 'default';
  }, [settings.text_size]);

  useEffect(() => {
    document.body.classList.toggle('reduce-motion', settings.reduce_motion);
  }, [settings.reduce_motion]);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', settings.high_contrast);
  }, [settings.high_contrast]);

  useEffect(() => {
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = settings.language || 'en';
  }, [settings.language]);

  useEffect(() => {
    const apply = (dark) => document.documentElement.classList.toggle('dark', dark);
    if (settings.theme === 'Dark') {
      apply(true);
    } else if (settings.theme === 'Light') {
      apply(false);
    } else {
      // System default
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches);
      const handler = (e) => apply(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [settings.theme]);

  return null;
}