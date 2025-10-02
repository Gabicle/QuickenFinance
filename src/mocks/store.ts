import type { Account, Transaction } from "../features/transactions/model/transaction";
import { makeTransaction, makeAccounts } from "./transactions/fake"; 

export type Page<T> = { data: T[]; page: number; pageSize: number; total: number };
export type ListQuery = {
  page?: number; pageSize?: number; q?: string;
  status?: Transaction['status'];
  type?: Transaction['type'];              
  sort?: 'date' | '-date';
};

export class TransactionStore {
  private items: Transaction[];
  private accounts: Account[] = makeAccounts(3);       

  constructor(seedCount = 75) {
    this.items = Array.from({ length: seedCount }, () => makeTransaction(this.accounts));
    this.items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  list(params: ListQuery = {}): Page<Transaction> {
    const { page = 1, pageSize = 10, q = '', status, type, sort = '-date' } = params;
    let filtered = this.items;

    if (q) {
      const n = q.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(n) ||
        t.account.name.toLowerCase().includes(n) ||
        t.id.toLowerCase().includes(n)
      );
    }
    if (status) filtered = filtered.filter(t => t.status === status);
    if (type)   filtered = filtered.filter(t => t.type === type);

    if (sort === 'date') filtered = [...filtered].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    else                  filtered = [...filtered].sort((a, b) => +new Date(b.date) - +new Date(a.date));

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);
    return { data, page, pageSize, total };
  }

  get(id: string) { return this.items.find(t => t.id === id); }

  create(input: Partial<Transaction>): Transaction {
    const base = makeTransaction(this.accounts);
    const created: Transaction = {
      ...base,
      ...input,
      id: base.id,
      date: input.date ? new Date(input.date).toISOString() : base.date,
      account: input.account ?? base.account,
      amount: input.amount ?? base.amount,
      status: (input.status as Transaction['status']) ?? base.status,
      type: input.type ?? base.type,
      description: input.description ?? base.description,
    };
    this.items.unshift(created);
    return created;
  }

  update(id: string, patch: Partial<Transaction>): Transaction | undefined {
    const i = this.items.findIndex(t => t.id === id);
    if (i === -1) return undefined;
    const cur = this.items[i];
    const next: Transaction = {
      ...cur, ...patch,
      date: patch.date ? new Date(patch.date).toISOString() : cur.date,
      account: patch.account ?? cur.account,
      amount: patch.amount ?? cur.amount,
      status: (patch.status as Transaction['status']) ?? cur.status,
    };
    this.items[i] = next;
    return next;
  }

  delete(id: string) {
    const before = this.items.length;
    this.items = this.items.filter(t => t.id !== id);
    return this.items.length < before;
  }


    listAccounts(): readonly Account[] {
    return [...this.accounts];
  }
}
