import { useMemo, useState } from "react";
import { Button } from "../../components/button/Button";
import Card, { makeFooterNode } from "../../components/card/Card";
import Widget from "../../components/widget/Widget";
import { useTransactions } from "../../hooks/useTransactions";
import BankNote04 from "../../icons/BankNote04";

import Title from "../../layout/Title";
import { onAddTransaction } from "../transactions/utitlity";
import s from './Dashboard.module.css';
import DashboardMoneyFlow from "./DashboardMoneyFlow";
import { useDebouncedValue } from "../transactions/Transactions";
import TransactionsTable from "../transactions/table/TransactionTable";
import PiggyBank01 from "../../icons/PiggyBank01";
import DashboardPie from "./DashboardPie";
import type { Transaction } from "../transactions/model/transaction";

type Tx = Transaction;

const INVESTMENT_KEY = "investment"; // from CATEGORY_BANK

function isCompletedThisMonth(d: string, now = new Date()) {
  const dt = new Date(d);
  return dt.getFullYear() === now.getFullYear() && dt.getMonth() === now.getMonth();
}

function isCompletedLastMonth(d: string, now = new Date()) {
  const dt = new Date(d);
  const y = now.getFullYear();
  const m = now.getMonth();
  // last month boundary
  const lastMonth = m === 0 ? 11 : m - 1;
  const lastYear = m === 0 ? y - 1 : y;
  return dt.getFullYear() === lastYear && dt.getMonth() === lastMonth;
}

function sumAmounts(rows: Tx[]) {
  return rows.reduce((acc, t) => acc + (t.amount?.amount ?? 0), 0);
}

function splitBuckets(rows: Tx[]) {
  const income = rows.filter(t => t.type === "income" && t.status === "completed");
  const expenses = rows.filter(t => t.type === "expense" && t.status === "completed");
  const investment = expenses.filter(t => t.category === INVESTMENT_KEY);
  const spendings = expenses.filter(t => t.category !== INVESTMENT_KEY);
  return {
    earnings: sumAmounts(income),
    spendings: sumAmounts(spendings),
    investment: sumAmounts(investment),
  };
}

function toPctChange(curr: number, prev: number) {
  if (prev === 0) {
    if (curr === 0) return 0;
    // define as 100% increase when going from 0 to positive; or -100% if going to zero
    return 100;
  }
  return ((curr - prev) / Math.abs(prev)) * 100;
}

function formatCurrency(n: number, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
  } catch {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }
}

function makeFooter(curr: number, prev: number, currency: string) {
  const delta = curr - prev;
  const pct = toPctChange(curr, prev);
  const sign = delta === 0 ? "" : delta > 0 ? "+" : "−";
  // Use absolute value for display of delta amount when prefixing sign
  const deltaStr = `${sign}${formatCurrency(Math.abs(delta), currency)}`;
  const pctStr = `${pct >= 0 ? "+" : "−"}${Math.abs(pct).toFixed(1)}%`;
  return `${pctStr} (${deltaStr}) vs last month`;
}


export default function Dashboard() {
  const title = "Dashboard";
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const year = new Date().getFullYear();

  // ---- params (memoized) ----
  const recentParams = useMemo(
    () => ({ page: 1, pageSize: 3, q: debouncedSearch, sort: "-date" as const }),
    [debouncedSearch]
  );

  // chart ignores search; wants *completed* and a big page
  const chartParams = useMemo(
    () => ({ page: 1, pageSize: 1000, status: "completed" as const, sort: "date" as const }),
    []
  );

  // ---- queries ----
  const {
    data: recentData,
    isFetching: isFetchingRecent,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
  } = useTransactions(recentParams);

  const {
    data: chartData,
    isFetching: isFetchingChart,
    isLoading: isLoadingChart,
    isError: isErrorChart,
  } = useTransactions(chartParams);

  // ---- derived rows ----
  const recentRows = recentData?.data ?? [];
  const chartRows = (chartData?.data ?? []).filter(
    (t) => new Date(t.date).getFullYear() === year
  );

  const now = new Date();

  // currency for formatting (fallback to first row's account currency or USD)
  const currency =
    chartRows[0]?.amount?.currency ||
    chartRows[0]?.account?.currency ||
    "USD";

  // scope to current & last month (completed only checked inside splitBuckets)
  const currentMonthRows = (chartData?.data ?? []).filter(t => isCompletedThisMonth(t.date, now));
  const lastMonthRows = (chartData?.data ?? []).filter(t => isCompletedLastMonth(t.date, now));

  const curr = splitBuckets(currentMonthRows);
  const prev = splitBuckets(lastMonthRows);

  const totalEarnings = curr.earnings;
  const totalSpendings = curr.spendings;
  const totalInvestment = curr.investment;
  const totalSavings = curr.earnings - curr.spendings - curr.investment;




  return (
    <div className="main-container">
      <Title title={title}>
        <Button text="View Reports" classes="btn btn-secondary btn-sm" handleClick={onViewReports} />
        <Button text="Add Transaction" classes="btn btn-primary btn-sm" handleClick={onAddTransaction} />
      </Title>

      <div className={s.card_container}>
        <Card
          header="Total Earnings"
          headerIcon={undefined}
          aggregate={totalEarnings}
          footer={makeFooterNode(totalEarnings, prev.earnings)}
        />
        <Card
          header="Total Spendings"
          headerIcon={undefined}
          aggregate={totalSpendings}
          footer={makeFooterNode(totalSpendings, prev.spendings)}
        />
        <Card
          header="Total Savings"
          headerIcon={undefined}
          aggregate={totalSavings}
          footer={makeFooterNode(totalSavings, prev.spendings - prev.investment)}
        />
        <Card
          header="Total Investment"
          headerIcon={undefined}
          aggregate={totalInvestment}
          footer={makeFooterNode(totalInvestment, prev.investment)} />

      </div>

      <Widget
        title="Money Flow"
        icon={BankNote04}>
        <DashboardMoneyFlow year={year} transactions={chartRows}
        />


      </Widget>




      <div className={s.info}>

        {/* recent transactions table here */}
        <TransactionsTable
          compact
          rows={recentRows}
          isLoading={isLoadingRecent}
          isError={isErrorRecent}
          isFetching={isFetchingRecent}
          search={search}
          onSearchChange={setSearch}
          maxRows={3}
        />

        <Widget title="Spending Breakdown" icon={PiggyBank01}>
          <DashboardPie transactions={chartRows} />
        </Widget>
      </div>
    </div>

  )
}

function onViewReports(): void {
  console.log("View Reports");
}


