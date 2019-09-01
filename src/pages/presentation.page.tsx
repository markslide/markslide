import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import * as React from 'react'
import styled, {css, keyframes} from 'styled-components'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import {markdownToHtml} from '@/utils/markdown-to-html'
import * as mousetrap from 'mousetrap'
import '@/themes/github.less'

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


const Container = styled.div`
  width:100vw;
  height: 100vh;
  animation: fade-in-delay 2s ease;
  animation-iteration-count: 1;
`

const PauseLayer = styled.div`
  position: fixed;
  z-index: 20;
  width:100vw;
  height:100vh;
  animation: fade-in 1s ease;
  animation-iteration-count: 1;
  background: #000000;
`

const Background = styled.div<{
  mouseMoving: boolean
}>`
  width:100vw;
  height: 100vh;
  cursor: ${props => props.mouseMoving ? 'default' : 'none'};
  user-select: none;
  background: #000000;
`

const Markdown = styled.div`
  width:80vw;
  height: 80vh;
  overflow-y: scroll;
  position: absolute;
  top:0;
  padding:10vh 10vw;
  user-select: none;
  background: #fff;
`

const previousMixin = css`
  animation: ${moveFromLeftKeyframes} .6s ease both;
  animation-delay: .2s;
`
const PreviousMarkdown = styled(Markdown)<{
  transitRight: boolean
}>`
  z-index: 6;
  left:-100vw;
  
  ${props => props.transitRight && previousMixin}
`

const currentLeftMixin = css`
  transform-origin: 0% 50%;
  animation: ${rotateLeftSideFirstKeyframes} .8s both ease-in;
`
const currentRightMixin = css`
  transform-origin: 0% 50%;
  animation: ${rotateRightSideFirstKeyframes} .8s both ease-in;
`
const CurrentMarkdown = styled(Markdown)<{
  transitRight: boolean
  transitLeft: boolean
}>`
  z-index: 5;
  left:0;
 
  ${props => props.transitRight && currentLeftMixin}
  ${props => props.transitLeft && currentRightMixin}
`

const nextMixin = css`
  animation: ${moveFromRightKeyframes} .6s ease both;
  animation-delay: .2s;
`
const NextMarkdown = styled(Markdown)<{
  transitLeft: boolean
}>`
  z-index: 7;
  left:100vw;
  
  ${props => props.transitLeft && nextMixin}
`

const Content = styled.div`
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
  
  & /deep/ table {
    width: 100%;
  }
`

export const PresentationPage: FC<RouteComponentProps> = (props) => {
  const {slideTexts} = useStore(PresentationStore)
  
  const [currentPage, setCurrentPage] = useState(0)
  
  const [pausing ,setPausing] = useState(false)
  
  const [mouseMoving, setMouseMoving] = useState(true)
  useEffect(() => {
    let count = 0
    let move = true
    document.onmousemove = () => {
      move = true
      if (count >= 10) {
        count = 0
        setMouseMoving(true)
      }
    }
    const interval = setInterval(() => {
      if (move) {
        move = false
        return
      }
      if (count >= 10) {
        if (mouseMoving) {
          setMouseMoving(false)
        }
      } else {
        count++
      }
    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  const [transit, setTransit] = useState<'previous'| 'next'>(null)
  
  const previousHtml = useMemo(() => markdownToHtml(slideTexts[currentPage - 1]), [currentPage])
  const currentHtml = useMemo(() => markdownToHtml(slideTexts[currentPage]), [currentPage])
  const nextHtml = useMemo(() => markdownToHtml(slideTexts[currentPage + 1]), [currentPage])
  
  const currentSlideRef = useRef<HTMLDivElement>()
  
  function nextPage() {
    if (transit) return
    if (currentPage >= slideTexts.length - 1) return
    setTransit('next')
    setTimeout(()=>{
      setCurrentPage(currentPage + 1)
      setTransit(null)
      currentSlideRef.current.scrollTop = 0
    },800 + 20)
  }
  
  function previousPage() {
    if (transit) return
    if (currentPage <= 0) return
    setTransit('previous')
    setTimeout(()=>{
      setCurrentPage(currentPage - 1)
      setTransit(null)
      currentSlideRef.current.scrollTop=0
    },800 + 20)
  }
  
  useEffect(() => {
    mousetrap.bind('space',()=>{
      nextPage()
      return false
    })
    mousetrap.bind('right',()=>{
      nextPage()
    })
    mousetrap.bind('left',()=>{
      previousPage()
    })
    mousetrap.bind('enter',()=>{
      nextPage()
    })
    mousetrap.bind('return',()=>{
      nextPage()
    })
    mousetrap.bind('esc',()=>{
      // toggleFullScreen()
    })
    mousetrap.bind('p',()=>{
      // togglePause()
    })
  })
  
  return (
    <Container>
      {pausing && (
        <PauseLayer/>
      )}
      
      <Background mouseMoving={mouseMoving}>
        {previousHtml && (
          <PreviousMarkdown transitRight={transit === 'previous'} className='markdown'>
            <Content dangerouslySetInnerHTML={{__html: previousHtml}} className='content'/>
          </PreviousMarkdown>
        )}
        {currentHtml && (
          <CurrentMarkdown transitRight={transit === 'previous'} transitLeft={transit === 'next'} className='markdown'>
            <Content dangerouslySetInnerHTML={{__html: currentHtml}} ref={currentSlideRef} className='content'/>
          </CurrentMarkdown>
        )}
        {nextHtml && (
          <NextMarkdown transitLeft={transit === 'next'} className='markdown'>
            <Content dangerouslySetInnerHTML={{__html: nextHtml}} className='content'/>
          </NextMarkdown>
        )}
      </Background>
    </Container>
  )
}
