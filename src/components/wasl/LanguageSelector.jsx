import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useT } from '@/i18n';
import SelectionSheet from '@/components/wasl/SelectionSheet';

export default function LanguageSelector({ inline = false }) {
  const { t, lang, setLanguage } = useT();
  const [open, setOpen] = useState(false);
  const label = lang === 'ar' ? 'العربية' : 'English';
  const options = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  return (
    <>
      {inline ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-wasl-soft bg-white text-sm font-medium text-wasl-navy hover:bg-wasl-pale active:scale-[0.98] transition"
          aria-label={t('lang.title')}
        >
          <Globe size={18} className="text-wasl-primary" />
          <span>{t('lang.title')}: {label}</span>
          <ChevronDown size={14} className="text-wasl-gray" />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-40 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-wasl-soft shadow-sm active:scale-95 transition-transform"
          aria-label={t('lang.title')}
        >
          <Globe size={15} className="text-wasl-primary" />
          <span className="text-sm font-medium text-wasl-navy">{label}</span>
          <ChevronDown size={14} className="text-wasl-gray" />
        </button>
      )}
      <SelectionSheet
        open={open}
        onOpenChange={setOpen}
        title={t('lang.title')}
        options={options}
        value={lang}
        onSelect={setLanguage}
      />
    </>
  );
}