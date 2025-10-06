import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/button/Button';
import Card from '../../components/card/Card';
import { useAccounts, useTransactions } from '../../hooks/useTransactions';

import Title from '../../layout/Title';
import TransactionTable from './table/TransactionTable';
import s from './Transactions.module.css';
import { onAddTransaction, onRecurring } from './utitlity';
import { splitBuckets } from '../../utils/transactions';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export default function Transactions() {
  const title = 'Transactions';

  const { data: accountsData } = useAccounts();
  const { totalBalance } = accountsData ?? { accounts: [], totalBalance: 0 };

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
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

  const { earnings, spendings, investment } = useMemo(() => {
    try {
      return splitBuckets(rows);
    } catch {
      return { earnings: 0, spendings: 0, investment: 0 };
    }
  }, [rows]);

  const totalIncome = earnings;
  const totalExpense = spendings + investment;

  return (
    <div className="main-container">
      <Title title={title}>
        <Button
          text="Recurring"
          classes="btn btn-secondary btn-sm"
          handleClick={onRecurring}
        />
        <Button
          text="Add Transaction"
          classes="btn btn-primary btn-sm"
          handleClick={onAddTransaction}
        />
      </Title>

      <div className={s.card_container}>
        <Card header="Total Balance" aggregate={totalBalance} footer={null} />
        <Card header="Total Income" aggregate={totalIncome} footer={null} />
        <Card header="Total Expense" aggregate={totalExpense} footer={null} />
      </div>

      <div className={s.table_scroll}>

        <TransactionTable
          className={`${s.responsive_table} ${s.sticky_header} ${s.sticky_first_col}`}
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
    </div>
  );
}
