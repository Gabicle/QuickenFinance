import { Button } from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useAccounts } from '../../hooks/useTransactions';

import Title from '../../layout/Title';
import TransactionTable from './table/TransactionTable';
import s from './Transactions.module.css';
import { aggregateAccounts, onAddTransaction, onRecurring } from './utitlity';


export default function Transactions() {

  const title = 'Transactions';

  const { data } = useAccounts();


  const { accounts, totalBalance } = data ?? { accounts: [], totalBalance: 0 };




  return (
    <div className="main-container">
      <Title title={title}>
        <Button text="Recurring" classes="btn btn-secondary btn-sm" handleClick={onRecurring} />
        <Button text="Add Transaction" classes="btn btn-primary btn-sm" handleClick={onAddTransaction} />
      </Title>

      <div className={s.card_container}>
        <Card header="Total Balance" headerIcon={undefined} aggregate={totalBalance} footer={undefined} />
        <Card header="Total Income" headerIcon={undefined} aggregate={3928.41} footer={undefined} />
        <Card header="Total Expense" headerIcon={undefined} aggregate={3928.41} footer={undefined} />
      </div>

      <TransactionTable />


    </div>
  );
}


