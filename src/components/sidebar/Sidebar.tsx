import SvgChevronLeft from '../icons/ChevronLeft';
import SvgPiggyBank01 from '../icons/PiggyBank01';
import Logo from '../logo/Logo';
import s from './Sidebar.module.css';
import SidebarMenu from './menu/SidebarMenu';
import SidebarSearch from './search/SidebarSearch';

export default function Sidebar() {
  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_header}>
        <div className={s.sidebar_logoTitle}>
          <Logo />
          <h5>Quicken</h5>
        </div>
        <button className={s.sidebar_collapseBtn}>
          <SvgChevronLeft />
        </button>
      </div>
      <hr />
      <SidebarSearch />
      <div className={s.sidebar_menu}>
        <SidebarMenu
          headerTitle="MAIN MENU"
          menuItems={[
            { to: '/dashboard', label: 'Dashboard', icon: <SvgPiggyBank01 /> },
            { to: '/transactions', label: 'Transactions', icon: <SvgPiggyBank01 /> },
            { to: '/invoices', label: 'Invoices', icon: <SvgPiggyBank01 /> },
          ]}
        />

      </div>
    </ div>
  );
}
