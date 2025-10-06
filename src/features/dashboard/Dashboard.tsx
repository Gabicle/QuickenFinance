import { useState } from "react";
import { Button } from "../../components/button/Button";
import Card from "../../components/card/Card";
import Widget from "../../components/widget/Widget";
import BankNote04 from "../../icons/BankNote04";
import Title from "../../layout/Title";
import { onAddTransaction } from "../transactions/utitlity";
import styles from "./Dashboard.module.css";


import TransactionsTable from "../transactions/table/TransactionTable";
import PiggyBank01 from "../../icons/PiggyBank01";

import { useDashboardData } from "./hooks/useDashboardData";
import DashboardMoneyFlow from "./charts/bar/DashboardMoneyFlow";
import DashboardPie, { type RangeKey } from "./charts/pie/DashboardPie";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import CardFooter from "../../components/card/CardFooter";

export default function Dashboard() {
  const title = "Dashboard";
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [pieRange, setPieRange] = useState<RangeKey>("monthly");

  const { recentRows, recentState, chartRows, totals, prevMonth, year } =
    useDashboardData({ q: debouncedSearch, year: new Date().getFullYear() });



  return (
    <div className="main-container">
      <Title title={title}>
        <Button text="View Reports" classes="btn btn-secondary btn-sm" handleClick={onViewReports} />
        <Button text="Add Transaction" classes="btn btn-primary btn-sm" handleClick={onAddTransaction} />
      </Title>

      <div className={styles.cards}>
        <Card
          header="Total Earnings"
          aggregate={totals.totalEarnings}
          footer={<CardFooter current={totals.totalEarnings} previous={prevMonth.earnings} />}
        />

        <Card
          header="Total Spendings"
          aggregate={totals.totalSpendings}
          footer={<CardFooter current={totals.totalSpendings} previous={prevMonth.spendings} />}
        />

        <Card
          header="Total Savings"
          aggregate={totals.totalSavings}
          footer={
            <CardFooter
              current={totals.totalSavings}
              previous={prevMonth.spendings - prevMonth.investment}
            />
          }
        />

        <Card
          header="Total Investment"
          aggregate={totals.totalInvestment}
          footer={<CardFooter current={totals.totalInvestment} previous={prevMonth.investment} />}
        />

      </div>
      <Widget title="Money Flow" icon={BankNote04}>
        <DashboardMoneyFlow year={year} transactions={chartRows} />
      </Widget>

      <div className={styles.contentGrid}>


        <TransactionsTable
          compact
          rows={recentRows}
          isLoading={recentState.isLoading}
          isError={recentState.isError}
          isFetching={recentState.isFetching}
          search={search}
          onSearchChange={setSearch}
          maxRows={3}
        />

        <Widget title="Spending Breakdown"
          actions={<DashboardPieAction range={pieRange} onChange={setPieRange} />}
          icon={PiggyBank01}>
          <DashboardPie transactions={chartRows} range={pieRange} />
        </Widget>
      </div>


    </div>
  );
}

function onViewReports() { console.log("View Reports"); }

function DashboardPieAction({
  range,
  onChange,
}: {
  range: RangeKey;
  onChange: (r: RangeKey) => void;
}) {
  return (
    <div className={styles.range_row}>

      <select
        id="pie-range"
        value={range}
        onChange={(e) => onChange(e.target.value as RangeKey)}
        className={styles.range_select}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}