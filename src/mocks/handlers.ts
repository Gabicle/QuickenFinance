import { http, HttpResponse, delay } from "msw";
import { TransactionStore } from "./store";
import type { TransactionStatus } from "../features/transactions/model/transaction";

const DEMO_USER = { id: 1, email: "demo@example.com", name: "Demo User" };
export const txStore = new TransactionStore(90);


export const handlers = [
  // Always return the demo user — no login required
  http.get("/api/me", async () => {
    await delay(200);
    return HttpResponse.json(DEMO_USER);
  }),


  http.get('/api/transactions', async ({ request }) => {
    await delay(200);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const q = url.searchParams.get('q') ?? '';
  const status = url.searchParams.get('status') as TransactionStatus | undefined;
    const type = url.searchParams.get('type') ?? undefined;
    const sort = (url.searchParams.get('sort') as 'date' | '-date' | null) ?? '-date';
    return HttpResponse.json(txStore.list({ page, pageSize, q, status, type, sort }));
  }),

  http.get('/api/transactions/:id', async ({ params }) => {
    await delay(120);
    const item = txStore.get(String(params.id));
    if (!item) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(item);
  }),

  http.post('/api/transactions', async ({ request }) => {
    await delay(120);
    const body = await request.json();
    const created = txStore.create(body);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch('/api/transactions/:id', async ({ params, request }) => {
    await delay(120);
    const body = await request.json();
    const updated = txStore.update(String(params.id), body);
    if (!updated) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(updated);
  }),

  http.delete('/api/transactions/:id', async ({ params }) => {
    await delay(100);
    const ok = txStore.delete(String(params.id));
    if (!ok) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ deleted: true });
  }),

   http.get("/api/accounts", async () => {
    await delay(200);
    return HttpResponse.json(txStore.listAccounts());
  }),

];