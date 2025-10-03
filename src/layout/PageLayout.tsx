import { useEffect, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import clsx from 'clsx';

import { useUser } from '../hooks/useUser';
import Sidebar from '../components/sidebar/Sidebar';
import Header from './Header';

import styles from './PageLayout.module.css';

type RouteHandle = { title?: string };

export default function PageLayout() {
  const { data: user, isLoading, error } = useUser();

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => {
    // NOTE: For production apps with real users, it’s better to scope this
    // setting per user (e.g., `sidebarExpanded:${user.id}`) so different accounts
    // don’t overwrite each other’s preferences. Here we mock users via MSW,
    // so we keep a single global key to avoid cluttering storage.
    const saved = localStorage.getItem('sidebarExpanded');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded));
  }, [sidebarExpanded]);

  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title =
    (active?.handle as RouteHandle | undefined)?.title ?? 'Portfolio';

  const appShellClass = clsx(
    styles.appShell,
    sidebarExpanded ? styles.appShell_lg : [styles.appShell_sm, styles.collapsed],
  );

  if (isLoading) return <div className={styles.appShell}>Loading user…</div>;
  if (error) return <div className={styles.appShell}>Error: {error.message}</div>;
  if (!user) return <div className={styles.appShell}>No user found</div>;

  return (
    <div className={appShellClass}>
      <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(v => !v)} />
      <div className={styles.main}>
        <Header title={title} user={user} />
        <main className={styles.layout_container}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
