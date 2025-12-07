import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { RiskMetric } from '../types';

interface RiskCorrelationProps {
  data: RiskMetric[];
}

const RiskCorrelation: React.FC<RiskCorrelationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const margin = { top: 30, right: 30, bottom: 30, left: 50 };
    const width = 450 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const assets = data.map(d => d.asset);

    // Build X scales and axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(assets)
      .padding(0.01);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "middle")
        .style("fill", "#94a3b8"); // slate-400

    // Build Y scales and axis
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(assets)
      .padding(0.01);

    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
        .style("fill", "#94a3b8");

    // Remove axis lines to make it look like a matrix
    g.selectAll(".domain").remove();

    // Color scale
    const myColor = d3.scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(["#f43f5e", "#0f172a", "#10b981"]); // rose-500, slate-900, emerald-500

    // Read the data
    const matrixData: { x: string; y: string; val: number }[] = [];
    data.forEach(row => {
        Object.entries(row.correlations).forEach(([key, val]) => {
            matrixData.push({ x: row.asset, y: key, val });
        });
    });

    // Rectangles
    g.selectAll("rect")
      .data(matrixData, (d: any) => d.x + ':' + d.y)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.x) || 0)
      .attr("y", (d) => y(d.y) || 0)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => myColor(d.val));

    // Labels
    g.selectAll("text.label")
        .data(matrixData)
        .enter()
        .append("text")
        .classed("label", true)
        .text((d) => d.val.toFixed(2))
        .attr("x", (d) => (x(d.x) || 0) + x.bandwidth() / 2)
        .attr("y", (d) => (y(d.y) || 0) + y.bandwidth() / 2)
        .style("text-anchor", "middle")
        .style("dominant-baseline", "central")
        .style("font-size", "10px")
        .style("fill", "#e2e8f0");

  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-slate-300 mb-2">Correlation Matrix</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RiskCorrelation;