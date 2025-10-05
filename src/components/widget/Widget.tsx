import type { ReactNode } from 'react';
import styles from './Widget.module.css';

import Icon, { type Glyph } from '../icon/Icon';


type WidgetProps = {
  title: string;
  icon?: Glyph;
  actions?: ReactNode;
  children: ReactNode;
}

export default function Widget({ title, icon, actions, children }: WidgetProps) {
  return (
    <section className={styles.widget_container}>
      <div className={styles.widget_header}>

        <div className={styles.widget_header_title}>

          {icon && <Icon size='lg' glyph={icon} />}
          <span className='text-lg-md'>{title}</span>
        </div>

        <div className={styles.widget_actions}>
          {actions}
        </div>

      </div>

      <div className={styles.widget_content}>
        {children}
      </div>

    </section>
  )
}