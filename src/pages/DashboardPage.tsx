import { Button } from "../components/button/Button";
import PageLayout from "../layout/PageLayout";
import Title from "../layout/Title";
import DashboardCard from "./DashboardCard";

const fakeUser: User = {
  firstName: "Robert",
  lastName: "Johnson",
  type: "Basic Account",
  imgUrl: "/avatar-robert.jpg", // put a real path/url here
};

export type User = {
  firstName: string;
  lastName: string;
  type: string;
  imgUrl: string;
};

export default function DashboardPage() {
  const title = "Dashboard";
  return (
    <PageLayout headerProps={{ title, user: fakeUser }}>
      <Title title={title}>
        <Button text="View Reports" type="light" handleClick={onViewReports} />
        <Button text="Add Transaction" type="dark" handleClick={onAddTransaction} />
      </Title>

      <DashboardCard />
    </PageLayout >
  )
}


function onViewReports(): void {
  console.log("View Reports");
}

function onAddTransaction(): void {
  console.log("Add Transaction");
}