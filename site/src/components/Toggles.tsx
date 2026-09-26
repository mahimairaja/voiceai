import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

// Theme and language switches: Radix ToggleGroup, drawn as shadcn-style segmented controls.

// Theme: the choice lives in localStorage['voiceai-theme'] ('light' | 'dark' | 'auto'; dark
// when unset). Layout.astro applies it before paint and exposes window.__applyTheme.
declare global {
  interface Window {
    __applyTheme?: () => void;
  }
}
type Theme = 'light' | 'dark' | 'auto';
const KEY = 'voiceai-theme';
const readTheme = (): Theme => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'auto' ? v : 'dark';
  } catch {
    return 'dark';
  }
};
const subscribe = (cb: () => void) => {
  window.addEventListener('voiceai-theme', cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener('voiceai-theme', cb);
    window.removeEventListener('storage', cb);
  };
};
const applyTheme = () => {
  window.__applyTheme?.();
  window.dispatchEvent(new Event('voiceai-theme'));
};

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme);
  useEffect(() => {
    if (theme !== 'auto') return;
    const m = matchMedia('(prefers-color-scheme: light)');
    m.addEventListener('change', applyTheme);
    return () => m.removeEventListener('change', applyTheme);
  }, [theme]);
  const items = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
    { value: 'auto', label: 'Auto', Icon: Monitor },
  ] as const;
  return (
    <ToggleGroup.Root
      type="single"
      value={theme}
      aria-label={label}
      className="seg"
      onValueChange={(v) => {
        if (!v) return;
        try {
          localStorage.setItem(KEY, v);
        } catch {
          // storage blocked: nothing persists, the page keeps its theme
        }
        applyTheme();
      }}
    >
      {items.map(({ value, label, Icon }) => (
        <ToggleGroup.Item key={value} value={value} aria-label={label} title={label} className="seg__item seg__item--icon">
          <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

// Language: EN and 中文 are the two READMEs. Switching keeps you on the same page.
export function LangToggle({ lang, en, zh, label }: { lang: 'en' | 'zh'; en: string; zh: string; label: string }) {
  return (
    <ToggleGroup.Root
      type="single"
      value={lang}
      aria-label={label}
      className="seg"
      onValueChange={(v) => {
        if (!v || v === lang) return;
        try {
          localStorage.setItem('voiceai-lang', v);
        } catch {
          // storage blocked
        }
        location.href = (v === 'zh' ? zh : en) + location.hash;
      }}
    >
      <ToggleGroup.Item value="en" lang="en" className="seg__item" aria-label="English">
        EN
      </ToggleGroup.Item>
      <ToggleGroup.Item value="zh" lang="zh-CN" className="seg__item" aria-label="中文">
        中文
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
