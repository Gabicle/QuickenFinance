import { createColumnHelper } from '@tanstack/react-table';
import s from './Transactions2Table.module.css';

const defaultData = [
  { id: "INV-1042", date: "2025-09-12", description: "Restaurant — Chez Marie", amount: -48.5, status: "Completed", method: "Card" },
  { id: "INV-1043", date: "2025-09-14", description: "Salary — September", amount: 3450, status: "Completed", method: "Bank Transfer" },
  { id: "INV-1044", date: "2025-09-15", description: "Groceries — Monoprix", amount: -82.13, status: "Completed", method: "Card" },
  { id: "INV-1045", date: "2025-09-18", description: "Gym Membership", amount: -29.99, status: "Pending", method: "Direct Debit" },
  { id: "INV-1046", date: "2025-09-22", description: "Electricity Bill", amount: -67.2, status: "Completed", method: "Direct Debit" },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => <code>{info.getValue()}</code>,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    sortingFn: "datetime",
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("method", {
    header: "Method",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const v = info.getValue();
      return <span className={`${s.badge} ${v === "Completed" ? s.badgeSuccess : s.badgePending}`}>{v}</span>;
    },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => {
      const v = info.getValue();
      const formatted = new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(v);
      return <span className={v < 0 ? '' : styles.positive}>{formatted}</span>;
    },
    sortingFn: "alphanumeric",
  }),
];



export default function Transactions2Table() {
  return (
    <section className={s.table_container}>
      <div className={s.table_toolbar}>
        <div>
          {/* put icon here */}
          <p className='text-lg-md'>Recent Transactions</p>
        </div>
        <div className={s.table_toolbar_actions}>
          <label className={s.search} aria-label='Search transactions'>
            {/* Search icon here */}
            <input
              className={s.searchInput}
              placeholder="Search transaction"
              type="search" />
          </label>
        </div>

      </div>

      <table className={s.table}>


      </table>
    </section>
  )
}