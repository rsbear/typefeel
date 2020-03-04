import React, { FC } from "react";
import { css } from "@emotion/core";

interface Props {
  isLoading?: boolean;
  big?: boolean;
}

export const LoadingBar: FC<Props> = ({ isLoading, big }) => (
  <div css={[wrapperLoader, big ? sizeBig : null]}>
    <div className="gg-loadbar-alt"></div>
  </div>
);

export const wrapperLoader = css`
  @keyframes loadbaralt {
    0%,
    to {
      left: 0;
      right: 80%;
    }
    25%,
    75% {
      left: 0;
      right: 0;
    }
    50% {
      left: 80%;
      right: 0;
    }
  }
  .gg-loadbar-alt,
  .gg-loadbar-alt::before,
  .gg-loadbar-alt::after {
    display: block;
    box-sizing: border-box;
    height: 4px;
    border-radius: 4px;
  }
  .gg-loadbar-alt {
    position: relative;
    transform: scale(var(--ggs, 1));
    width: 24px;
    margin: 0 auto;
  }
  .gg-loadbar-alt::after,
  .gg-loadbar-alt::before {
    background: currentColor;
    content: "";
    position: absolute;
  }
  .gg-loadbar-alt::before {
    animation: loadbaralt 2s cubic-bezier(0, 0, 0.58, 1) infinite;
  }
  .gg-loadbar-alt::after {
    width: 24px;
    opacity: 0.3;
  }
`;

const sizeBig = css`
  .gg-loadbar-alt,
  .gg-loadbar-alt::before,
  .gg-loadbar-alt::after {
    height: 10px;
    border-radius: 10px;
  }
  .gg-loadbar-alt {
    width: 48px;
  }
  .gg-loadbar-alt::after {
    width: 48px;
    opacity: 0.3;
  }
`;
