import React, { FC, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { flex, colors, margins } from "styles/main";
import { css } from "@emotion/core";
import useMiniBarGraph from "hooks/useMiniBarGraph";
import { fontSize } from "styles/text";
import useBarGraph from "hooks/useBarGraph";

interface CaseData {
  caseType: string;
  count: number;
}

interface Props {
  id: string;
  data?: any;
  title?: string;
}

const graphColors = [
  "#7E778E",
  "#B7ADCF",
  "#E2D6FF",
  "#9CFCDA",
  "#E1C9FC",
  "#073B4C",
  "#118AB2",
  "#EF476F"
];

const BarChart: FC<Props> = ({ id, data, title }) => {
  useBarGraph(id, data, graphColors);
  // useStackedBarChart(id, caseData);
  // useHorizontalBarGraph(id, caseData);

  return (
    <div css={[flex.column, flex.justifycenter, mainwrapper]}>
      <h2 css={graphTitle}>{title}</h2>
      <div css={graphwrapper}>
        <div css={graphcontainer} id="graphContainer">
          <svg css={bg} id={id} viewBox="0 0 760 300"></svg>
        </div>
        <div css={[bottomline, topline]}></div>
        <div css={bottomline}></div>
      </div>
    </div>
  );
};

export default BarChart;

const mainwrapper = css`
  margin: 0 auto;
  margin-top: 60px;
  width: 800px;
`;

const graphTitle = css`
  margin-bottom: 20px;
  font-size: ${fontSize[24]};
  font-weight: 500;
  color: ${colors.black60};
`;

const bg = css`
  .textBg {
    position: relative;
    height: 42px;
    padding: 15px;
    rx: 4px;
    fill: #3a3a43;
  }

  .hoverText {
    position: absolute;
    z-index: 20;
    height: 32px;
    color: purple;
    fill: white;
    font-size: 14px;
    font-weight: 500;
  }
  path {
    stroke: ${colors.white};
    stroke-width: 30px;
  }
`;

const graphwrapper = css`
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 800px;
  padding-top: 5px;
`;
const graphcontainer = css`
  margin: 0 auto;
  width: 700px;

  svg {
    position: relative;
  }
`;

const bottomline = css`
  position: absolute;
  bottom: 52px;
  height: 1px;
  width: 100%;
  /* background-color: ${colors.black10}; */
`;
const topline = css`
  top: 0;
  background-color: transparent;
`;
