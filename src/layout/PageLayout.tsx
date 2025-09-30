import s from './PageLayout.module.css';
import Header from "./Header";
import { Outlet, useMatches } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { useUser } from '../context/UserContext';

export default function PageLayout() {
  const { user, loading } = useUser();
  const matches = useMatches();
  const active = matches[matches.length - 1];
  const title = (active?.handle as { title?: string } | undefined)?.title ?? "Portfolio";

  if (loading) return <div className={s.appShell}>Loading user…</div>;
  if (!user) return <div className={s.appShell}>No user found</div>;

  return (
    <div className={s.appShell}>
      <Sidebar />
      <div className={s.main}>
        <Header title={title} user={user} />
        <main className={s.layout_container}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
