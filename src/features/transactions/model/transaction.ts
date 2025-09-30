export type TransactionStatus = "completed" | "failed" | "pending";
export type TransactionType = "expense" | "income";

export interface Account {
  type: string;
  name: string;
}

export interface TimelineEntry {
  label: string;
  description?: string;
  timestamp?: string; // ISO
}

export interface PaymentDetail {
  referenceNumber: string;
  amount: number;
  fee: number;
  notes?: string;
  nextBillingDate?: string;
  autoRenewal?: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  date: string; // ISO
  account: Account;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  method: string;
  timeline: TimelineEntry[];
  paymentDetails?: PaymentDetail;
}
