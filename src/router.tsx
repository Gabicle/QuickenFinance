import { createBrowserRouter, redirect } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import { lazy } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import ReportsPage from "./pages/ReportsPage";
import TransactionsPage from "./pages/TransactionsPage";

const DashboardPage = lazy(() => import('./pages/DashboardPage'));


export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { index: true, loader: () => redirect("dashboard") },
      { path: "dashboard", element: <DashboardPage />, handle: { title: "Dashboard" } },
      { path: "transactions", element: <TransactionsPage />, handle: { title: "Transactions" } },
      { path: "reports", element: <ReportsPage />, handle: { title: "Reports" } },
      { path: "*", element: <NotFoundPage />, handle: { title: "Not Found" } },
    ],
  },
  {
    element: <PageLayout />,
    children: [{ path: "*", element: <DashboardPage />, handle: { title: "Dashboard" } }],
  },
]);
