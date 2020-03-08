import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { css } from "@emotion/core";
import { colors } from "styles/main";
import { fontSize } from "styles/text";
import { Button } from "components/styled/Button";

const Container = props => (
  <div
    css={[
      props.flex === "column" && column,
      props.flex === "row" && row,
      props.flex === "rowwrap" && rowwrap,
      //rows
      props.flex === "row" && props.xpos === "center" && justifycenter,
      props.flex === "row" && props.xpos === "start" && justifystart,
      props.flex === "row" && props.xpos === "end" && justifyend,
      props.flex === "row" && props.ypos === "center" && aligncenter,
      props.flex === "row" && props.ypos === "start" && alignstart,
      props.flex === "row" && props.ypos === "end" && alignend,
      //columns
      props.flex === "column" && props.xpos === "center" && aligncenter,
      props.flex === "column" && props.xpos === "start" && alignstart,
      props.flex === "column" && props.xpos === "end" && alignend,
      props.flex === "column" && props.ypos === "center" && justifycenter,
      props.flex === "column" && props.ypos === "start" && justifystart,
      props.flex === "column" && props.ypos === "end" && justifyend,
      props.margin && margin(props.margin),
      props.padding && padding(props.padding),
      props.w && width(props.w),
      props.h && height(props.h),
      props.hundo && hundo
    ]}
  >
    {props.children}
  </div>
);

export default Container;

const column = css`
  display: flex;
  flex-direction: column;
  background-color: teal;
`;
const row = css`
  /* height: 500px; */
  display: flex;
  flex-direction: row;
`;
const rowwrap = css`
  display: flex;
  flex-flow: row wrap;
`;
const justifycenter = css`
  justify-content: center;
`;
const justifystart = css`
  justify-content: flex-start;
`;
const justifyend = css`
  justify-content: flex-end;
`;
const aligncenter = css`
  align-items: center;
`;
const alignstart = css`
  align-items: flex-start;
`;
const alignend = css`
  align-items: flex-end;
`;
const hundo = css`
  width: 100%;
`;

const margin = m => css`
  margin: ${m};
`;
const padding = p => css`
  padding: ${p};
`;
const height = h => css`
  height: ${h};
`;
const width = w => css`
  width: ${w};
`;
