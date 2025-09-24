import PageLayout from "../layout/PageLayout";

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
      <div>
        Dashboard here
      </div>
    </PageLayout >
  )
}


