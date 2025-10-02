import { createColumnHelper } from '@tanstack/react-table';
import type { Transaction } from '../model/transaction';
import TransactionBadge from '../TransactionBadge';


const col = createColumnHelper<Transaction>();

export const transactionColumns = [
  col.accessor('date', {
    header: 'Date',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  }),
  col.accessor('description', {
    header: 'Description',
  }),
  col.accessor(row => row.account.name, {
    id: 'accountName',
    header: 'Account',
  }),
  col.accessor('status', {
    header: 'Status',
  }),
  col.accessor("type", {
    id: "type",
    header: "Type",
    cell: (info) => <TransactionBadge type={info.getValue()} />,
  }),

  col.accessor(row => row.amount.amount, {
    id: 'amount',
    header: 'Amount',
    cell: info => (
      <span style={{ textAlign: 'right', display: 'block' }}>
        {info.getValue().toFixed(2)} {info.row.original.amount.currency}
      </span>
    ),
  }),
];
