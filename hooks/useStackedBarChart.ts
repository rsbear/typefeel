import React, { useEffect } from 'react'
import * as d3 from "d3";

export default function useStackedBarChart(id, data) {
  const margin = { top: 20, right: 20, bottom: 30, left: 160 },
    width = 900 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

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

  useEffect(() => {
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    const x = d3.scaleLinear()
      .range([0, width]);

    var svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, (d) => d.count)])
    y.domain(data.map((d) => d.name));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", (d) => x(d.count))
      .attr("y", (d) => y(d.name) + 23)
      // .attr("y", function (d) { return (height - y(d.y)); })
      .attr("height", "24px")
      .attr("rx", "12px")
      // .attr("rx", (y.bandwidth() / 2))
      // .attr("height", y.bandwidth())
      .attr("fill", (d, i) => colors[i]);

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(data.length).tickSize(0).tickFormat(d3.format("d")))
      .style("font-weight", "bold")
      .style("font-size", "16px")

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .style("font-weight", "bold")
      .style("font-size", "14px");
  }, [data])
}