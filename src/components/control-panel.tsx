import React, {memo} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'
import arrowLeftIcon from '@/assets/icon/arrow-left.svg'
import arrowRightIcon from '@/assets/icon/arrow-right.svg'
import fullScreenEnterIcon from '@/assets/icon/fullscreen-enter.svg'
import fullScreenExitIcon from '@/assets/icon/fullscreen-exit.svg'
import cancelIcon from '@/assets/icon/cancel.svg'

const Box = styled.div`
  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 20px;
  padding: 10px 6px;
  background: rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  align-items: center;
  > * {
    flex: none;
    margin: 0 6px;
  }
`

const Button = styled.img`
  ${clickable};
  user-select: none;
  height: 27px;
`

interface Props {
  nextPage: () => void
  previousPage: () => void
  toggleFullscreen: () => void
  exitPresentation: () => void
}

export const ControlPanel = memo<Props>((props) => {
  return (
    <Box>
      <Button src={arrowLeftIcon} onClick={props.previousPage}/>
      <Button src={arrowRightIcon} onClick={props.nextPage}/>
      <Button src={fullScreenEnterIcon} onClick={props.toggleFullscreen}/>
      <Button src={cancelIcon} onClick={props.exitPresentation}/>
    </Box>
  )
})
