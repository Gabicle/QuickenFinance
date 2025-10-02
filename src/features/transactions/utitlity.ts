import type { Account } from "./model/transaction";


export function onAddTransaction(): void {
  console.log("Add Transaction");
}

export function onRecurring(): void{
  console.log("On recurring");
}

export function aggregateAccounts(accounts: Account[]) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  return { totalBalance };
}