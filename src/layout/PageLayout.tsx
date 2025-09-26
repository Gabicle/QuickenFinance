
import s from './PageLayout.module.css';
import Header from "./Header";
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

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

export default function PageLayout() {

  return (
    <div className={s.appShell}>
      <Sidebar />

      <div className="main">
        <p>main here</p>
        {/* <Header title="Dash" user={fakeUser} />
        <hr />
        <main className={s.layout_container}>
          <Outlet />
        </main> */}
      </div>
    </div>
  );
}


