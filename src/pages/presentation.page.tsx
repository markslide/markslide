import * as React from 'react'
import {FC, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import styled from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import * as mousetrap from 'mousetrap'
import '@/themes/github.less'
import {Slide, SlideMode} from '@/components/slide'
import {PauseLayer} from '@/components/pause-layer'
import {Proportion} from '@/classes/proportion'


const Container = styled.div`
  width:100vw;
  height: 100vh;
`

const Background = styled.div<{
  mouseMoving: boolean
}>`
  width: 100vw;
  height: 100vh;
  cursor: ${props => props.mouseMoving ? 'default' : 'none'};
  user-select: none;
  background: #000000;
`


export const PresentationPage: FC<RouteComponentProps> = (props) => {
  const {slideTexts} = useStore(SlideStore)

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
    if (pausing) return
    if (currentPage >= slideTexts.length - 1) return
    setTransit('next')
    setTimeout(()=>{
      setCurrentPage(currentPage + 1)
      setTransit(null)
    },800 + 20)
  }

  function previousPage() {
    if (transit) return
    if (pausing) return
    if (currentPage <= 0) return
    setTransit('previous')
    setTimeout(()=>{
      setCurrentPage(currentPage - 1)
      setTransit(null)
    },800 + 20)
  }

  function togglePausing() {
    setPausing(!pausing)
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
      togglePausing()
    })
    return () => {
      Mousetrap.reset()
    }
  })

  function enterFullscreen() {
    const body = document.body as any
    if (body.requestFullscreen) {
      body.requestFullscreen()
    } else if (body.webkitRequestFullscreen) {
      body.webkitRequestFullscreen()
    } else if (body.webkitRequestFullScreen) {
      body.webkitRequestFullScreen()
    }
  }
  function exitFullscreen() {
    const d = document as any
    if (d.exitFullscreen) {
      d.exitFullscreen()
    } else if (d.webkitExitFullscreen) {
      d.webkitExitFullscreen()
    }
  }
  function toggleFullscreen() {
    const d = document as any
    if (d.fullscreenElement || d.webkitFullscreenElement) {
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
