import type { Transaction } from "../transactions/model/transaction";

type Options = {
  type?: "income" | "expense" | "both";
};

export function aggregateByCategory(
  transactions: Transaction[],
  opts: Options = { type: "expense" }
) {
  const type = opts.type ?? "expense";
  const filtered =
    type === "both" ? transactions : transactions.filter(t => t.type === type);

  const map = new Map<string, number>();
  for (const t of filtered) {
const v = Math.abs(
  (t.amount?.value ?? Number(t.displayAmount)) || 0
);
    map.set(t.category || "Uncategorized", (map.get(t.category || "Uncategorized") ?? 0) + v);
  }

  return Array.from(map, ([name, value]) => ({ name, value }));
}
