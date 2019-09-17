import styled, {css} from 'styled-components'
import {layoutBorder} from '@/utils/style-consts'

export const Box = styled.div`
  flex: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  height: auto;
  
  ${props => (props.role == 'col' || !props.role) ?
  css`
    + div {
    border-left: ${layoutBorder};
  `:
  css`
    + div {
    border-top: ${layoutBorder};
  `}
`
