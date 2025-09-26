import type { ReactNode } from 'react';
import s from './Title.module.css';

type TitleProps = {
  title: string,
  children?: ReactNode
}

export default function Title({ title, children }: TitleProps) {
  return (
    <div className={s.title_container}>
      <h5>{title}</h5>
      {children && <div className={s.title_actions}>{children} </div>}
    </div>
  )
}