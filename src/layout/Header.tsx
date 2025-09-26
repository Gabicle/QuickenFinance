import SvgBell05 from "../components/icons/Bell05";
import s from './Header.module.css';
import type { User } from "./PageLayout";
export type HeaderProps = {
  title: string;
  user: User;
};

export default function Header({ title, user }: HeaderProps) {
  return (
    <header className={s.header}>
      <p className={s.header_title}>Home / <span>{title}</span></p>
      {/* Actions */}
      <div className={s.actions_toolbar}>
        <div className={s.icon_container}>
          <SvgBell05 />
        </div>
        <div className={s.profile_container}>
          <span className={s.profile_name}>
            {user.firstName} {user.lastName}
          </span>
          <span className={s.profile_type}>{user.type}</span>
        </div>



      </div>
    </header>
  );
}