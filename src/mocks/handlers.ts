import { http, HttpResponse, delay } from "msw";

const DEMO_USER = { id: 1, email: "demo@example.com", name: "Demo User" };

export const handlers = [
  // Always return the demo user — no login required
  http.get("/api/me", async () => {
    await delay(200);
    return HttpResponse.json(DEMO_USER);
  })
];