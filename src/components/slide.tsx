import styled, {keyframes} from 'styled-components'
import React, {memo, useMemo} from 'react'
import {markdownToHtml} from '@/utils/markdown-to-html'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'

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

const Markdown = styled.div.attrs((props) => ({
  className: `markdown ${props.className}`,
}))<{
  preview: boolean
}>`
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10vh 10vw;
  box-sizing: border-box;
  user-select: none;
  background: #fff;
  &.previous {
    z-index: 6;
    left:-100vw;
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

const Content = styled.div.attrs(() => ({
  className: 'content'
}))`
  @media all{
    font-size: 12px;
  }
  @media all and (min-width: 200px) {
    font-size: 16px;
  }
  @media all and (min-width: 400px) {
    font-size: 20px;
  }
  @media all and (min-width: 600px) {
    font-size: 24px;
  }
  @media all and (min-width: 800px) {
    font-size: 28px;
  }
  @media all and (min-width: 1000px) {
    font-size: 32px;
  }
  @media all and (min-width: 1200px){
    font-size: 36px;
  }
  
  table {
    width: 100%;
  }
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
}

export const Slide = memo<Props>((props) => {
  const html = useMemo(() => markdownToHtml(props.markdown), [props.markdown])
  const slideStore = useStore(SlideStore)
  return (
    <Markdown
      className={(props.mode || '') + ' ' + `transit-${props.transit}`}
      preview={props.preview}
      style={{...slideStore.filmSize}}
    >
      <Content dangerouslySetInnerHTML={{__html: html}}/>
    </Markdown>
  )
})
