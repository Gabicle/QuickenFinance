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
  size?: BadgeSize;

}


export type BadgeSize = "sm" | "md" | "lg";





export default function Badge({
  children, variant = "neutral",
  size = "sm",

}: Props) {

  const sizeClass = {
    sm: "text-sm-md",
    md: "text-md-md",
    lg: "text-lg-md"
  }[size];

  const variantClass = {
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger,
    neutral: styles.badgeNeutral,
    info: styles.badgeInfo,
  }[variant];



  return (
    <span className={clsx(styles.badge, variantClass, sizeClass)} >
      {children}
    </span>
  )

}