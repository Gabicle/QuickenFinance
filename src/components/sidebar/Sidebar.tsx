import clsx from 'clsx';

import Logo from '../logo/Logo';
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

import styles from './Sidebar.module.css';
import type { MenuItem } from './menu/MenuItem';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

const MAIN_MENU: MenuItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: Home08 },
  { to: '/transactions', label: 'Transactions', icon: CreditCardArrowRight },
  { to: '/invoices', label: 'Invoices', icon: Receipt02 },
  { to: '/wallets', label: 'Wallets', icon: Wallet06 },
];

const WORKFLOW_MENU: MenuItem[] = [
  { to: '/transfer', label: 'Transfer', icon: CurrencyDollarCircle },
  { to: '/pay-bill', label: 'Pay Bill', icon: CreditCardUpload },
  { to: '/deposit', label: 'Deposit', icon: Safe03 },
]

const UTIL_MENU: MenuItem[] = [
  { to: '/settings', label: 'Settings', icon: Gear },
  { to: '/help-center', label: 'Help & Center', icon: Headphone01 },
  { to: '/logout', label: 'Logout', icon: LogOut05, iconColor: 'danger' },
];
export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  const regionId = 'app-sidebar-region';

  return (
    <aside
      className={clsx(styles.sidebar_container, { [styles.collapsed]: !expanded })}
      role='complementary'
      aria-labelledby='sidebar-title'
    >
      <div className={styles.sidebar_header}>
        <div className={styles.sidebar_logoTitle}>
          <Logo aria-hidden />
          <h5 className={styles.title}>Quicken</h5>
        </div>

        <button
          type='button'
          onClick={onToggle}
          className={styles.sidebar_collapseBtn}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={expanded}
          aria-controls={regionId}
        >
          <ChevronLeft className={clsx({ [styles.rotated]: !expanded })} aria-hidden />
        </button>
      </div>

      <hr className={styles.divider} />

      <nav id={regionId} aria-label='Primary'>
        <div className={styles.sidebar_menu}>
          <SidebarMenu
            headerTitle="MAIN MENU"
            collapsed={!expanded}
            menuItems={MAIN_MENU}
          />

          <SidebarMenu
            headerTitle="WORKFLOW"
            collapsed={!expanded}
            menuItems={WORKFLOW_MENU}
          />

          <SidebarMenu
            collapsed={!expanded}
            menuItems={UTIL_MENU}
          />
        </div>
      </nav>

    </aside>
  );
}
