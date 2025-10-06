import Badge from "../../components/badge/Badge";
import type { TransactionType } from "./model/transaction";

const LABELS: Record<TransactionType, string> = {
  income: "Income",
  expense: "Expense",
};

const VARIANT: Record<TransactionType, React.ComponentProps<typeof Badge>["variant"]> = {
  income: "success",
  expense: "danger",
};

export default function TransactionTypeBadge({ type }: { type: TransactionType }) {
  return <Badge variant={VARIANT[type]}>{LABELS[type]}</Badge>;
}