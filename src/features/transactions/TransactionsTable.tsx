import React from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import styles from "./TransactionsTable.module.css";

// Sample data — replace with your own
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
    cell: (info) => <code className={styles.mono}>{info.getValue()}</code>,
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
      return <span className={`${styles.badge} ${v === "Completed" ? styles.badgeSuccess : styles.badgePending}`}>{v}</span>;
    },
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => {
      const v = info.getValue();
      const formatted = new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(v);
      return <span className={v < 0 ? styles.negative : styles.positive}>{formatted}</span>;
    },
    sortingFn: "alphanumeric",
  }),
];

export default function TransactionsTable({ data = defaultData, title = "Recent Transactions" }) {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <section className={styles.section} aria-labelledby="recent-transactions-title">
      <div className={styles.bar}>
        <div className={styles.barLeft}>
          <div className={styles.iconBox} aria-hidden="true">
            <div className={styles.iconSquare} />
          </div>
          <h2 id="recent-transactions-title" className={styles.title}>
            {title}
          </h2>
        </div>

        <div className={styles.barRight}>
          <label className={styles.search} aria-label="Search transactions">
            <span className={styles.searchIcon} aria-hidden="true">
              <span className={styles.searchGlyph} />
            </span>
            <input
              className={styles.searchInput}
              placeholder="Search transaction"
              type="search"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </label>

          <button type="button" className={styles.iconButton} aria-label="Actions">
            <span className={styles.iconBoxSmall} aria-hidden="true">
              <span className={styles.iconSquareSmall} />
            </span>
          </button>
        </div>
      </div>

      {/* Semantic data table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <caption className={styles.sr_only}>{title}</caption>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      className={styles.th}
                      aria-sort={
                        sortDir === "asc" ? "ascending" : sortDir === "desc" ? "descending" : "none"
                      }
                    >
                      {canSort ? (
                        <button
                          type="button"
                          className={styles.sortBtn}
                          onClick={header.column.getToggleSortingHandler()}
                          aria-label={`Sort by ${flexRender(header.column.columnDef.header, header.getContext())}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className={styles.sortCaret} aria-hidden="true">
                            {sortDir === "asc" ? "▲" : sortDir === "desc" ? "▼" : "▵"}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
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
    </section>
  );
}
