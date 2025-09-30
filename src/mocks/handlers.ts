import { http, HttpResponse, delay } from "msw";
import { transactions } from "../data/mockData";

const DEMO_USER = { id: 1, email: "demo@example.com", name: "Demo User" };

export const handlers = [
  // Always return the demo user — no login required
  http.get("/api/me", async () => {
    await delay(200);
    return HttpResponse.json(DEMO_USER);
  }),


   http.get("/api/transactions", async () => {
    await delay(300); // simulate network latency
    return HttpResponse.json(transactions);
  }),

  // GET a single transaction by ID
  http.get("/api/transactions/:id", async ({ params }) => {
    await delay(200);
    const { id } = params;
    const txn = transactions.find((t) => t.id === id);

    if (!txn) {
      return HttpResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(txn);
  })

];