import type { Account, Transaction, TransactionStatus } from "../features/transactions/model/transaction";

export type Page<T> = { data: T[]; page: number; pageSize: number; total: number };
export type ListParams = {
  page?: number; pageSize?: number; q?: string;
  status?: TransactionStatus | ''; type?: string; sort?: 'date' | '-date';
};

const BASE = '/api';

export async function listTransactions(params: ListParams = {}): Promise<Page<Transaction>> {
  const url = new URL(`${BASE}/transactions`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to list transactions');
  return res.json();
}

export async function getTransaction(id: string): Promise<Transaction> {
  const res = await fetch(`${BASE}/transactions/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export async function createTransaction(input: Partial<Transaction>): Promise<Transaction> {
  const res = await fetch(`${BASE}/transactions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function updateTransaction(id: string, patch: Partial<Transaction>): Promise<Transaction> {
  const res = await fetch(`${BASE}/transactions/${id}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function deleteTransaction(id: string): Promise<{ deleted: true }> {
  const res = await fetch(`${BASE}/transactions/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}


// ---- Accounts  ----
export async function listAccounts(): Promise<Account[]> {
  const res = await fetch(`${BASE}/accounts`);
  if (!res.ok) throw new Error("Failed to list accounts");
  return res.json();
}
