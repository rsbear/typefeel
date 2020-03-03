import React, { FC } from "react";
import { jsx, css } from "@emotion/core";
import { colors, margins } from "./main";
import { fontSize } from "./text";

export const btn = css`
  width: 100%;
  height: 32px;
  outline: none;
  border: solid 1px ${colors.black70};
  border-radius: 4px;
  background-color: ${colors.black70};
  font-size: ${fontSize.tiny};
  color: ${colors.white};
  transition: all 200ms ease;
`;
export const roundLarge = css`
  width: 100%;
  height: 50px;
  outline: none;
  border: solid 0px ${colors.black90};
  border-radius: 25px;
  background-color: ${colors.black90};
  font-weight: 300;
  font-size: ${fontSize.medium};
  color: ${colors.white};
  transition: all 200ms ease;
`;
export const btnSmall = css`
  width: auto;
  margin-right: auto;
  height: 24px;
  outline: none;
  border: solid 1px ${colors.black05};
  border-radius: 4px;
  background-color: ${colors.black05};
  font-size: 12px;
  color: ${colors.black70};
`;
const secondary = css`
  border: solid 1px ${colors.black30};
  background-color: transparent;
  color: ${colors.black70};

  &:hover {
    background-color: ${colors.black70};
    color: ${colors.white};
  }

  &.active {
    background-color: ${colors.black70};
    color: ${colors.white};
  }
`;

const disable = css`
  border: solid 0px ${colors.black50};
  background-color: ${colors.black50};
  color: ${colors.white};
  cursor: default;
`;

const deleteIcon = css`
  font-size: 18px;
`;

const trashButton = css`
  height: 36px;
  width: 36px;
  margin-left: 15px;
  border-radius: 4px;
  border: solid 1px red;
  background: red;
  color: white;
`;

export const DeleteButton = props => {
  return (
    <button css={trashButton} {...props}>
      <i className={props.icon} css={deleteIcon} />
    </button>
  );
};

export const RoundButton: FC<any> = (props: any) => {
  if (props.secondary) {
    return (
      <button {...props} css={[roundLarge, secondary, margins(props.margins)]}>
        {props.children}
      </button>
    );
  }
  if (props.disabled) {
    return (
      <button {...props} css={[roundLarge, disable, margins(props.margins)]}>
        {props.children}
      </button>
    );
  }
  return (
    <button {...props} css={[btn, roundLarge, margins(props.margins)]}>
      {props.children}
    </button>
  );
};

export const Button: FC<any> = (props: any) => {
  if (props.primary) {
    return (
      <>
        <button {...props} css={[btn, margins(props.margin)]}>
          {props.children}
        </button>
      </>
    );
  }
  if (props.secondary) {
    return (
      <>
        <button {...props} css={[btn, secondary, margins(props.margin)]}>
          {props.children}
        </button>
      </>
    );
  }
  if (props.small) {
    return (
      <>
        <button {...props} css={[btnSmall, margins(props.margin)]}>
          {props.children}
        </button>
      </>
    );
  }
  if (props.large && props.primary) {
    return (
      <>
        <button {...props} css={[btn, roundLarge, margins(props.margin)]}>
          {props.children}
        </button>
      </>
    );
  }
  return (
    <button {...props} css={[btn]}>
      {props.children}
    </button>
  );
};
