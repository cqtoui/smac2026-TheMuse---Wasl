import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/lib/SettingsContext';
import { useT } from '@/i18n';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Bell, Check, Settings as SettingsIcon, Loader2, MessageSquare, FileText, Sparkles } from 'lucide-react';

const ICONS = [MessageSquare, Check, FileText, Sparkles];
const ROUTES = ['/agreements', '/agreements', '/agreements', '/insights'];

export default function NotificationsBell() {
  const { settings, updateSetting } = useSettings();
  const { t } = useT();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [enableOpen, setEnableOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [readIds, setReadIds] = useState([]);

  const titles = t('notif.samples');
  const SAMPLE = titles.map((title, i) => ({ id: i + 1, title, route: ROUTES[i], Icon: ICONS[i] }));

  const onBell = () => { if (settings.notifications_enabled) setPanelOpen(true); else setEnableOpen(true); };

  const enable = async () => {
    setEnabling(true);
    try {
      if ('Notification' in window && Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') {
          toast({ title: t('notif.title'), description: t('notif.enabledDesc') });
        }
      }
      await updateSetting('notifications_enabled', true);
      setEnableOpen(false);
      toast({ title: t('settings.notifEnabled') });
    } catch (e) {
      toast({ title: t('notif.unableEnable'), description: t('notif.tryAgain'), variant: 'destructive' });
    }
    setEnabling(false);
  };

  const markAllRead = () => setReadIds(SAMPLE.map((s) => s.id));
  const unread = SAMPLE.filter((s) => !readIds.includes(s.id)).length;

  return (
    <>
      <button onClick={onBell} className="relative w-9 h-9 rounded-full bg-wasl-soft flex items-center justify-center active:scale-90 transition-transform" aria-label={t('notif.title')}>
        <Bell size={18} className="text-wasl-navy" strokeWidth={1.8} />
        {(settings.notifications_enabled && unread > 0) && <span className="absolute top-1 right-1.5 w-2.5 h-2.5 rounded-full bg-wasl-primary ring-2 ring-white" />}
      </button>

      <Sheet open={enableOpen} onOpenChange={setEnableOpen}>
        <SheetContent side="bottom" className="rounded-t-[24px] max-w-md mx-auto w-full px-5 pb-8 pt-5">
          <SheetHeader className="text-center items-center"><SheetTitle className="text-lg font-bold text-wasl-navy">{t('notif.title')}</SheetTitle></SheetHeader>
          <p className="text-sm text-wasl-gray text-center mt-3 leading-relaxed">{t('notif.enableDesc')}</p>
          <div className="mt-5 space-y-3">
            <button onClick={enable} disabled={enabling} className="wasl-btn-primary text-base flex items-center justify-center gap-2">
              {enabling && <Loader2 size={18} className="animate-spin" />}
              {enabling ? t('notif.enabling') : t('notif.enable')}
            </button>
            <button onClick={() => setEnableOpen(false)} className="w-full py-3.5 rounded-xl text-sm font-semibold text-wasl-gray active:scale-[0.98] transition-transform">{t('notif.notNow')}</button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent side="bottom" className="rounded-t-[24px] max-w-md mx-auto w-full px-5 pb-8 pt-5">
          <SheetHeader className="text-center items-center"><SheetTitle className="text-lg font-bold text-wasl-navy">{t('notif.title')}</SheetTitle></SheetHeader>
          <div className="flex items-center justify-between mt-4">
            <button onClick={markAllRead} className="text-sm text-wasl-primary font-medium">{t('notif.markAllRead')}</button>
            <button onClick={() => { setPanelOpen(false); navigate('/settings'); }} className="flex items-center gap-1.5 text-sm text-wasl-gray font-medium active:scale-95 transition-transform">
              <SettingsIcon size={15} />{t('notif.notifSettings')}
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {SAMPLE.map((n) => {
              const unreadItem = !readIds.includes(n.id);
              return (
                <button key={n.id} onClick={() => { setReadIds((prev) => [...prev, n.id]); setPanelOpen(false); navigate(n.route); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#F5FAFE] active:bg-wasl-soft transition-colors text-start">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0"><n.Icon size={17} className="text-wasl-primary" strokeWidth={1.8} /></div>
                  <span className="text-sm text-wasl-navy font-medium flex-1">{n.title}</span>
                  {unreadItem && <span className="w-2 h-2 rounded-full bg-wasl-primary flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}