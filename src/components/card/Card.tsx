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
  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(aggregate);


  return (
    <div className={s.card}>
      <div className={s.card_header}>
        <span className="text-md-md">{header}</span>
        {/* {headerIcon && <Icon className={s.header_icon} size="md">{headerIcon}</Icon>} */}
      </div>

      <h4>{formatted}</h4>

      <div className={s.card_footer}>
        {footer}
      </div>
    </div>
  );

}


const locale = "fr-FR"; // gives 8,2 % and €1 234,56

export function makeFooterNode(current: number, previous: number) {
  const delta = current - previous;
  const pct = previous === 0
    ? (current === 0 ? 0 : 1) // treat as +100% when growing from 0
    : (current - previous) / Math.abs(previous);

  const isUp = delta > 0;
  const isDown = delta < 0;

  const pctStr = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }).format(pct);

  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const deltaStr = `${delta >= 0 ? "+" : "−"}${money.format(Math.abs(delta))}`;

  const badgeClass = isDown ? s.badgeDown : isUp ? s.badgeUp : s.badgeNeutral;

  return (
    <>
      <span className={`text-xs-bold ${s.badge} ${badgeClass}`}>{pctStr}</span>
      <span className={`text-sm-md ${s.caption}`}>{deltaStr} from last month</span>
    </>
  );
}
