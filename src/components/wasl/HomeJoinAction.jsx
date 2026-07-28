import React from 'react';
import { KeyRound } from 'lucide-react';
import { useT } from '@/i18n';

export default function HomeJoinAction({ onClick }) {
  const { t } = useT();
  return (
    <button onClick={onClick} className="block w-full bg-white rounded-[20px] border-2 border-wasl-primary/20 shadow-sm active:scale-[0.99] transition-transform text-start">
      <div className="flex items-center gap-4 p-5">
        <div className="w-12 h-12 rounded-2xl bg-wasl-soft flex items-center justify-center flex-shrink-0">
          <KeyRound size={22} className="text-wasl-primary" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-wasl-navy leading-tight">{t('home.joinTitle')}</h2>
          <p className="text-wasl-gray text-sm mt-1 leading-snug">{t('home.joinDesc')}</p>
        </div>
      </div>
    </button>
  );
}