import * as React from 'react'
import {FC, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import styled, {createGlobalStyle} from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import * as mousetrap from 'mousetrap'
import {Slide, SlideMode} from '@/components/slide'
import {PauseLayer} from '@/components/pause-layer'
import {ThemeStore} from '@/stores/theme.store'
import {SlideBackground} from '@/components/slide-background'

const Style = createGlobalStyle`
  body {
    background: #000000;
  }
`

const Container = styled.div<{
  mouseMoving: boolean
}>`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  cursor: ${props => props.mouseMoving ? 'default' : 'none'};
`

type Props = RouteComponentProps<{
  page: string
}>

export const PresentationPage: FC<Props> = (props) => {
  const {slideTexts} = useStore(SlideStore)
  const themeStore = useStore(ThemeStore)
  
  const page = parseInt(props.match.params.page)
  function changePage(val: number) {
    props.history.replace(`./${val}`)
  }
  
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
  
  function nextPage() {
    if (transit) return
    if (pausing) return
    if (page >= slideTexts.length - 1) return
    setTransit('next')
    setTimeout(()=>{
      changePage(page + 1)
      setTransit(null)
    },800 + 20)
  }
  
  function previousPage() {
    if (transit) return
    if (pausing) return
    if (page <= 0) return
    setTransit('previous')
    setTimeout(()=>{
      changePage(page - 1)
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
    <>
      <Style/>
      {pausing && (
        <PauseLayer/>
      )}
      <Container mouseMoving={mouseMoving} className={`theme-${themeStore.theme}`}>
        <SlideBackground>
          {Object.keys(SlideMode).map((mode, index) => {
            const pageIndex = page + index - 1
            const text = slideTexts[pageIndex]
            return text && (
              <Slide
                transit={transit}
                markdown={text}
                mode={mode as SlideMode}
                pageIndex={pageIndex}
                key={mode}
              />
            )
          })}
        </SlideBackground>
      </Container>
    </>
  )
}
