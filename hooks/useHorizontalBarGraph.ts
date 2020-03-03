import React, { useEffect } from 'react'
import * as d3 from "d3";

export default function useHorizontalBarGraph(id, data) {
  const margin = { top: 0, right: 20, bottom: 30, left: 0 },
    // width = 900 - margin.left - margin.right,
    width = 900,
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

  // const colors = ["#1b2027", "#2f3a47", "#394656", "#29323d", "#2f3a47"]

  const countValues = data.map(d => d.count);
  const nameValues = data.map(d => d.count);

  useEffect(() => {
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);
    const ynum = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    const x = d3.scaleLinear()
      .range([0, width]);

    const svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", "100%")
      // .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, (d) => d.count)])
    y.domain(data.map((d) => d.name));
    ynum.domain(data.map((d) => d.count));

    // y.domain([0, d3.max(data, (d) => d.name)]);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bars")


    svg.selectAll(".bars")
      .attr("x", d => x(d.name))
      .attr("width", (d) => x(d.count))
      .attr("y", (d) => y(d.name))
      .attr("height", "42px")
      .attr("rx", "21px")
      .attr("fill", (d, i) => colors[i])

    svg.selectAll(".bars")
      .append("text")
      .attr("class", "label")
      .text(d => d.count)
      .attr("y", (d) => y(d.name) + y.bandwidth() / 2 + 4)
      //x position is 3 pixels to the right of the bar
      .attr("x", d => x(d.value) + 3)
      .style("font-size", "12px")

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(data.length).tickSize(0).tickFormat(d3.format("d")))
      .style("font-weight", "bold")
      .style("font-size", "0px")

    // add the y Axis
    svg.append("g")
      .data(data)
      .call(d3.axisLeft(y).tickSize(0))
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .style("font-size", "14px")
      .attr("transform", "translate(20, 20)")

    svg.append("g")
      .data(data)
      .call(d3.axisLeft(ynum).tickSize(0))
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .style("font-size", "16px")
      .attr("transform", "translate(20, -18)")


  }, [data])
}