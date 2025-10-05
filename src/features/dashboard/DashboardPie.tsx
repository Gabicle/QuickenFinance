import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { Transaction } from "../transactions/model/transaction";
import { useTransactions } from "../../hooks/useTransactions";

type Props = {
  /** Optional: pass pre-fetched transactions. If omitted, this component fetches completed tx itself. */
  transactions?: Transaction[];
};

type RangeKey = "weekly" | "monthly" | "yearly";

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
  if (s.includes("transport") || s.includes("bus") || s.includes("taxi") || s.includes("ride")) return "transportation";
  if (s.includes("subscription") || s.includes("stream")) return "subscription";
  if (s.includes("shop") || s.includes("store") || s.includes("clothing") || s.includes("electronics") || s.includes("book")) return "shopping";
  if (s.includes("utilit") || s.includes("electric") || s.includes("water") || s.includes("gas") || s.includes("internet")) return "utilities";
  if (s.includes("rent") || s.includes("housing") || s.includes("landlord")) return "rent";
  if (s.includes("health") || s.includes("pharmacy") || s.includes("clinic") || s.includes("dental")) return "health";
  if (s.includes("entertain") || s.includes("cinema") || s.includes("concert") || s.includes("game")) return "entertainment";
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

const DashboardPie: React.FC<Props> = ({ transactions }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [range, setRange] = useState<RangeKey>("weekly");

  // If no transactions provided, fetch completed (large page)
  const { data: fetchedPage } = useTransactions({
    page: 1,
    pageSize: 1000,
    status: "completed",
    sort: "date",
  });
  const fetched = fetchedPage?.data ?? [];
  const allTx = transactions ?? fetched;

  // Expenses only, completed, in selected range
  const filtered = useMemo(() => {
    const start = startForRange(range);
    const now = new Date();
    return (allTx ?? []).filter(
      (t) =>
        t.status === "completed" &&
        t.type === "expense" &&
        new Date(t.date) >= start &&
        new Date(t.date) <= now
    );
  }, [allTx, range]);

  // Currency & formatting
  const currency = filtered[0]?.amount?.currency ?? "EUR";
  const fmtMoney = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

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

  const total = data.reduce((s, d) => s + d.value, 0);

  // Colors
  const color = d3
    .scaleOrdinal<string, string>()
    .domain(data.map((d) => d.key))
    .range(d3.schemeTableau10.concat(d3.schemeSet2.flat()).slice(0, Math.max(10, data.length)));

  // Draw donut
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 320;
    const height = 220;
    svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);

    const cx = 110; // keep space on the right for legend
    const cy = height / 2;
    const radius = Math.min(200, Math.min(cx, height / 2) - 6);
    const innerR = radius * 0.64;
    const outerR = radius;

    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);

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

    // Tooltip
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "rgba(0,0,0,0.75)")
      .style("color", "#fff")
      .style("padding", "6px 8px")
      .style("border-radius", "8px")
      .style("font-size", "12px")
      .style("opacity", 0);

    const onMove = (event: any) => {
      const [px, py] = d3.pointer(event, containerRef.current as any);
      tooltip.style("left", `${px + 12}px`).style("top", `${py + 12}px`);
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
    const onOut = () => tooltip.style("opacity", 0);

    // Segments
    g.selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.key))
      .on("mousemove", onMove)
      .on("mouseover", onOver)
      .on("mouseout", onOut);

    // Center text (total)
    const center = g.append("g").attr("text-anchor", "middle");
    center
      .append("text")
      .attr("y", -4)
      .attr("font-size", 18)
      .attr("font-weight", 700)
      .text(fmtMoney.format(total));
    center
      .append("text")
      .attr("y", 16)
      .attr("fill", "#6b7280")
      .attr("font-size", 12)
      .text("Total Spendings");
  }, [data, total, currency]); // redraw when inputs change

  // Legend (names only)
  const items = useMemo(
    () => data.map((d) => ({ ...d, fill: color(d.key) })),
    [data, color]
  );

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "flex", alignItems: "center", gap: 24 }}
    >
      {/* Left: Donut */}
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} />
      </div>

      {/* Right: Range dropdown + legend */}
      <div style={{ flex: 1, minWidth: 200 }}>
        {/* Dropdown */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as RangeKey)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
              background: "#fff",
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Legend with names only */}
        <div style={{ display: "grid", rowGap: 10 }}>
          {items.length === 0 ? (
            <div style={{ color: "#6b7280", fontSize: 12 }}>No expenses in this period.</div>
          ) : (
            items.map((d) => (
              <div
                key={d.key}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      display: "inline-block",
                      background: d.fill,
                    }}
                  />
                  <span style={{ fontSize: 14 }}>{d.label}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tooltip element */}
      <div ref={tooltipRef} />
    </div>
  );
};

export default DashboardPie;
