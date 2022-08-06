import { createGlobalStyle, css } from 'styled-components'

export interface StudioPageGlobalStyleProps {
  bg?: string
  fixTailwindSvg?: boolean
}
export const StudioPageGlobalStyle = createGlobalStyle<StudioPageGlobalStyleProps>`
${({ bg }) =>
  bg
    ? css`
        html {
          background-color: ${bg};
        }
      `
    : ''}
html,
body,
#__next {
  height: 100%;
}
body {
  margin: 0;
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
}
${({ fixTailwindSvg = true }) =>
  fixTailwindSvg
    ? css`
        /* override tailwind reset */
        :root svg {
          display: inline;
        }
      `
    : ''}`
