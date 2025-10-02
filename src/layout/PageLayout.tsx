import s from './PageLayout.module.css';
import Header from "./Header";
import { Outlet, useMatches } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { useUser } from '../context/UserContext';
import { useMemo, useState } from 'react';

export default function PageLayout() {
  const { user, loading } = useUser();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title = (active?.handle as { title?: string } | undefined)?.title ?? "Portfolio";

  const appShellClass = useMemo(
    () => `${s.appShell} ${sidebarExpanded ? s.appShell_lg : `${s.appShell_sm} ${s.collapsed}`}`,

    [sidebarExpanded]
  );


  if (loading) return <div className={s.appShell}>Loading user…</div>;
  if (!user) return <div className={s.appShell}>No user found</div>;

  return (
    <div className={appShellClass}>
      <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(v => !v)} />
      <div className={s.main}>
        <Header title={title} user={user} />
        <main className={s.layout_container}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
