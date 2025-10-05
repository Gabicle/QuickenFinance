import * as d3 from "d3";
import { useRef, useMemo, useEffect } from "react";

export type DonutDatum = { name: string; value: number; color?: string };

const formatCurrencyDefault = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(n);



type Props = {
  data: DonutDatum[];
  width?: number;
  height?: number;
  padAngle?: number;
  showTotalInCenter?: boolean;
  title?: string;
};


export default function DonutChart({
  data,
  width = 420,
  height = 260,
  padAngle = 0.029,
  innerRatio = 0.65,
  showTotalInCenter = true,
  title,
}: Props) {

  const currency = formatCurrencyDefault;
  const svgRef = useRef<SVGSVGElement | null>(null);


  const cleanData = useMemo(
    () => data.filter(d => d.value > 0),
    [data]
  );

  const total = useMemo(
    () => cleanData.reduce((a, b) => a + b.value, 0),
    [cleanData]
  );

  // fall back palette
  const color = useMemo(() => {
    const names = cleanData.map(d => d.name);
    const provided = new Map(cleanData.map(d => [d.name, d.color]));
    const scale = d3.scaleOrdinal<string, string>(d3.schemeTableau10).domain(names);

    return (name: string) => provided.get(name) ?? scale(name);
  }, [cleanData]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 420;
    const H = 260;
    const cx = W * 0.35;   // leave room for legend at right
    const cy = H / 2;
    const outerR = Math.min(W * 0.6, H) / 2;
    const innerR = Math.max(0, Math.min(outerR - 2, outerR * innerRatio));

    const g = svg
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("role", "img")
      .append("g")
      .attr("transform", `translate(${cx},${cy})`);

    const pie = d3
      .pie<DonutDatum>()
      .sort(null)
      .value((d: { value: any; }) => d.value)
      .padAngle(padAngle);

    const arcs = pie(cleanData);

    const arc = d3.arc<d3.PieArcDatum<DonutDatum>>()
      .outerRadius(outerR)
      .innerRadius(innerR);

    // slices with simple enter animation
    g.selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(650)
      .attrTween("d", function (d) {
        const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
        return t => arc(i(t))!;
      });

    // center total text
    if (showTotalInCenter) {
      const center = g.append("g").attr("text-anchor", "middle");
      if (title) {
        center
          .append("text")
          .attr("y", -6)
          .attr("font-size", 12)
          .attr("fill", "#6b7280")
          .text(title);
      }
      center
        .append("text")
        .attr("y", title ? 14 : 4)
        .attr("font-weight", 700)
        .attr("font-size", 18)
        .text(currency(total));
      center
        .append("text")
        .attr("y", (title ? 34 : 24))
        .attr("font-size", 11)
        .attr("fill", "#6b7280")
        .text("Total Spendings");
    }

    // right legend (labels + %)
    const legendX = W * 0.62;
    const rowH = 20;
    const legend = svg.append("g").attr("transform", `translate(${legendX},${20})`);

    const rows = legend.selectAll("g.row")
      .data(arcs)
      .join("g")
      .attr("class", "row")
      .attr("transform", (_, i) => `translate(0, ${i * rowH})`);

    rows.append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 6)
      .attr("fill", d => color(d.data.name));

    rows.append("text")
      .attr("x", 12)
      .attr("y", 10)
      .attr("font-size", 12)
      .text(d => d.data.name);

    rows.append("text")
      .attr("x", 180)
      .attr("y", 10)
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .text(d => {
        const pct = total === 0 ? 0 : (d.data.value / total) * 100;
        return `${pct.toFixed(0)}%`;
      });

    // accessible title/desc
    svg.append("title").text(`${title ?? "Spending"} • ${currency(total)}`);
  }, [cleanData, color, innerRatio, padAngle, currency, title, showTotalInCenter]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ display: "block", maxWidth: "100%" }}
    />
  );


}