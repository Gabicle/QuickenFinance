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

export default function Sidebar() {
  return (
    <div className={s.sidebar_container}>
      <div className={s.sidebar_header}>
        <div className={s.sidebar_logoTitle}>
          <Logo />
          <h5>Quicken</h5>
        </div>
        <button className={s.sidebar_collapseBtn}>
          <ChevronLeft />
        </button>
      </div>
      <hr />
      <div className={s.sidebar_menu}>
        <SidebarMenu
          headerTitle="MAIN MENU"
          menuItems={[
            { to: '/dashboard', label: 'Dashboard', icon: Home08 },
            { to: '/transactions', label: 'Transactions', icon: CreditCardArrowRight },
            { to: '/invoices', label: 'Invoices', icon: Receipt02 },
            { to: '/wallets', label: 'Wallets', icon: Wallet06 },
          ]}
        />
        <SidebarMenu headerTitle="WORKFLOW"
          menuItems={[
            { to: '/transfer', label: 'Transfer', icon: CurrencyDollarCircle },
            { to: '/pay-bill', label: 'Pay Bill', icon: CreditCardUpload },
            { to: '/deposit', label: 'Deposit', icon: Safe03 },
          ]} />


        <SidebarMenu menuItems={[
          { to: '/settings', label: 'Settings', icon: Gear },
          { to: '/help-center', label: 'Help & Center', icon: Headphone01 },
          { to: '/Logout', label: 'Logout', icon: LogOut05, iconColor: 'danger' },
        ]} />

      </div>
    </ div>
  );
}

