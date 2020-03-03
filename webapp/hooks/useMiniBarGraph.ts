import React, { useEffect } from "react";
import * as d3 from "d3";


export default function useMiniBarGraph(id, data, colors) {
  const margin = { top: 20, right: 20, bottom: 30, left: 0 },
    width = 200,
    height = 102;

  useEffect(() => {
    const y = d3.scaleLinear().range([height, 0]);
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.05);

    const svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    // .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // x.domain(data.map(d => d.name));
    x.domain(data.map(d => d.count));
    y.domain([0, d3.max(data, d => d.count)]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.count))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("rx", "3px")
      .attr("fill", (d, i) => colors[i])
    // .text(d => d.count)

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.count > 0 ? d.count : null)
      .attr("x", (d, i) => x(d.count) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count) + 18)
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "black")
      .attr("text-anchor", "middle");

    // add the x Axis
    // svg
    //   .append("g")
    //   .attr("transform", "translate(0," + (height) + ")")
    //   .call(d3.axisBottom(x).tickSize(0))
    // .style("font-weight", "bold")
    // .style("font-size", "10px")

    // rotate the text
    // svg.selectAll("text")
    //   .style("text-anchor", "end")
    //   .attr("dx", "-.8em")
    //   .attr("dy", "-.55em")
    //   .attr("transform", "rotate(-50)");

    // add the y Axis
    // svg
    //   .append("g")
    //   // .call(d3.axisLeft(y))
    //   .call(
    //     d3
    //       .axisLeft(y)
    //       .ticks(data.length)
    //       .tickSize(0)
    //       .tickFormat(d3.format("d"))
    //   )
    //   .style("font-weight", "bold")
    //   .style("font-size", "14px");

    // svg
    //   .selectAll("line")
    //   .attr("stroke", "#fff");
  }, [data]);
  return { data };
}

