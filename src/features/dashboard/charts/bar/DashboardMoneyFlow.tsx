import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import { formatAmount } from "../../../../utils/currency";
import { filterCompletedInYear } from "../../../../utils/transactions";
import type { Transaction } from "../../../transactions/model/transaction";
import styles from "./DashboardMoneyFlow.module.css";

type Props = { year?: number; transactions: Transaction[] };

const INCOME_KEY = "income";
const EXPENSE_KEY = "expense";

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
}

export default function DashboardMoneyFlow({
  year = new Date().getFullYear(),
  transactions,
}: Props) {
  const [containerRef, { width }] = useElementSize<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const W = Math.max(0, width);
  const MAX_HEIGHT = 300;
  const aspect = 16 / 9;
  const H = W > 0 ? Math.min(MAX_HEIGHT, Math.round(W / aspect)) : 0;

  const completed = useMemo(
    () => filterCompletedInYear(transactions ?? [], year),
    [transactions, year]
  );
  const rows = useMemo(() => monthlyTotals(completed), [completed]);

  useEffect(() => {
    const wrapperEl = containerRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    if (!W || !H || !wrapperEl) return;

    const readVar = (name: string, fallback: number) => {
      const v = getComputedStyle(wrapperEl).getPropertyValue(name).trim();
      const n = Number(v.replace("px", ""));
      return Number.isFinite(n) && n > 0 ? n : fallback;
    };

    const margin = {
      top: readVar("--chart-mt", 20),
      right: readVar("--chart-mr", 20),
      bottom: readVar("--chart-mb", 48),
      left: readVar("--chart-ml", 56),
    };

    const colorIncome =
      getComputedStyle(wrapperEl).getPropertyValue("--chart-income-color").trim() ||
      "var(--color-primary-600)";
    const colorExpense =
      getComputedStyle(wrapperEl).getPropertyValue("--chart-expense-color").trim() ||
      "var(--color-alert-error-100)";

    const barRadius = readVar("--chart-bar-radius", 2);
    const groupGap = readVar("--chart-group-gap", 10);
    const nominalBarWidth = readVar("--chart-bar-width", 60);

    const innerW = Math.max(0, W - margin.left - margin.right);
    const innerH = Math.max(0, H - margin.top - margin.bottom);

    svg
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const months = rows.map((r) => r.monthLabel);
    const keys: Array<"income" | "expense"> = [INCOME_KEY, EXPENSE_KEY];

    const x0 = d3.scaleBand().domain(months).range([0, innerW]).padding(0.15);
    const x0bw = x0.bandwidth();
    const maxBarWidth = Math.max(1, (x0bw - (keys.length - 1) * groupGap) / keys.length);
    const barW = Math.min(nominalBarWidth, maxBarWidth);
    const groupW = keys.length * barW + (keys.length - 1) * groupGap;

    const xFor = (monthLabel: string, key: "income" | "expense") => {
      const base = (x0(monthLabel) || 0) + (x0bw - groupW) / 2;
      const idx = keys.indexOf(key);
      return base + idx * (barW + groupGap);
    };

    const maxY = d3.max(rows, (r) => Math.max(r.income || 0, r.expense || 0)) ?? 0;
    const y = d3.scaleLinear().domain([0, maxY || 1]).nice().range([innerH, 0]);

    // axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x0).tickSizeOuter(0))
      .call((gx) => gx.selectAll("text").style("font-size", "12px"));

    g.append("g")
      .call(
        d3.axisLeft(y)
          .ticks(6)
          .tickFormat((d: d3.NumberValue) => formatAmount(+d, true))
      )
      .call((gy) =>
        gy
          .append("text")
          .attr("x", 0)
          .attr("y", -8)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text("Amount")
      );

    // Tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("top", "0px")
      .style("left", "0px")
      .style("z-index", "1")
      .style("pointer-events", "none")
      .style("background", "rgba(0,0,0,0.75)")
      .style("color", "#fff")
      .style("padding", "6px 8px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("opacity", 0)
      .style("will-change", "transform");

    let raf = 0;
    const onMove = (event: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      const [px, py] = d3.pointer(event, containerRef.current);
      raf = requestAnimationFrame(() => {
        tooltip.style("transform", `translate(${px + 12}px, ${py - 16}px)`);
      });
    };

    const barsLayer = g.append("g").attr("class", "bars");
    const markersLayer = g.append("g").attr("class", "markers");

    const clearMarker = () => markersLayer.selectAll("*").remove();
    const drawMarker = (cx: number, cy: number, fill: string) => {
      const m = markersLayer.append("g").attr("transform", `translate(${cx},${cy})`);
      m.append("circle").attr("r", 10).attr("fill", "white").attr("stroke", "white").attr("stroke-width", 2);
      m.append("circle").attr("r", 5).attr("fill", fill);
    };

    const flatData = rows.flatMap((r) =>
      ([INCOME_KEY, EXPENSE_KEY] as const).map((k) => ({
        key: k,
        monthLabel: r.monthLabel,
        value: r[k] as number,
      }))
    );

    const fillFor = (k: "income" | "expense") =>
      k === INCOME_KEY ? colorIncome : colorExpense;

    barsLayer
      .selectAll("rect.bar")
      .data(flatData)
      .join("rect")
      .attr("class", "bar")
      .attr("rx", barRadius)
      .attr("ry", barRadius)
      .attr("fill", (d) => fillFor(d.key))
      .attr("x", (d) => xFor(d.monthLabel, d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", barW)
      .attr("height", (d) => Math.max(0, y(0) - y(d.value)))
      .on("mousemove", onMove)
      .on("mouseover", (_, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<div><strong>${d.monthLabel} ${year}</strong></div>
             <div>${d.key === INCOME_KEY ? "Income" : "Expense"}:
               <strong>${formatAmount(Number(d.value))}</strong></div>`
          );
        clearMarker();
        const cx = xFor(d.monthLabel, d.key) + barW / 2;
        const cy = y(d.value);
        drawMarker(cx, cy, fillFor(d.key));
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
        clearMarker();
      });

    // Legend
    const legend = g.append("g").attr("transform", `translate(${innerW - 140}, 0)`);
    const legendItems = [
      { k: INCOME_KEY, label: "Income", fill: colorIncome },
      { k: EXPENSE_KEY, label: "Expense", fill: colorExpense },
    ];
    const li = legend
      .selectAll("g")
      .data(legendItems)
      .join("g")
      .attr("transform", (_d, i) => `translate(0, ${i * 22})`);
    li.append("rect").attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", (d) => d.fill);
    li.append("text").attr("x", 18).attr("y", 10).attr("font-size", 12).text((d) => d.label);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [W, H, rows, year, containerRef]);

  return (
    <div ref={containerRef} className={styles.moneyflow_wrapper}>
      <svg ref={svgRef} role="img" aria-label="Income and Expense by month" />
      <div ref={tooltipRef} />
    </div>
  );
}

function monthlyTotals(rows: Transaction[]) {
  const months = d3.range(12);
  const fmtMonth = d3.timeFormat("%b");
  const monthDate = (m: number) => new Date(new Date().getFullYear(), m, 1);

  return months.map((m) => {
    const monthTx = rows.filter((t) => new Date(t.date).getMonth() === m);
    const income = d3.sum(
      monthTx.filter((t) => t.type === "income"),
      (t) => t.amount.amount
    );
    const expense = d3.sum(
      monthTx.filter((t) => t.type === "expense"),
      (t) => t.amount.amount
    );
    return { monthIdx: m, monthLabel: fmtMonth(monthDate(m)), income, expense };
  });
}
