import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import TransactionsPage from "./pages/TransactionsPage";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage />, handle: { title: "Dashboard" } },
      { path: "/transactions", element: <TransactionsPage />, handle: { title: "Transactions" } },
      { path: "/reports", element: <ReportsPage />, handle: { title: "Reports" } },

      { index: true, element: <DashboardPage />, handle: { title: "Dashboard" } },
    ],
  },
  {

    element: <PageLayout />,
    children: [{ path: "*", element: <DashboardPage />, handle: { title: "Dashboard" } }],
  },
]);
