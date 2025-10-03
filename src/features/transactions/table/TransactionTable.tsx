import { useCallback, useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { Transaction, TransactionStatus } from "../model/transaction";
import styles from './TransactionTable.module.css'
import Badge, { type BadgeVariant } from "../../../components/badge/Badge";
import Pagination from "../../../components/pagination/Pagination";
import Toolbar from "../../../components/toolbar/Toolbar";


const statusVariantMap: Record<TransactionStatus, BadgeVariant> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

// map transaction status → display label
const statusLabelMap: Record<TransactionStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
};

type TransactionTableProps = {
  rows: Transaction[];
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  search: string;
  onSearchChange: (v: string) => void;
  page: number;
  pageSize: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const columnHelper = createColumnHelper<Transaction>();

export default function TransactionsTable({
  rows,
  isLoading,
  isError,
  isFetching,
  search,
  onSearchChange,
  page,
  pageSize,
  totalPages,
  onPrev,
  onNext,
}: TransactionTableProps) {

  const title = "Recent Transactions";

  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit"
  };

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(undefined, dateFormat),
    [dateFormat]
  );

  const currencyFormatters = useMemo(
    () => new Map<string, Intl.NumberFormat>(),
    []
  );


  const formatCurrency = useCallback(
    (amount: number, currency: string) => {
      let fmt = currencyFormatters.get(currency);
      if (!fmt) {
        fmt = new Intl.NumberFormat(undefined, { style: "currency", currency });
        currencyFormatters.set(currency, fmt);
      }
      return fmt.format(amount);
    },
    [currencyFormatters]
  );

  const getSignedAmount = (t: Transaction) =>
    t.type === 'expense' ? -Math.abs(t.amount.amount) : Math.abs(t.amount.amount);


  // Columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => dateFormatter.format(new Date(info.getValue())),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
      }

      ),
      columnHelper.accessor((row) => row.account.name, {
        id: "accountName",
        header: "Account",
      }),

      columnHelper.accessor((row) => getSignedAmount(row), {

        id: "amount",
        header: "Amount",
        cell: (info) => {
          const value = info.getValue();
          const curr = info.row.original.amount.currency;
          return (
            <span className={value < 0 ? styles.negative : styles.positive}>
              {formatCurrency(value, curr)}
            </span>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as TransactionStatus;
          return (
            <Badge variant={statusVariantMap[status]}>
              {statusLabelMap[status]}
            </Badge>
          );
        },
      }),
    ],
    [dateFormatter, formatCurrency]
  );

  // Table
  const table = useReactTable({
    data: rows,
    columns,
    state: {
      globalFilter: search,
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <section className={styles.section} aria-labelledby="recent-transactions-title">
      {/* Toolbar */}
      <Toolbar
        title={title}
        search={search}
        onSearchChange={onSearchChange}
      />

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <caption id="recent-transactions-title" className={styles.sr_only}>
            {title}
          </caption>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} scope="col" className={styles.th}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={styles.empty} colSpan={table.getAllLeafColumns().length}>
                  Loading…
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className={styles.empty} colSpan={table.getAllLeafColumns().length}>
                  Something went wrong. Please try again.
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={table.getAllLeafColumns().length}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td} data-column={cell.column.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        isFetching={isFetching}
      />
    </section>
  );

}



