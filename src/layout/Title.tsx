import type { ReactNode } from 'react';
import s from './Title.module.css';

type TitleProps = {
  title: string,
  children?: ReactNode
}

export default function Title({ title, children }: TitleProps) {
  return (
    <div className={s.title_container}>
      <h1>{title}</h1>
      {children && <div className={s.title_actions}>{children} </div>}
    </div>
  )
}