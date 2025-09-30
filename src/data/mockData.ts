import type { Account, Transaction } from "../features/transactions/model/transaction";


export const accounts: Account[] = [
  { type: "main account", name: "XYZ Main Account" },
  { type: "e-wallet", name: "XYZ Pay Wallet" },
  { type: "savings account", name: "XYZ Savings" }
];

export const transactions: Transaction[] = [
  {
    id: "txn_001",
    description: "Figma Subscription",
    date: "2024-08-05T13:00:00Z",
    account: accounts[0],
    type: "expense",
    status: "completed",
    amount: 1080.0,
    currency: "USD",
    method: "**** **** 0293",
    timeline: [],
   
  },
    {
    id: "txn_002",
    description: "Pinterest Subscription",
    date: "2024-08-05T13:00:00Z",
    account: accounts[0],
    type: "expense",
    status: "completed",
    amount: 2080.0,
    currency: "USD",
    method: "**** **** 0293",
    timeline: [],
   
  }
];
