import type { Transaction } from "../../features/transactions/model/transaction";
import { accounts } from "./accounts.fixture";

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
    timeline: [
      { label: "Payment started", timestamp: "2024-08-05T12:59:00Z" },
      { label: "Payment processed", description: "Please wait...", timestamp: "2024-08-05T13:00:00Z" },
      { label: "Payment success", timestamp: "2024-08-05T13:01:00Z" }
    ],
    paymentDetails: {
      referenceNumber: "#907765133",
      amount: 1080.0,
      fee: 0.0,
      notes: "Annual Subscription",
      nextBillingDate: "2026-08-05",
      autoRenewal: true
    }
  },
  {
    id: "txn_002",
    description: "Dinner at Luigi’s",
    date: "2024-09-12T19:45:00Z",
    account: accounts[1],
    type: "expense",
    status: "completed",
    amount: 52.5,
    currency: "USD",
    method: "Apple Pay",
    timeline: [
      { label: "Payment started", timestamp: "2024-09-12T19:44:30Z" },
      { label: "Payment success", timestamp: "2024-09-12T19:45:10Z" }
    ],
    paymentDetails: {
      referenceNumber: "#775312980",
      amount: 52.5,
      fee: 0.5,
      notes: "Dinner Payment",
      autoRenewal: false
    }
  },
  {
    id: "txn_003",
    description: "September Salary",
    date: "2024-09-30T08:00:00Z",
    account: accounts[2],
    type: "income",
    status: "completed",
    amount: 2500.0,
    currency: "USD",
    method: "Bank Transfer",
    timeline: [
      { label: "Transfer initiated", timestamp: "2024-09-30T07:59:00Z" },
      { label: "Funds received", timestamp: "2024-09-30T08:00:30Z" }
    ],
    paymentDetails: {
      referenceNumber: "#339812774",
      amount: 2500.0,
      fee: 10.0,
      notes: "Salary Payout",
      autoRenewal: false
    }
  }
];