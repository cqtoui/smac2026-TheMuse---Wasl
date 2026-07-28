import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { waslApi } from '@/api/waslClient';
import { useT } from '@/i18n';
import HomePrimaryAction from '@/components/wasl/HomePrimaryAction';
import NotificationsBell from '@/components/wasl/NotificationsBell';
import UserAvatar from '@/components/wasl/UserAvatar';
import HomeJoinAction from '@/components/wasl/HomeJoinAction';
import JoinConversationModal from '@/components/wasl/JoinConversationModal';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useT();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await waslApi.auth.me();
        setUser(me);
      } catch (e) { /* */ }
      setLoading(false);
    };
    loadData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.greetingMorning');
    if (hour < 17) return t('home.greetingAfternoon');
    return t('home.greetingEvening');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5FAFE]">
        <div className="w-7 h-7 border-[3px] border-wasl-soft border-t-wasl-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5FAFE] pb-24">
      <header className="bg-white px-6 pt-6 pb-5">
        <div className="max-w-md mx-auto flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-wasl-gray">{getGreeting()}</p>
            <h1 className="text-[26px] leading-[1.25] font-bold text-wasl-navy mt-1">{t('home.heading')}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <NotificationsBell />
            <UserAvatar user={user} size="sm" />
          </div>
        </div>
      </header>

      <main className="px-6 max-w-md mx-auto">
        <div className="mt-5"><HomePrimaryAction /></div>
        <div className="mt-4"><HomeJoinAction onClick={() => setJoinOpen(true)} /></div>


      </main>

      <JoinConversationModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}