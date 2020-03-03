import { jsx, css } from '@emotion/core'
import { colors } from './main'

export const fontSize = {
  huge: '6rem',
  big: '3rem',
  large: "1.55rem",
  medium: "1rem",
  small: '.875rem',
  tiny: '.75rem',
  10: '0.625rem',
  11: '0.6875rem',
  12: '0.75rem',
  13: '0.8125rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  28: '1.75rem',
  32: '2rem',
  36: '2.25rem',
  46: '2.875rem',
  56: '3.5rem',
  60: '3.75rem'
}


const line = css`
  font-size: .875rem;
  line-height: 24px;
  color: ${colors.black60};
`

export const f1 = css`
  font-size: 3rem;
  color: ${colors.black70};
`

export const textSize = css`
  font-size: {}
`

export const text = {
  line: line,
  heading: f1,
}