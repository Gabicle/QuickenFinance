
import s from './PageLayout.module.css';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { useUser } from '../context/UserContext';

export default function PageLayout() {
  const { user, loading } = useUser();

  if (loading) {
    return <div className={s.appShell}>Loading user…</div>;
  }

  if (!user) {

    return <div className={s.appShell}>No user found</div>;
  }

  return (
    <div className={s.appShell}>
      <Sidebar />
      <div className={s.main}>
        <Header title="Dash" user={user} />
        <main className={s.layout_container}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}


