import React from "react";
import { Global, css } from "@emotion/core";
import { useTheme } from "emotion-theming";

const sansFallback =
  "'Helvetica Neue',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

// export interface GlobalStylesProps {
//   theme?: Object;
// }

// export const GlobalStyles = createGlobalStyle`
export const globalStyles = (theme) => css`
  *:focus {
    outline: none;
  }
  html {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-box-sizing: inherit;
  }
  html,
  body,
  #root {
    height: 100%;
    -webkit-tap-highlight-color: transparent;
  }
  body {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    font-family: "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  /* Default links */
  a {
    cursor: pointer;
    color: inherit;
    transition: color 0.25s;
    text-decoration: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-style: inherit;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    margin: 0;
  }
`;

export const GlobalStyles: React.FC = () => {
  const theme = useTheme();
  return <Global styles={() => globalStyles(theme)} />;
};
