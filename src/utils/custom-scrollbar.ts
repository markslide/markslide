import {css} from 'styled-components'

export const customScrollbar = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    cursor: pointer;
  }
`
