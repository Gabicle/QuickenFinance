import { Button } from "../../components/button/Button";
import Card from "../../components/card/Card";
import SvgCoinsStacked03 from "../../components/icons/CoinsStacked03";
import Title from "../../layout/Title";
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
          headerIcon={<SvgCoinsStacked03 />}
          aggregate={3928.41}
          footer={undefined} />
        <Card
          header="Total Earnings"
          headerIcon={<SvgCoinsStacked03 />}
          aggregate={3928.41}
          footer={undefined} />
        <Card
          header="Total Earnings"
          headerIcon={<SvgCoinsStacked03 />}
          aggregate={3928.41}
          footer={undefined} />

      </div>
    </div>

  )
}

function onViewReports(): void {
  console.log("View Reports");
}

function onAddTransaction(): void {
  console.log("Add Transaction");
}