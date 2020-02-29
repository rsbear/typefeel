import React, { FC, useEffect, useMemo } from "react";
import * as d3 from "d3";
import { flex, colors, margins } from "styles/main";
import { css } from "@emotion/core";
import useBarGraph from "hooks/useBarGraph";
import useStackedBarChart from "hooks/useStackedBarChart";
import useHorizontalBarGraph from "hooks/useHorizontalBarGraph";
import useMiniBarGraph from "hooks/useMiniBarGraph";
import { fontSize } from "styles/text";

interface CaseData {
  caseType: string;
  count: number;
}

interface Props {
  id: string;
  caseData?: CaseData[];
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

const CasesBarGraph: FC<Props> = ({ id, caseData }) => {
  useMiniBarGraph(id, caseData, graphColors);
  // useStackedBarChart(id, caseData);
  // useHorizontalBarGraph(id, caseData);

  return (
    <div css={[flex.column, container]}>
      <h2 css={graphTitle}>Cases</h2>

      <svg css={bg} id={id} viewBox="0 0 200 100" />
      <ul css={list}>
        {caseData.map((c: any, idx: number) => (
          <li key={idx} css={flex.row}>
            <div
              className="circle"
              css={() => circleColor(graphColors[idx])}
            ></div>
            <h5>{c.name}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CasesBarGraph;

const container = css`
  position: relative;
  width: 220px;

  background-color: rgba(0,0,0,.03);
  /* border: solid 1px ${colors.black05}; */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 30px;
`;

const graphTitle = css`
  /* margin-right: 20px; */
  font-size: ${fontSize[18]};
  font-weight: 400;
`;

const list = css`
  margin-bottom: 10px;
  position: relative;
  margin-top: 10px;
  /* margin-bottom: 40px; */

  li {
    padding: 5px;
    .circle {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
`;

const circleColor = (s: string) => css`
  background-color: ${s};
`;

const bg = css`
  path {
    stroke: transparent;
  }
`;
