import { useEffect, useState } from 'react';
import { Button } from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useAccounts, useTransactions } from '../../hooks/useTransactions';

import Title from '../../layout/Title';
import TransactionTable from './table/TransactionTable';
import s from './Transactions.module.css';
import { aggregateAccounts, onAddTransaction, onRecurring } from './utitlity';


export default function Transactions() {
  const title = 'Transactions';

  const { data: accountsData } = useAccounts();
  const { accounts, totalBalance } = accountsData ?? { accounts: [], totalBalance: 0 };

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data, isFetching, isLoading, isError } = useTransactions({
    page,
    pageSize,
    q: debouncedSearch,
  });

  const rows = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);


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

      <TransactionTable
        rows={rows}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        search={search}
        onSearchChange={setSearch}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />


    </div>
  );
}




export const useDebouncedValue = (value: string, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};