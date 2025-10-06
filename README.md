# 📊 Dashboard App (Frontend)

A React + Vite + TypeScript application with charts, routing, and mock APIs.  
Currently in **frontend-only** mode, with plans to transition into a **full-stack app**.


---

## ✅ Progress Tracker

- [x] React + Vite + TypeScript setup
- [x] Routing with lazy-loaded pages
- [x] Sidebar + breadcrumbs + layout
- [x] MSW mock API with badge indicator
- [x] ESLint + Prettier + Vitest setup
- [x] GitHub Actions CI (lint, typecheck, test, build)
- [ ] Real backend integration (replace MSW)
- [ ] Authentication & sessions
- [ ] Database-backed transactions
- [ ] Server-side pagination & filters
- [ ] Export features (CSV/XLSX)
- [ ] Dark mode + advanced charts

---

## ✅ Current Progress

- **Frontend architecture**
  - React Router v6 with lazy-loaded routes
  - Page layout with sidebar, breadcrumbs, header
  - Error boundary for route safety
- **State & data**
  - TanStack Query (React Query) for API state
  - Mock Service Worker (MSW) for simulating backend calls
  - Example transaction API wrapper with typed params
- **UI & components**
  - Reusable `<Button />` with variants
  - Sidebar navigation with `aria-current` accessibility
  - Chart components (donut chart w/ D3) with `Suspense` loading
- **Tooling**
  - ESLint + Prettier for consistent style
  - Vitest + React Testing Library smoke tests
  - GitHub Actions CI (lint, typecheck, test, build)
  - Example `.env` config
- **Dev experience**
  - MSW mock badge for clarity
  - React Query Devtools in dev
  - SPA routing config for Netlify

---

## ⚠️ Current Limitation

The project relies on **Mock Service Worker (MSW)** to simulate API calls.  
For my specific use case, **MSW is no longer sufficient** (e.g., persistence, auth, business logic).  

➡️ **Next phase:** Replace MSW with a real backend service, turning this into a **proper full-stack application**.

---

## 📌 Roadmap

### 🔨 In Progress
- [ ] Replace MSW with real backend (Python Flask)
- [ ] Connect to real database (Postgres)
- [ ] Add authentication & user sessions
- [ ] Server-side pagination & filtering for transactions
- [ ] Deployment of backend

### 📅 Future Enhancements
- [ ] Dark mode toggle
- [ ] More chart types (line, bar, stacked area)
- [ ] Export transactions (CSV/XLSX)
- [ ] Role-based access control
- [ ] CI/CD integration for backend


