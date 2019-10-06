import React, {memo} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'

const Box = styled.div`
  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 20px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  border-radius: 6px;
`

const Button = styled.span`
  ${clickable};
  user-select: none;
  display: inline-block;
`

interface Props {
  nextPage: () => void
  previousPage: () => void
  toggleFullscreen: () => void
}

export const ControlLayer = memo<Props>((props) => {
  return (
    <Box>
      {/*TODO button icon*/}
      <Button onClick={props.previousPage}>◀️</Button>
      <Button onClick={props.nextPage}>▶️</Button>
      <Button onClick={props.toggleFullscreen}>↕️</Button>
    </Box>
  )
})
