import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { waslApi } from '@/api/waslClient';

const DEFAULTS = {
  display_name: '',
  nickname: '',
  profile_photo: '',
  family_role: '',
  language: 'en',
  notifications_enabled: false,
  notif_invitation: true,
  notif_joined: true,
  notif_perspective: true,
  notif_analysis: true,
  notif_insights: true,
  notif_agreements: true,
  reminder_time: '09:00',
  privacy_save_local: true,
  privacy_analytics: true,
  privacy_hide_previews: false,
  text_size: 'Default',
  high_contrast: false,
  reduce_motion: false,
  theme: 'Light',
  app_icon: 'Default',
  insights_topics: [],
  insights_frequency: '',
  insights_style: '',
  reflection_autolock: 'Immediately',
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    let stored = null;
    try { stored = localStorage.getItem('wasl_lang'); } catch (e) { /* */ }
    try {
      const me = await waslApi.auth.me();
      setUser(me);
      const merged = { ...DEFAULTS, ...(me?.metadata || {}) };
      Object.keys(DEFAULTS).forEach((k) => {
        if (me?.[k] !== undefined && me?.[k] !== null) merged[k] = me[k];
      });
      if (stored) merged.language = stored;
      setSettings(merged);
    } catch (e) {
      const merged = { ...DEFAULTS };
      if (stored) merged.language = stored;
      setSettings(merged);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const language = settings.language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [settings.language]);

  const updateSettings = useCallback(async (patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
    try {
      await waslApi.auth.updateMe(patch);
    } catch (e) {
      /* ignore persistence errors */
    }
  }, []);

  const updateSetting = useCallback((key, value) => updateSettings({ [key]: value }), [updateSettings]);

  const setLanguage = useCallback(async (lang) => {
    try { localStorage.setItem('wasl_lang', lang); } catch (e) { /* */ }
    await updateSettings({ language: lang });
  }, [updateSettings]);

  return (
    <SettingsContext.Provider value={{ user, settings, loading, updateSetting, updateSettings, setLanguage, reload: load }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}