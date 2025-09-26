import { NavLink } from "react-router-dom";
import type { MenuItem } from "./MenuItem";
import Icon from "../../icon/Icon";
import s from "./SidebarMenu.module.css";

type SidebarMenuProps = {
  headerTitle?: string;
  menuItems: MenuItem[];
};

export default function SidebarMenu({ headerTitle, menuItems }: SidebarMenuProps) {
  return (
    <div className={s.menu_container}>
      {headerTitle && (
        <div className={s.menu_header}>
          <p className="text-sm-md uppercase">{headerTitle}</p>
        </div>
      )}

      <nav className={s.menu_items}>
        {menuItems.map((item) => (
          <MenuItem key={item.to} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ to, label, icon }: MenuItem) {
  return (
    <NavLink to={to} className={s.menu_item}>
      {icon && (
        <Icon size="md" className={s.icon}>
          {icon}
        </Icon>
      )}
      <span className={s.label}>{label}</span>
    </NavLink>
  );
}
