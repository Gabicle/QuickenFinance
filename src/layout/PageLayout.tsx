import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import clsx from 'clsx';

import { useUser } from '../hooks/useUser';
import Sidebar from '../components/sidebar/Sidebar';
import Header from './Header';

import styles from './PageLayout.module.css';


type RouteHandle = { title?: string };

function readSidebarPref(defaultValue = true): boolean {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = window.localStorage.getItem('sidebarExpanded');
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export default function PageLayout() {
  const { data: user, isLoading, error } = useUser();

  // NOTE: For production apps with real users, it’s better to scope this
  // setting per user (e.g., `sidebarExpanded:${user.id}`) so different accounts
  // don’t overwrite each other’s preferences. Here we mock users via MSW,
  // so we keep a single global key to avoid cluttering storage.
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => readSidebarPref(true));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded));
      } catch {
        /* no-op */
      }
    }
  }, [sidebarExpanded]);

  const matches = useMatches();
  const title = useMemo(() => {
    const active = matches[matches.length - 1];
    return ((active?.handle as RouteHandle | undefined)?.title) ?? 'Portfolio';
  }, [matches]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const appShellClass = clsx(
    styles.appShell,
    sidebarExpanded ? styles.appShell_lg : styles.appShell_sm,
  );

  const handleToggle = useCallback(() => {
    setSidebarExpanded(v => !v);
  }, []);


  const status = isLoading ? 'loading' : error ? 'error' : !user ? 'empty' : 'ready';

  return (
    <div className={appShellClass}>
      <Sidebar expanded={sidebarExpanded} onToggle={handleToggle} />

      {status === 'ready' ? (
        <div className={styles.main}>
          <Header title={title} user={user!} />
          <main className={styles.layout_container}>
            <Outlet />
          </main>
        </div>
      ) : (
        <section
          className={styles.statusPane}
          role="status"
          aria-live="polite"
          aria-busy={status === 'loading' ? true : undefined}
        >
          {status === 'loading' && <p>Loading user…</p>}
          {status === 'error' && (
            <p>
              Error:{' '}
              {error instanceof Error ? error.message : 'Something went wrong.'}
            </p>
          )}
          {status === 'empty' && <p>No user found.</p>}
        </section>
      )}
    </div>
  );

}
