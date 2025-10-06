import type { ReactNode } from "react";
import s from './Card.module.css';
import { formatAmount } from "../../utils/currency";


type CardProps = {
  header: string;
  headerIcon?: ReactNode;
  aggregate: number;
  footer: ReactNode;
}

export default function Card({ header, aggregate, footer }: CardProps) {
  const formatted = formatAmount(aggregate);

  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <span className="text-md-md">{header}</span>

      </div>

      <h4>{formatted}</h4>

      <div className={s.card_footer}>
        {footer}
      </div>
    </div>
  );

}
