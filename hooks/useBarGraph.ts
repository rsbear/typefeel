import React, { useEffect } from "react";
import * as d3 from "d3";

const colors = [
  "#FFAACD",
  "#9CF1FC",
  "#FFE28E",
  "#9CFCDA",
  "#E1C9FC",
  "#073B4C",
  "#118AB2",
  "#EF476F"
];
const color = () => colors[Math.floor(Math.random() * colors.length)];

export default function useBarGraph(id, data) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 300 - margin.left - margin.right,
    height = 180 - margin.top - margin.bottom;

  useEffect(() => {
    const y = d3.scaleLinear().range([height, 0]);
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);

    const svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.count)]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("rx", "4px")
      .attr("fill", (d, i) => colors[i]);

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .style("font-weight", "bold")
      .style("font-size", "11px");

    // add the y Axis
    svg
      .append("g")
      // .call(d3.axisLeft(y))
      .call(
        d3
          .axisLeft(y)
          .ticks(data.length)
          .tickSize(0)
          .tickFormat(d3.format("d"))
      )
      .style("font-weight", "bold")
      .style("font-size", "14px");

    // svg
    //   .selectAll("line")
    //   .attr("stroke", "#fff");
  }, [data]);
  return { data };
}

