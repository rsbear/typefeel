import React from "react";
import { css } from "@emotion/core";
import { colors, margin, width } from "styles/main";
import { fontSize } from "styles/text";

export const Button = props => {
  return (
    <button
      css={[
        btn,
        props.size === "large" && large,
        props.size === "mini" && mini,
        props.size === "small" && small,
        props.kind === "error" && error,
        props.kind === "cta" && cta,
        props.kind === "secondary" && secondary,
        props.w && width(props.w),
        props.margin && margin(props.margin)
      ]}
      {...props}
    >
      {props.children}
    </button>
  );
};

const btn = css`
  height: 40px;
  padding-left: 22px;
  padding-right: 22px;
  border: solid 1px ${colors.black80};
  border-radius: 5px;
  background-color: ${colors.black80};

  font-size: ${fontSize[14]};
  color: white;

  transition: all 200ms ease;
  outline: 0;

  &:hover {
    background-color: transparent;
    color: black;
  }

  &:disabled {
    cursor: default;
    border-color: ${colors.black10};
    background-color: ${colors.black10};
    color: ${colors.black40};
    opacity: 0.7;
  }
  &:disabled:hover {
    cursor: default;
  }
`;
const mini = css`
  height: 24px;
`;
const small = css`
  height: 32px;
`;
const large = css`
  height: 48px;
`;
const error = css`
  background-color: red;
`;
const cta = css`
  background-color: #60a3d6;
  border-color: #60a3d6;

  &:hover {
    color: #60a3d6;
  }
`;
const secondary = css`
  color: black;
  background-color: transparent;
`;
const hundo = css`
  width: 100%;
`;
