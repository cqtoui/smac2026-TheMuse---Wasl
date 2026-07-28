import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGoBack } from '@/lib/useGoBack';
import { useT } from '@/i18n';

export default function ScreenHeader({ title, onBack, right, fallback = '/' }) {
  const goBack = useGoBack(fallback);
  const { t } = useT();
  return (
    <div className="bg-white px-5 pt-5 pb-3 sticky top-0 z-10 border-b border-wasl-soft">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <button
          onClick={() => (onBack ? onBack() : goBack())}
          className="text-wasl-gray p-1 -ml-1 active:scale-90 transition-transform"
          aria-label={t('common.back')}
        >
          <ArrowLeft size={22} className="flip-rtl" />
        </button>
        <h1 className="text-lg font-bold text-wasl-navy flex-1">{title}</h1>
        {right}
      </div>
    </div>
  );
}