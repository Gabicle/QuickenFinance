import { useMemo, useState } from "react";
import { Button } from "../../components/button/Button";
import Card from "../../components/card/Card";
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
          aggregate={3928.41}
          footer={undefined} />
        <Card
          header="Total Earnings"
          headerIcon={undefined}
          aggregate={3928.41}
          footer={undefined} />
        <Card
          header="Total Earnings"
          headerIcon={undefined}
          aggregate={3928.41}
          footer={undefined} />

      </div>

      <div>
        <Widget
          title="Money Flow"
          icon={BankNote04}>
          <DashboardMoneyFlow year={year} transactions={chartRows}
          />


        </Widget>

        <Widget title="Spending Breakdown" icon={PiggyBank01}>
          <DashboardPie transactions={chartRows} />
        </Widget>
      </div>



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


    </div>

  )
}

function onViewReports(): void {
  console.log("View Reports");
}


