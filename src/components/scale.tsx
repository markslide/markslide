import styled from 'styled-components'

export const Scale = styled.div<{
  scale: number
}>`
  transform-origin: left top;
  transform: scale(${props => props.scale});
  position: relative; //FIXME
`
