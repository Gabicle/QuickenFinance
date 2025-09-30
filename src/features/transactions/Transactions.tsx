import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '../../components/button/Button';
import Card from '../../components/card/Card';

import Title from '../../layout/Title';
import s from './Transactions.module.css';
import { onAddTransaction, onRecurring } from './utitlity';



export default function Transactions() {
  const title = 'Transactions';

  return (
    <div className="main-container">
      <Title title={title}>
        <Button text="Recurring" classes="btn btn-secondary btn-sm" handleClick={onRecurring} />
        <Button text="Add Transaction" classes="btn btn-primary btn-sm" handleClick={onAddTransaction} />
      </Title>

      <div className={s.card_container}>
        <Card header="Total Earnings" headerIcon={undefined} aggregate={3928.41} footer={undefined} />
        <Card header="Total Earnings" headerIcon={undefined} aggregate={3928.41} footer={undefined} />
        <Card header="Total Earnings" headerIcon={undefined} aggregate={3928.41} footer={undefined} />
      </div>

      {/* <Transactions2Table /> */}


    </div>
  );
}
