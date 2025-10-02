import Icon from "../components/icon/Icon";

import type { User } from "../context/UserContext";
import ProfileAvatar from "../icons/ProfileAvatar";
import s from './Header.module.css';
export type HeaderProps = {
  title: string;
  user: User;
};

export default function Header({ title, user }: HeaderProps) {
  return (
    <header className={s.header}>
      <p className='text-md-md'>
        Home /
        <span className={s.page_title}> {title}</span>
      </p>
      {/* Actions */}
      <div className={s.actions_toolbar}>
        {/* <Icon size="md"><SvgBell05 /></Icon> */}
        <Icon glyph={ProfileAvatar} size="lg" color="brand" decorative />

        <div className={s.profile_container}>
          <span className={s.profile_name}>
            {user.firstName} {user.lastName}
          </span>
          <span className='text-sm-regular'>{user.type}</span>
        </div>



      </div>
    </header>
  );
}