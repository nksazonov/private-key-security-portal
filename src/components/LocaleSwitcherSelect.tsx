'use client';

import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    
    // Save current scroll position to localStorage before changing language
    if (typeof window !== 'undefined') {
      const scrollPosition = window.scrollY;
      localStorage.setItem('scrollPosition', scrollPosition.toString());
      localStorage.setItem('lastPath', pathname);
    }
    
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className='relative text-gray-600 px-2 flex items-center'
    >
      <span className="sr-only">{label}</span>
      <select
        className="inline-flex appearance-none bg-transparent py-2 pl-2 pr-6 text-blue-900 hover:text-blue-700 transition-colors rounded border border-gray-300"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-[10px]">⌄</span>
    </label>
  );
}
