import React from "react";
import { jsx, css } from "@emotion/core";

const LoadingSpinner: React.FC<any> = () => {
  return (
    <>
      <div className="col-sm-2" css={test}>
        <div className="sp sp-3balls"></div>
      </div>
    </>
  );
};

export default LoadingSpinner;

const buttonColor = (theme: any) => css`
  background: ${theme.colors.secondarydark};
  border-color: ${theme.colors.secondarydark};
`;

const test = css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  .sp-3balls,
  .sp-3balls:before,
  .sp-3balls:after {
    border-radius: 50%;
    background-color: #000;
    width: 10px;
    height: 10px;
    transform-origin: center center;
    display: inline-block;
  }
  .sp-3balls {
    position: relative;
    background-color: black;
    opacity: 1;
    -webkit-animation: spScaleAlpha 1s infinite linear;
    animation: spScaleAlpha 1s infinite linear;
  }
  .sp-3balls:before,
  .sp-3balls:after {
    content: "";
    position: relative;
    opacity: 0.25;
  }
  .sp-3balls:before {
    left: 20px;
    top: -5px;
    -webkit-animation: spScaleAlphaBefore 1s infinite linear;
    animation: spScaleAlphaBefore 1s infinite linear;
  }
  .sp-3balls:after {
    left: -20px;
    top: -23px;
    -webkit-animation: spScaleAlphaAfter 1s infinite linear;
    animation: spScaleAlphaAfter 1s infinite linear;
  }
  @-webkit-keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes spScaleAlpha {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaBefore {
    0% {
      opacity: 0.25;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0.25;
    }
  }
  @-webkit-keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
  @keyframes spScaleAlphaAfter {
    33% {
      opacity: 0.25;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0.25;
    }
  }
`;
