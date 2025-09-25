import type { ReactNode } from "react";
import s from './Card.module.css';

type CardProps = {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}

export default function Card({ header, content, footer }: CardProps) {
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        {header}
      </div>
      <div className={s.card_content}>
        {content}
      </div>
      <div className={s.card_footer}>
        {footer}
      </div>
    </div>
  )

}


