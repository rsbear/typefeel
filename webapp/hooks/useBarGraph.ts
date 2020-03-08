import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import * as d3 from "d3";
import d3Tip from "d3-tip";
import useHover from "./useHover";
import { css } from "@emotion/core";


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

export default function useBarGraph(id, data, colors) {
  const [callbackRef, value] = useHover()
  const space = 54
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 760,
    height = 240 - margin.top - margin.bottom;

  useEffect(() => {
    console.log(callbackRef)
  }, [callbackRef])

  useEffect(() => {
    const y = d3.scaleLinear().range([height, 0]);
    const x = d3.scaleBand().range([0, width]).padding(.02);

    const svg = d3
      .select("#" + id)
      .append("svg")
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      // .attr("y", + 40)
      .append("g");

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.count)]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("id", (d, i) => "barGroup" + i)
      .attr("text-anchor", "middle")
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.count) + space)
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("rx", "4px")
      // .attr("fill", (d, i) => colors[i])
      .attr("fill", "#ebebeb")
      .on("mouseover", function (d, i) {
        d3.select(this).style("fill", "#9CFCDA")
        svg.select("#barGroup" + i)
          .append("rect")
          .attr("class", "textBg")
          .attr("y", (d) => y(d.count))
          .attr("x", d => x(d.name) + 12)
          .attr("width", x.bandwidth() - 24);
        // .attr("x", d => ((x(d.name) + x.bandwidth() / 2)) - (x.bandwidth() / 10))
        // .attr("width", x.bandwidth() / 5);
        // svg.select("#barGroup" + i)
        //   .append("path")
        //   .attr("class", "toolPath")
        //   .attr("d", "M 10 25 L 10 75 L 60 75 L 10 25")
        //   .attr("transform", "rotate(-45)")
        //   .attr("x", x(d.name) + x.bandwidth() / 2)
        //   .style("stroke-width", 0)
        svg.select("#barGroup" + i)
          .append("text")
          .attr("class", "hoverText")
          .text("Join count" + ": " + d.count)
          .attr("x", x(d.name) + x.bandwidth() / 2)
          .attr("y", (d) => y(d.count) + 26)
          .attr("width", x.bandwidth() - 20)
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("fill", "#ebebeb")
        svg.select(".textBg").remove()
        svg.select(".hoverText").remove();
      });

    svg.selectAll("barGroup")
      .attr("class", "hovering")
      .append("text")
      .text("yes")

    // add the x Axis
    svg
      .append("g")
      .attr("class", "names")
      .attr("transform", "translate(0," + 226 + ")")
      // .attr("y", + space)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(0))
      .attr("fill", "#FC5130")
      .style("background", "#FC5130")
      .style("color", "#9191A3")
      .style("font-size", "14px");


  }, [data]);
  return { data };
}

const hoverStyle = css`
  position: absolute;
  background-color: pink;
`