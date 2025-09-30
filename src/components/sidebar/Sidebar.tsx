import Logo from '../logo/Logo';
import s from './Sidebar.module.css';
import SidebarMenu from './menu/SidebarMenu';

import ChevronLeft from '../../icons/ChevronLeft';
import Home08 from '../../icons/Home08';
import CreditCardArrowRight from '../../icons/CreditCardArrowRight';
import Receipt02 from '../../icons/Receipt02';
import Wallet06 from '../../icons/Wallet06';
import CurrencyDollarCircle from '../../icons/CurrencyDollarCircle';
import CreditCardUpload from '../../icons/CreditCardUpload';
import Safe03 from '../../icons/Safe03';
import Gear from '../../icons/Gear';
import Headphone01 from '../../icons/Headphone01';
import LogOut05 from '../../icons/LogOut05';

type SidebarProps = {
  expanded: boolean;
  onToggle: () => void;
};

export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  return (
    <aside className={`${s.sidebar_container} ${expanded ? "" : s.collapsed}`} aria-expanded={expanded}>
      <div className={s.sidebar_header}>
        <div className={s.sidebar_logoTitle}>
          <Logo />
          <h5 className={s.title}>Quicken</h5>
        </div>

        <button
          onClick={onToggle}
          className={s.sidebar_collapseBtn}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-pressed={!expanded}
        >
          <ChevronLeft className={expanded ? "" : s.rotated} />
        </button>
      </div>

      <hr className={s.divider} />

      <div className={s.sidebar_menu}>
        <SidebarMenu
          headerTitle="MAIN MENU"
          collapsed={!expanded}
          menuItems={[
            { to: '/dashboard', label: 'Dashboard', icon: Home08 },
            { to: '/transactions', label: 'Transactions', icon: CreditCardArrowRight },
            { to: '/invoices', label: 'Invoices', icon: Receipt02 },
            { to: '/wallets', label: 'Wallets', icon: Wallet06 },
          ]}
        />

        <SidebarMenu
          headerTitle="WORKFLOW"
          collapsed={!expanded}
          menuItems={[
            { to: '/transfer', label: 'Transfer', icon: CurrencyDollarCircle },
            { to: '/pay-bill', label: 'Pay Bill', icon: CreditCardUpload },
            { to: '/deposit', label: 'Deposit', icon: Safe03 },
          ]}
        />

        <SidebarMenu
          collapsed={!expanded}
          menuItems={[
            { to: '/settings', label: 'Settings', icon: Gear },
            { to: '/help-center', label: 'Help & Center', icon: Headphone01 },
            { to: '/Logout', label: 'Logout', icon: LogOut05, iconColor: 'danger' },
          ]}
        />
      </div>
    </aside>
  );
}
