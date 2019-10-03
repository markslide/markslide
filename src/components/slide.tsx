import styled, {keyframes} from 'styled-components'
import React, {memo, useLayoutEffect, useMemo, useRef} from 'react'
import {markdownToHtml} from '@/utils/markdown-to-html'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import {Size} from '@/classes/size'
import {getMarkdownClassNames} from '@/utils/get-markdown-class-names'
import {ThemeStore} from '@/stores/theme.store'
import '@/themes/citrine/_schemes/color-1.dark.less'


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

const Markdown = styled.div<{
  preview: boolean
  filmSize: Size
}>`
  overflow-x: hidden;
  overflow-y: ${props => props.preview ? 'hidden' : 'scroll'};
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.filmSize.width}px;
  height: ${props => props.filmSize.height}px;
  padding: 60px 80px;
  box-sizing: border-box;
  user-select: none;
  background: #fff;
  white-space: pre-wrap;
  word-break: break-all;
  &.previous {
    z-index: 6;
    left: -${props => props.filmSize.width}px;
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
    left: ${props => props.filmSize.width}px;
    &.transit-next {
      animation: ${moveFromRightKeyframes} .6s ease both;
      animation-delay: .2s;
    }
  }
`

const Content = styled.div.attrs(() => ({
  className: 'content'
}))`
  //@media all{
  //  font-size: 12px;
  //}
  //@media all and (min-width: 200px) {
  //  font-size: 16px;
  //}
  //@media all and (min-width: 400px) {
  //  font-size: 20px;
  //}
  //@media all and (min-width: 600px) {
  //  font-size: 24px;
  //}
  //@media all and (min-width: 800px) {
  //  font-size: 28px;
  //}
  //@media all and (min-width: 1000px) {
  //  font-size: 32px;
  //}
  //@media all and (min-width: 1200px){
  //  font-size: 36px;
  //}
  
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
  const classNames = useMemo(() => getMarkdownClassNames(props.markdown), [props.markdown])
  const {filmSize} = useStore(SlideStore)
  const themeStore = useStore(ThemeStore)
  
  const scrollBoxRef = useRef<HTMLDivElement>()
  
  useLayoutEffect(() => {
    if (props.transit === null && scrollBoxRef.current && props.mode === SlideMode.current) {
      scrollBoxRef.current.scrollTop = 0
    }
  }, [props.transit])
  
  return (
    <Markdown
      className={'markdown' + ' ' + `theme-${themeStore.theme}` + ' ' + (props.mode || '') + ' ' + `transit-${props.transit}` + ' ' + classNames.join(' ')}
      preview={props.preview}
      filmSize={filmSize}
      ref={scrollBoxRef}
    >
      <Content dangerouslySetInnerHTML={{__html: html}}/>
    </Markdown>
  )
})
