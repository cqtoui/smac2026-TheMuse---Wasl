import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useT } from '@/i18n';

export default function HomePrimaryAction() {
  const { t } = useT();
  return (
    <Link to="/conversation/new" className="block w-full bg-white rounded-[20px] border border-[#EAF4FC] shadow-sm active:scale-[0.99] transition-transform">
      <div className="flex items-center gap-4 p-5">
        <div className="w-14 h-14 rounded-2xl bg-wasl-soft flex items-center justify-center flex-shrink-0">
          <MessageCircle size={26} className="text-wasl-primary" strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-wasl-navy leading-tight">{t('home.startTitle')}</h2>
          <p className="text-wasl-gray text-sm mt-1 leading-snug max-w-[200px]">{t('home.startDesc')}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-wasl-primary flex items-center justify-center flex-shrink-0">
          <ArrowRight size={18} className="text-white flip-rtl" strokeWidth={2.2} />
        </div>
      </div>
    </Link>
  );
}