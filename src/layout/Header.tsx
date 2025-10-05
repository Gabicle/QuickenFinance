import Icon from "../components/icon/Icon";
import ProfileAvatar from "../icons/ProfileAvatar";
import type { User } from "../types/User";
import s from "./Header.module.css";

export type HeaderProps = {
  title: string;
  user: User;
};

export default function Header({ title, user }: HeaderProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <header className={s.header}>
      <div className={s.titles}>
        <nav aria-label="Breadcrumb" className={s.breadcrumb}>
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>


      </div>

      {/* Actions */}
      <div className={s.actions_toolbar}>

        <div className={s.avatar} aria-hidden="true">
          <Icon glyph={ProfileAvatar} size="lg" color="brand" decorative />
        </div>

        <div className={s.profile_container}>
          <span className={s.profile_name}>{fullName}</span>
          <span className={s.profile_role}>{user.type}</span>
        </div>
      </div>
    </header>
  );
}
