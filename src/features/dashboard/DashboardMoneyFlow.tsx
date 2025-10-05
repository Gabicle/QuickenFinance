import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { Transaction } from "../transactions/model/transaction";

type Props = {
  year?: number;
  transactions: Transaction[];
};

const DashboardMoneyFlow = ({ year = new Date().getFullYear(), transactions }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = 760;
    const height = 420;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const root = svg.append("g");
    const barsLayer = root.append("g").attr("class", "bars");
    const markersLayer = root.append("g").attr("class", "markers");

    // Months scaffold
    const months = d3.range(12);
    const fmtMonth = d3.timeFormat("%b");
    const monthDate = (m: number) => new Date(year, m, 1);

    // Completed only, same year
    const completed = (transactions ?? []).filter(
      (t) => t.status === "completed" && new Date(t.date).getFullYear() === year
    );

    // Currency fallback
    const currency = completed[0]?.amount?.currency ?? "EUR";
    const moneyFmt = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });

    // Aggregate per month (positive values for both)
    const rows = months.map((m) => {
      const monthTx = completed.filter((t) => new Date(t.date).getMonth() === m);
      const income = d3.sum(monthTx.filter((t) => t.type === "income"), (t) => t.amount.amount);
      const expense = d3.sum(monthTx.filter((t) => t.type === "expense"), (t) => t.amount.amount);
      return {
        monthIdx: m,
        monthLabel: fmtMonth(monthDate(m)),
        income,
        expense,
      };
    });

    // Keys for grouping
    const keys: Array<"income" | "expense"> = ["income", "expense"];

    // X scale for months (reduced padding for more room)
    const x0 = d3
      .scaleBand()
      .domain(rows.map((d) => d.monthLabel))
      .range([margin.left, width - margin.right])
      .padding(0.15);

    const groupGap = 10;
    const nominalBarWidth = 60;

    const x0bw = x0.bandwidth();
    const maxBarWidth = Math.max(1, (x0bw - (keys.length - 1) * groupGap) / keys.length);
    const barWidth = Math.min(nominalBarWidth, maxBarWidth);
    const groupWidth = keys.length * barWidth + (keys.length - 1) * groupGap;

    const xFor = (monthLabel: string, key: "income" | "expense") => {
      const base = (x0(monthLabel) || 0) + (x0bw - groupWidth) / 2;
      const idx = keys.indexOf(key);
      return base + idx * (barWidth + groupGap);
    };

    // Y scale
    const maxY = d3.max(rows, (r) => Math.max(r.income || 0, r.expense || 0)) ?? 0;
    const y = d3
      .scaleLinear()
      .domain([0, maxY || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Colors
    const color = (k: "income" | "expense") => (k === "income" ? "purple" : "red");

    // Axes
    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat((d: any) => moneyFmt.format(Number(d))))
      .call((g) =>
        g
          .append("text")
          .attr("x", 0)
          .attr("y", margin.top - 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text("Amount")
      );

    // Tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "rgba(0,0,0,0.75)")
      .style("color", "#fff")
      .style("padding", "6px 8px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("opacity", 0);

    const onMove = (event: any) => {
      const [px, py] = d3.pointer(event, wrapperRef.current as any);
      tooltip.style("left", `${px + 12}px`).style("top", `${py + 12}px`);
    };

    const clearMarker = () => markersLayer.selectAll("*").remove();
    const drawMarker = (cx: number, cy: number, fill: string) => {
      const g = markersLayer.append("g").attr("transform", `translate(${cx},${cy})`);
      // outer white circle
      g.append("circle").attr("r", 12).attr("fill", "white").attr("stroke", "white").attr("stroke-width", 2);
      // inner colored circle
      g.append("circle").attr("r", 6).attr("fill", fill);
    };

    // tooltip data
    const onOver = (event: any, payload: { key: "income" | "expense"; monthLabel: string; value: number }) => {
      tooltip
        .style("opacity", 1)
        .html(
          `<div><strong>${payload.monthLabel} ${year}</strong></div>
           <div>${payload.key === "income" ? "Income" : "Expense"}:
             <strong>${moneyFmt.format(payload.value)}</strong></div>`
        );

      clearMarker();
      const cx = xFor(payload.monthLabel, payload.key) + barWidth / 2;
      const cy = y(payload.value);
      drawMarker(cx, cy, color(payload.key));
    };

    const onOut = () => {
      tooltip.style("opacity", 0);
      clearMarker();
    };

    // Flatten data for grouped bars
    const flatData = rows.flatMap((r) =>
      (["income", "expense"] as const).map((k) => ({
        key: k,
        monthLabel: r.monthLabel,
        value: r[k] as number,
      }))
    );

    // Bars (fixed width + rounded corners)
    barsLayer
      .selectAll("rect.bar")
      .data(flatData)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", (d) => color(d.key))
      .attr("x", (d) => xFor(d.monthLabel, d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", barWidth)
      .attr("height", (d) => Math.max(0, y(0) - y(d.value)))
      .on("mousemove", onMove)
      .on("mouseover", (event, d) => onOver(event, d))
      .on("mouseout", onOut);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - 160}, ${margin.top})`);

    const legendItems: Array<{ k: "income" | "expense"; label: string }> = [
      { k: "income", label: "Income" },
      { k: "expense", label: "Expense" },
    ];

    const item = legend
      .selectAll("g")
      .data(legendItems)
      .join("g")
      .attr("transform", (_: any, i: number) => `translate(0, ${i * 22})`);

    item.append("rect").attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", (d) => color(d.k));
    item.append("text").attr("x", 18).attr("y", 10).attr("font-size", 12).text((d) => d.label);
  }, [year, transactions]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "fit-content" }}>
      <svg ref={svgRef} />
      <div ref={tooltipRef} />
    </div>
  );
};

export default DashboardMoneyFlow;
