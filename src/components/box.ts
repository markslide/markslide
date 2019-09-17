import styled, {css} from 'styled-components'
import {layoutBorder} from '@/utils/style-consts'

const boxRoleCss = {
  row: css`
    border-top: ${layoutBorder};
    :first-child {
      border-top: none;
    }
  `,
  col: css`
    border-left: ${layoutBorder};
    :first-child {
      border-left: none;
    }
  `,
}

export const Box = styled.div<{
  role?: 'row' | 'col'
}>`
  flex: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  
  ${props => boxRoleCss[props.role]};
`

Box.defaultProps = {
  role: 'col'
}
