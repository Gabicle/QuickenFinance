import type { ReactNode } from "react";
import s from './Card.module.css';
import Icon from "../icon/Icon";

type CardProps = {
  header: string;
  headerIcon?: ReactNode;
  aggregate: number;
  footer: ReactNode;
}

export default function Card({ header, headerIcon, aggregate, footer }: CardProps) {
  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <span className="text-md-md">{header}</span>
        {/* {headerIcon && <Icon className={s.header_icon} size="md">{headerIcon}</Icon>} */}

      </div>
      <h4>{aggregate}</h4>
      <div className={s.card_footer}>
        {/* {footer} */}
      </div>
    </div>
  )

}


