import { NavLink } from "react-router-dom";
import type { MenuItem } from "./MenuItem";
import s from "./SidebarMenu.module.css";
import Icon, { type Glyph, type Color } from "../../icon/Icon";

export default function SidebarMenu({ headerTitle, menuItems, collapsed = false }: {
  headerTitle?: string;
  menuItems: MenuItem[];
  collapsed?: boolean;
}) {
  return (
    <div className={s.menu_container}>
      {headerTitle && !collapsed && (
        <div className={s.menu_header}>
          <p className="text-sm-md uppercase">{headerTitle}</p>
        </div>
      )}
      <nav className={`${s.menu_items} ${collapsed ? s.collapsed : ""}`}>
        {menuItems.map((item) => (
          <Item key={item.to} collapsed={collapsed} {...item} />
        ))}
      </nav>
    </div>
  );
}

function Item({
  to,
  label,
  icon,
  iconColor,
  collapsed,
}: MenuItem & { collapsed?: boolean }) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}  /* tooltip when collapsed */
      className={({ isActive }) =>
        `${s.menu_item} ${isActive ? s.active : ""} ${collapsed ? s.iconOnly : ""}`
      }
    >
      {icon && <MenuIcon icon={icon} iconColor={iconColor} />}
      {!collapsed && (
        <span
          className={`text-md-md ${iconColor === "danger" ? s.text_danger : ""}`}
        >
          {label}
        </span>
      )}

    </NavLink>
  );
}

function MenuIcon({
  icon,
  iconColor = "muted",
}: {
  icon: Glyph;
  iconColor?: Color;
}) {
  return <Icon glyph={icon} color={iconColor} />;
}
