import styled, {keyframes} from 'styled-components'
import React, {memo} from 'react'
import '@/themes/citrine/_schemes/color-1.dark.less'
import {SlideContent} from '@/components/slide-content'


const moveFromRightKeyframes = keyframes`
  to { transform: translateX(-100%); }
`

const moveFromLeftKeyframes = keyframes`
  to { transform: translateX(100%); }
`

const rotateRightSideFirstKeyframes = keyframes`
  0% { }
  40% { transform: rotateY(15deg); opacity: .8; animation-timing-function: ease-out; }
  100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
`

const rotateLeftSideFirstKeyframes = keyframes`
  0% { }
  40% { transform: rotateY(-15deg); opacity: .8; animation-timing-function: ease-out; }
  100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
`

const Container = styled.div<{
  preview: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  
  &.previous {
    z-index: 6;
    left: -100vw;
    &.transit-previous {
      animation: ${moveFromLeftKeyframes} .6s ease both;
      animation-delay: .2s;
    }
  }
  &.current {
    z-index: 5;
    left:0;
    &.transit-previous {
      transform-origin: 0 50%;
      animation: ${rotateLeftSideFirstKeyframes} .8s both ease-in;
    }
    &.transit-next {
      transform-origin: 0 50%;
      animation: ${rotateRightSideFirstKeyframes} .8s both ease-in;
    }
  }
  &.next {
    z-index: 7;
    left: 100vw;
    &.transit-next {
      animation: ${moveFromRightKeyframes} .6s ease both;
      animation-delay: .2s;
    }
  }
`

const Wrapper = styled.div<{
  scale: number
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(${props => props.scale});
`

export enum SlideMode {
  previous = 'previous',
  current = 'current',
  next = 'next',
}

interface Props {
  transit?: 'previous' | 'next'
  mode?: SlideMode
  markdown: string
  preview?: boolean
  pageIndex: number
}

export const Slide = memo<Props>((props) => {
  return (
    <Container
      className={(props.mode || '') + ' ' + `transit-${props.transit}` + ' '}
      preview={props.preview}
    >
      <Wrapper scale={window.innerWidth / 800}>
        <SlideContent markdown={props.markdown} pageIndex={props.pageIndex}/>
      </Wrapper>
    </Container>
  )
})
