import type { ReactNode } from "react";
import s from './PageLayout.module.css';
import Header, { type HeaderProps } from "./Header";

type PageLayoutProps = {
  headerProps: HeaderProps;
  children: ReactNode;
};

export default function PageLayout({ headerProps, children }: PageLayoutProps) {
  return (
    <div>
      <Header {...headerProps} />
      <hr />
      <main className={s.layout_container}>
        {children}
      </main>
    </div>

  );
}





