import { Button } from "../../components/button/Button";
import Card from "../../components/card/Card";

import Title from "../../layout/Title";
import { onAddTransaction } from "../transactions/utitlity";
import s from './Dashboard.module.css';


export default function Dashboard() {
  const title = "Dashboard";

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
    </div>

  )
}

function onViewReports(): void {
  console.log("View Reports");
}

