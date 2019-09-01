import {FC, useEffect, useMemo, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import * as React from 'react'
import styled, {keyframes} from 'styled-components'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import {markdownToHtml} from '@/utils/markdown-to-html'


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
`

const PreviousMarkdown = styled(Markdown)<{
  transitRight: boolean
}>`
  z-index: 6;
  left:-100vw;
  
  ${props => props.transitRight && `animation: ${moveFromLeftKeyframes} .6s ease both; animation-delay: .2s;`}
`

const CurrentMarkdown = styled(Markdown)<{
  transitRight: boolean
  transitLeft: boolean
}>`
  z-index: 5;
  left:0;
 
  ${props => props.transitRight && `transform-origin: 0% 50%; animation: ${rotateLeftSideFirstKeyframes} .8s both ease-in;`}
  ${props => props.transitLeft && `transform-origin: 0% 50%; animation: ${rotateRightSideFirstKeyframes} .8s both ease-in;`}
`

const NextMarkdown = styled(Markdown)<{
  transitLeft: boolean
}>`
  z-index: 7;
  left:100vw;
  
  ${props => props.transitLeft && `animation: ${moveFromRightKeyframes} .6s ease both; animation-delay: .2s;`}
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
  
  const [currentPage, setCurrentPage] = useState(-1)
  
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
  const nextHtml = useMemo(() => markdownToHtml(slideTexts[slideTexts.length - 1]), [currentPage])
  
  return (
    <Container>
      {pausing && (
        <PauseLayer/>
      )}
      
      <Background mouseMoving={mouseMoving}>
        {previousHtml && (
          <PreviousMarkdown transitRight={transit === 'previous'}>
            <Content dangerouslySetInnerHTML={{__html: previousHtml}}/>
          </PreviousMarkdown>
        )}
        {currentHtml && (
          <CurrentMarkdown transitRight={transit === 'previous'} transitLeft={transit === 'next'}>
            <Content dangerouslySetInnerHTML={{__html: currentHtml}}/>
          </CurrentMarkdown>
        )}
        {nextHtml && (
          <NextMarkdown transitLeft={transit === 'next'}>
            <Content dangerouslySetInnerHTML={{__html: nextHtml}}/>
          </NextMarkdown>
        )}
      </Background>
    </Container>
  )
}
