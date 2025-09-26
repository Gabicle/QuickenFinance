import { Routes, Route } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ReportsPage from "../pages/ReportsPage";
import TransactionsPage from "../pages/TransactionsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />


      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      {/* Default to dashboard */}
      <Route path="*" element={<PageLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>);
}