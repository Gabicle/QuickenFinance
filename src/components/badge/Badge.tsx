import type { ReactNode } from 'react';
import styles from './Badge.module.css';
import clsx from 'clsx';


export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "info";


type Props = {

  children: ReactNode;
  variant?: BadgeVariant;
}


export default function Badge({
  children, variant = "neutral",
}: Props) {

  const variantClass = {
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger,
    neutral: styles.badgeNeutral,
    info: styles.badgeInfo,
  }[variant];



  return (
    <span className={clsx(styles.badge, variantClass)} >
      {children}
    </span>
  )

}