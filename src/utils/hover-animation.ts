import {css} from 'styled-components'

export const hoverShrink = css`
  transition: transform 0.15s ease-in-out;
  :hover {
    transform: scale(0.95);
  }
`
