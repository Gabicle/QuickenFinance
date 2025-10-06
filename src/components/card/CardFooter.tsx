import s from './Card.module.css';

import { formatAmount } from "../../utils/currency";
import { formatPercent } from "../../utils/formatPercent";
import Badge, { type BadgeVariant } from "../badge/Badge";

type FooterProps = {
  current: number;
  previous: number;
};

export default function CardFooter({ current, previous }: FooterProps) {
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
