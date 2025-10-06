import { useMemo } from "react";
import { useTransactions } from "../../../hooks/useTransactions";
import { isSameMonth, isPrevMonth } from "../../../utils/dateRanges";
import { splitBuckets } from "../../../utils/transactions";
import { CURRENCY } from "../../../utils/currency";

type Params = { q: string; year: number };

export function useDashboardData({ q, year }: Params) {
  const recentParams = useMemo(
    () => ({ page: 1, pageSize: 3, q, sort: "-date" as const }),
    [q]
  );

  const chartParams = useMemo(
    () => ({ page: 1, pageSize: 1000, status: "completed" as const, sort: "date" as const }),
    []
  );

  const recent = useTransactions(recentParams);
  const chart = useTransactions(chartParams);

  const rowsYear = useMemo(() => {
    const data = chart.data?.data ?? [];
    return data.filter(t => new Date(t.date).getFullYear() === year);
  }, [chart.data, year]);

  const now = useMemo(() => new Date(), []);

  const { curr, prev } = useMemo(() => {
    const all = chart.data?.data ?? [];
    const currRows = all.filter(t => isSameMonth(t.date, now));
    const prevRows = all.filter(t => isPrevMonth(t.date, now));
    return { curr: splitBuckets(currRows), prev: splitBuckets(prevRows) };
  }, [chart.data, now]);

  const totals = useMemo(() => {
    const totalEarnings = curr.earnings;
    const totalSpendings = curr.spendings;
    const totalInvestment = curr.investment;
    const totalSavings = curr.earnings - curr.spendings - curr.investment;
    return { totalEarnings, totalSpendings, totalInvestment, totalSavings };
  }, [curr]);

  const currency = useMemo(
    () => rowsYear[0]?.amount?.currency || rowsYear[0]?.account?.currency || CURRENCY,
    [rowsYear]
  );

  return {
    recentRows: recent.data?.data ?? [],
    recentState: {
      isLoading: recent.isLoading,
      isFetching: recent.isFetching,
      isError: recent.isError,
    },
    chartRows: rowsYear,
    chartState: {
      isLoading: chart.isLoading,
      isFetching: chart.isFetching,
      isError: chart.isError,
    },
    totals,
    prevMonth: prev,
    currency,
    year,
  };
}
