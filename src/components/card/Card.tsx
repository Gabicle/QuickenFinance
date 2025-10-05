import type { ReactNode } from "react";
import s from './Card.module.css';
import Icon from "../icon/Icon";
import { formatAmount } from "../../utils/currency";
import { formatPercent } from "../../utils/formatPercent";
import Badge, { type BadgeVariant } from "../badge/Badge";

type CardProps = {
  header: string;
  headerIcon?: ReactNode;
  aggregate: number;
  footer: ReactNode;
}

export default function Card({ header, headerIcon, aggregate, footer }: CardProps) {
  const formatted = formatAmount(aggregate);

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




export function makeFooterNode(current: number, previous: number) {
  const delta = current - previous;
  const pct = previous === 0
    ? (current === 0 ? 0 : 1)
    : delta / Math.abs(previous);

  const isUp = delta > 0;
  const isDown = delta < 0;

  const pctStr = formatPercent(pct);
  const deltaStr = `${delta >= 0 ? "+" : "−"}${formatAmount(Math.abs(delta))}`;


  let variant: BadgeVariant = "neutral";
  if (isUp) variant = "success";
  if (isDown) variant = "danger";

  return (
    <>
      <Badge variant={variant}>{pctStr}</Badge>

      <span className={`text-sm-md ${s.caption}`}>{deltaStr} from last month</span>
    </>
  );
}
