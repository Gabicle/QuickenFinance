import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";

import styles from "./DashboardPie.module.css";
import type { Transaction } from "../../../transactions/model/transaction";

type Props = {
  transactions: Transaction[];
  range: RangeKey;
};

export type RangeKey = "weekly" | "monthly" | "yearly";

type CatKey =
  | "groceries"
  | "dining"
  | "transportation"
  | "subscription"
  | "shopping"
  | "utilities"
  | "rent"
  | "health"
  | "entertainment"
  | "investment"
  | "salary"
  | "freelance"
  | "refund"
  | "other";

const CAT_LABELS: Record<CatKey, string> = {
  groceries: "Groceries",
  dining: "Dining",
  transportation: "Transportation",
  subscription: "Subscription",
  shopping: "Shopping",
  utilities: "Utilities",
  rent: "Housing",
  health: "Health",
  entertainment: "Entertainment",
  investment: "Investment",
  salary: "Salary",
  freelance: "Freelance",
  refund: "Refund",
  other: "Other",
};

function toCatKey(label: string | undefined | null): CatKey {
  const s = (label ?? "").toLowerCase();
  if (s.includes("grocery") || s === "food") return "groceries";
  if (s.includes("dining") || s.includes("restaurant") || s.includes("cafe")) return "dining";
  if (s.includes("transport") || s.includes("bus") || s.includes("taxi") || s.includes("ride"))
    return "transportation";
  if (s.includes("subscription") || s.includes("stream")) return "subscription";
  if (
    s.includes("shop") ||
    s.includes("store") ||
    s.includes("clothing") ||
    s.includes("electronics") ||
    s.includes("book")
  )
    return "shopping";
  if (
    s.includes("utilit") ||
    s.includes("electric") ||
    s.includes("water") ||
    s.includes("gas") ||
    s.includes("internet")
  )
    return "utilities";
  if (s.includes("rent") || s.includes("housing") || s.includes("landlord")) return "rent";
  if (s.includes("health") || s.includes("pharmacy") || s.includes("clinic") || s.includes("dental"))
    return "health";
  if (s.includes("entertain") || s.includes("cinema") || s.includes("concert") || s.includes("game"))
    return "entertainment";
  if (s.includes("invest")) return "investment";
  if (s.includes("salary") || s.includes("payroll")) return "salary";
  if (s.includes("free") || s.includes("invoice")) return "freelance";
  if (s.includes("refund") || s.includes("chargeback")) return "refund";
  return "other";
}

function startForRange(range: RangeKey): Date {
  const now = new Date();
  if (range === "weekly") return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6); // last 7 days
  if (range === "monthly") return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29); // last 30 days
  return new Date(now.getFullYear(), 0, 1); // YTD
}

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

export default function DashboardPie({ transactions, range }: Props) {
  const [containerRef, { width }] = useElementSize<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Expenses only, completed, in selected range
  const filtered = useMemo(() => {
    const start = startForRange(range);
    const now = new Date();
    return transactions.filter(
      (t) =>
        t.status === "completed" &&
        t.type === "expense" &&
        new Date(t.date) >= start &&
        new Date(t.date) <= now
    );
  }, [transactions, range]);

  const currency = filtered[0]?.amount?.currency ?? "EUR";
  const fmtMoney = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }),
    [currency]
  );

  // Aggregate by category
  const data = useMemo(() => {
    const map = new Map<CatKey, number>();
    for (const t of filtered) {
      const k = toCatKey(t.category);
      map.set(k, (map.get(k) ?? 0) + (t.amount?.amount ?? 0));
    }
    const arr = Array.from(map, ([key, value]) => ({
      key,
      label: CAT_LABELS[key],
      value,
    })).filter((d) => d.value > 0);
    arr.sort((a, b) => b.value - a.value);
    return arr;
  }, [filtered]);

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  // Layout
  const W = Math.max(0, width);
  const MAX_HEIGHT = 280;
  const aspect = 16 / 9;
  const H = W > 0 ? Math.min(MAX_HEIGHT, Math.round(W / aspect)) : 0;

  useEffect(() => {
    const wrapperEl = containerRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    if (!W || !H || !wrapperEl) return;

    if (data.length === 0) {
      svg
        .attr("width", W)
        .attr("height", H)
        .attr("viewBox", `0 0 ${W} ${H}`)
        .append("text")
        .attr("x", W / 2)
        .attr("y", H / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", 14)
        .attr("fill", "currentColor")
        .attr("opacity", 0.6)
        .text("No expenses in this period.");
      return;
    }

    const readVar = (name: string, fallback: number) => {
      const v = getComputedStyle(wrapperEl).getPropertyValue(name).trim();
      const n = Number(v.replace("px", ""));
      return Number.isFinite(n) && n > 0 ? n : fallback;
    };

    const margin = {
      top: readVar("--chart-mt", 20),
      right: readVar("--chart-mr", 20),
      bottom: readVar("--chart-mb", 16),
      left: readVar("--chart-ml", 16),
    };

    const legendWidth = readVar("--pie-legend-width", 160);
    const innerW = Math.max(0, W - margin.left - margin.right);
    const innerH = Math.max(0, H - margin.top - margin.bottom);

    const donutAreaW = Math.max(120, innerW - legendWidth - 8);
    const cx = margin.left + donutAreaW / 2;
    const cy = margin.top + innerH / 2;

    const radius = Math.max(24, Math.min(donutAreaW, innerH) / 2 - 6);
    const innerR = radius * 0.64;
    const outerR = radius;

    const paletteFallback = d3
      .schemeTableau10.concat((d3 as any).schemeSet2?.flat?.() ?? [])
      .slice(0, Math.max(10, data.length));


    const colorsFromCSS = (() => {
      const cs = getComputedStyle(wrapperEl);
      const arr: string[] = [];
      for (let i = 1; i <= 12; i++) {
        const c = cs.getPropertyValue(`--pie-color-${i}`).trim();
        if (c) arr.push(c);
      }
      return arr.length ? arr : paletteFallback;
    })();

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(data.map((d) => d.key))
      .range(colorsFromCSS);

    svg
      .attr("width", W)
      .attr("height", H)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg.append("g");

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
      .style("border-radius", "8px")
      .style("font-size", "12px")
      .style("opacity", 0)
      .style("will-change", "transform");

    let raf = 0;
    const onMove = (event: any) => {
      if (raf) cancelAnimationFrame(raf);
      const [px, py] = d3.pointer(event, containerRef.current);
      raf = requestAnimationFrame(() => {
        tooltip.style("transform", `translate(${px + 12}px, ${py + 12}px)`);
      });
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    };
    const onOver = (_event: any, d: d3.PieArcDatum<{ key: string; label: string; value: number }>) => {
      const pct = total > 0 ? Math.round((d.data.value / total) * 100) : 0;
      tooltip
        .style("opacity", 1)
        .html(
          `<div><strong>${d.data.label}</strong></div>
           <div>${pct}% • ${fmtMoney.format(d.data.value)}</div>`
        );
    };
    const onOut = () => {
      tooltip.style("opacity", 0);
    };

    // Layers
    const arcsLayer = g.append("g").attr("transform", `translate(${cx},${cy})`);
    const centerLayer = g.append("g").attr("transform", `translate(${cx},${cy})`);
    const legendLayer = g
      .append("g")
      .attr("transform", `translate(${margin.left + donutAreaW + 24},${margin.top})`);

    // Pie
    const pie = d3
      .pie<{ key: string; label: string; value: number }>()
      .sort(null)
      .padAngle(0.01)
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ key: string; label: string; value: number }>>()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .cornerRadius(6);

    const arcs = pie(data);

    // Segments
    arcsLayer
      .selectAll("path.segment")
      .data(arcs)
      .join("path")
      .attr("class", "segment")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.key))
      .on("mousemove", onMove)
      .on("mouseover", onOver)
      .on("mouseout", onOut);

    // Center text (total)
    centerLayer
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -4)
      .attr("font-size", 18)
      .attr("font-weight", 700)
      .text(fmtMoney.format(total));
    centerLayer
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 16)
      .attr("fill", "currentColor")
      .attr("opacity", 0.6)
      .attr("font-size", 12)
      .text("Total Spendings");

    // Legend
    const legendItems = data.map((d) => ({
      key: d.key,
      label: d.label,
      fill: color(d.key),
    }));

    const li = legendLayer
      .selectAll("g.legend-item")
      .data(legendItems)
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (_d, i) => `translate(0, ${i * 22})`);

    li.append("rect").attr("width", 12).attr("height", 12).attr("rx", 6).attr("fill", (d) => d.fill);
    li
      .append("text")
      .attr("x", 18)
      .attr("y", 10)
      .attr("font-size", 12)
      .text((d) => d.label);

    // Empty state text (inside svg)
    if (legendItems.length === 0) {
      g.append("text")
        .attr("x", margin.left + 8)
        .attr("y", margin.top + 12)
        .attr("font-size", 12)
        .attr("fill", "currentColor")
        .attr("opacity", 0.6)
        .text("No expenses in this period.");
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [W, H, data, total, fmtMoney, containerRef]);

  return (
    <div ref={containerRef} className={styles.pie_wrapper}>
      <svg ref={svgRef} role="img" aria-label="Spending by category (donut)" />
      <div ref={tooltipRef} />
    </div>
  );
}
