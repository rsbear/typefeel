import { jsx, css } from '@emotion/core'

export const colors = {
  black90: 'rgba(0,0,0,.9)',
  black80: 'rgba(0,0,0,.8)',
  black70: 'rgba(0,0,0,.7)',
  black60: 'rgba(0,0,0,.6)',
  black50: 'rgba(0,0,0,.5)',
  black40: 'rgba(0,0,0,.4)',
  black30: 'rgba(0,0,0,.3)',
  black20: 'rgba(0,0,0,.2)',
  black10: 'rgba(0,0,0,.1)',
  black05: 'rgba(0,0,0,.05)',
  white: 'rgba(255,255,255,1)',
  lightgray: '#f5f5f5'
};

const row = css`
  display: flex;
`;
const rowwrap = css`
  display: flex; flex-flow: row wrap;
`;
const column = css`
  display: flex; flex-flow: column;
`;
const justifycenter = css`
  justify-content: center;
`
const space = css`
  justify-content: space-between;
`
const itemscenter = css`
  align-items: center;
`
export const borderBox = css`
  padding: 20px;
  border-radius: 4px;
  border: solid 1px ${colors.black05};

  h5 {
    margin-bottom: 10px;
  }
`;

export const grid50 = css`
  display: grid;
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  grid-column-gap: 10px;
  grid-row-gap: 8px;
`
export const grid33 = css`
  display: grid;
  grid-template-columns: calc(33% - 6px) calc(33% - 6px) calc(33% - 6px);
  grid-column-gap: 12px;
`
export const grid25 = css`
  display: grid;
  grid-template-columns: calc(25% - 4px) calc(25% - 4px) calc(25% - 4px) calc(25% - 4px) calc(25% - 4px);
  grid-column-gap: 8px;
`

export const flex = {
  row,
  rowwrap,
  column,
  justifycenter,
  space,
  itemscenter,
}

export const margins = (margins: string) => css`
  margin: ${margins};
`
export const paddings = (paddings: string) => css`
  padding: ${paddings};
`

export const hundo = css`
  width: 100%;
`

export const globalStyle = css`
  html {
    overflow-y: scroll;
  } 
  *, &::before, &::after {
    box-sizing: border-box;
  }
  body, ul, li, a, p, span, h1, h2, h3, h4, h5, h6, nav, header, footer {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${colors.black70};
    text-decoration: none;
  }
  body {
    display: flex;
    justify-content: center;
    background: ${colors.white};
  }
  button {
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  p {
    color: ${colors.black60};
  }
`;