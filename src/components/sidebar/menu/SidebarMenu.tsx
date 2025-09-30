import { NavLink } from "react-router-dom";
import type { MenuItem } from "./MenuItem";
import s from "./SidebarMenu.module.css";
import Icon, { type Glyph, type Color } from "../../icon/Icon";

export default function SidebarMenu({ headerTitle, menuItems }: {
  headerTitle?: string;
  menuItems: MenuItem[];
}) {
  return (
    <div className={s.menu_container}>
      {headerTitle && (
        <div className={s.menu_header}>
          <p className="text-sm-md uppercase">{headerTitle}</p>
        </div>
      )}
      <nav className={s.menu_items}>
        {menuItems.map((item) => (
          <Item key={item.to} {...item} />
        ))}
      </nav>
    </div>
  );
}

function Item({ to, label, icon, iconColor }: MenuItem) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${s.menu_item} ${isActive ? s.active : ""}`
      }
    >
      {icon && <MenuIcon icon={icon} iconColor={iconColor} />}
      <span
        className={`text-md-md ${iconColor === "danger" ? s.text_danger : ""}`}
      >
        {label}
      </span>
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
