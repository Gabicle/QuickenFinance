import type { Transaction } from "../features/transactions/model/transaction";

type Tx = Transaction;

export function sumAmounts(rows: Tx[]) {
  return rows.reduce((acc, t) => acc + (t.amount?.amount ?? 0), 0);
}

export function splitBuckets(rows: Tx[], investmentKey = "investment") {
  const income = rows.filter(t => t.type === "income" && t.status === "completed");
  const expenses = rows.filter(t => t.type === "expense" && t.status === "completed");
  const investment = expenses.filter(t => t.category === investmentKey);
  const spendings = expenses.filter(t => t.category !== investmentKey);
  return {
    earnings: sumAmounts(income),
    spendings: sumAmounts(spendings),
    investment: sumAmounts(investment),
  };
}

export function filterCompletedInYear(rows: Transaction[], year: number) {
  return rows.filter(
    (t) => t.status === "completed" && new Date(t.date).getFullYear() === year
  );
}

