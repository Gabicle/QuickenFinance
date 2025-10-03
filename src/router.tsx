import { createBrowserRouter, redirect } from "react-router-dom";
import PageLayout from "./layout/PageLayout";
import DashboardPage from "./pages/DashboardPage";
import ReportsPage from "./pages/ReportsPage";
import TransactionsPage from "./pages/TransactionsPage";

const NotFound = () => {
  return <div style={{ padding: 24 }}>Page not found </div>
}

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        index: true,
        loader: () => redirect("dashboard"),
      },

      {
        path: "dashboard",
        element: <DashboardPage />,
        handle: { title: "Dashboard" }
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
        handle: { title: "Transactions" }
      },
      {
        path: "reports",
        element: <ReportsPage />,
        handle: { title: "Reports" }
      },

      {
        path: "*",
        element: <NotFound />,
        handle: { title: "Not Found" }
      },

    ],
  },
  {

    element: <PageLayout />,
    children: [{ path: "*", element: <DashboardPage />, handle: { title: "Dashboard" } }],
  },
]);
