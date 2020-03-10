import React, { ButtonHTMLAttributes } from "react";
import { css } from "@emotion/core";
import { colors, margin, width } from "styles/main";
import { fontSize } from "styles/text";

interface Props {
  size?: "mini" | "large" | "small";
  kind?: "cta" | "err" | "secondary";
  w?: string;
  h?: string;
  margin?: string;
  children?: any;
  role?: "button" | "submit";
  value?: string | any;
  onClick?: any;
  disabled?: any;
  className?: string | any;
}

export const Button = (props: Props) => {
  return (
    <button
      css={[
        btn,
        props.size === "large" && large,
        props.size === "mini" && mini,
        props.size === "small" && small,
        props.kind === "err" && error,
        props.kind === "cta" && cta,
        props.kind === "secondary" && secondary,
        props.w && width(props.w),
        props.margin && margin(props.margin)
      ]}
      {...props}
      type={props.role}
    >
      {props.value}
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
  padding-left: 12px;
  padding-right: 12px;
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
  background-color: #4dddb0;
  border-color: #4dddb0;

  &:hover {
    color: #4dddb0;
  }
`;
const secondary = css`
  background-color: transparent;
  border-color: ${colors.black10};
  color: black;
  font-size: ${fontSize[12]};

  &:hover {
    background-color: ${colors.black90};
    color: white;
  }
`;
const hundo = css`
  width: 100%;
`;
