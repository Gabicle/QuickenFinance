import { Button } from "../components/button/Button";
import Title from "../layout/Title";
import DashboardCard from "./DashboardCard";



export default function DashboardPage() {
  const title = "Dashboard";
  return (
    <>
      <Title title={title}>
        <Button text="View Reports" type="light" handleClick={onViewReports} />
        <Button text="Add Transaction" type="dark" handleClick={onAddTransaction} />
      </Title>

      <DashboardCard />
    </>
  )
}


function onViewReports(): void {
  console.log("View Reports");
}

function onAddTransaction(): void {
  console.log("Add Transaction");
}