import type { Account, Transaction, TransactionStatus } from "../features/transactions/model/transaction";
import type { Page } from "../mocks/store";

export type ListParams = {
  page?: number;
  pageSize?: number;
  q?: string;
  status?: TransactionStatus ; 
  type?: Transaction['type'];
  sort?: 'date' | '-date';
};

const BASE = '/api';

function toQueryString(params: Record<string, unknown>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { Accept: 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });

  if (!res.ok) {
    let detail = '';
    try {
      const ct = res.headers.get('content-type') || '';
      detail = ct.includes('application/json') ? JSON.stringify(await res.json()) : await res.text();
    } catch { /* ignore parse errors */ }
    throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status} ${res.statusText}${detail ? ` — ${detail.slice(0,200)}` : ''}`);
  }

  if (res.status === 204) {
    // @ts-expect-error: callers should expect void for 204 endpoints
    return undefined;
  }

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON but got "${ct}". Body (truncated): ${text.slice(0,200)}`);
  }

  return res.json() as Promise<T>;
}

export async function listTransactions(params: ListParams = {}, init?: RequestInit): Promise<Page<Transaction>> {
  const qs = toQueryString(params);
  return request<Page<Transaction>>(`${BASE}/transactions${qs}`, init);
}

export async function getTransaction(id: string, init?: RequestInit): Promise<Transaction> {
  return request<Transaction>(`${BASE}/transactions/${id}`, init);
}

export async function createTransaction(input: Partial<Transaction>, init?: RequestInit): Promise<Transaction> {
  return request<Transaction>(`${BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    body: JSON.stringify(input),
    signal: init?.signal,
  });
}

export async function updateTransaction(id: string, patch: Partial<Transaction>, init?: RequestInit): Promise<Transaction> {
  return request<Transaction>(`${BASE}/transactions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    body: JSON.stringify(patch),
    signal: init?.signal,
  });
}

export async function deleteTransaction(id: string, init?: RequestInit): Promise<{ deleted: true } | void> {
  return request<{ deleted: true } | void>(`${BASE}/transactions/${id}`, {
    method: 'DELETE',
    signal: init?.signal,
  });
}


// ---- Accounts  ----
export async function listAccounts(init?: RequestInit): Promise<Account[]> {
  return request<Account[]>(`${BASE}/accounts`, init);
}