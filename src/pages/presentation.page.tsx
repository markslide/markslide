import {FC, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import * as mousetrap from 'mousetrap'
import '@/themes/github.less'
import {Slide, SlideMode} from '@/components/slide'


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

  const currentSlideRef = useRef<HTMLDivElement>()
  useLayoutEffect(() => {
    if (transit === null && currentSlideRef.current) {
      currentSlideRef.current.scrollTop = 0
    }
  }, [transit])

  function nextPage() {
    if (transit) return
    if (currentPage >= slideTexts.length - 1) return
    setTransit('next')
    setTimeout(()=>{
      setCurrentPage(currentPage + 1)
      setTransit(null)
    },800 + 20)
  }

  function previousPage() {
    if (transit) return
    if (currentPage <= 0) return
    setTransit('previous')
    setTimeout(()=>{
      setCurrentPage(currentPage - 1)
      setTransit(null)
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
      exitFullscreen()
    })
    mousetrap.bind('f',()=>{
      toggleFullscreen()
    })
    mousetrap.bind('p',()=>{
      // togglePause()
    })
    return () => {
      Mousetrap.reset()
    }
  })

  function enterFullscreen() {
    document.body.requestFullscreen()
  }
  function exitFullscreen() {
    document.exitFullscreen()
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  return (
    <Container>
      {pausing && (
        <PauseLayer/>
      )}

      <Background mouseMoving={mouseMoving}>
        {Object.keys(SlideMode).map((mode, index) => {
          const text = slideTexts[currentPage + index - 1]
          return text && (
            <Slide transit={transit} markdown={text} mode={mode as SlideMode} key={mode}/>
          )
        })}
      </Background>
    </Container>
  )
}
