import * as React from 'react'
import {FC, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import styled, {createGlobalStyle} from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import * as mousetrap from 'mousetrap'
import {Slide, SlideMode} from '@/components/slide/slide'
import {PauseLayer} from '@/components/pause-layer'
import {SlideBackground} from '@/components/slide/slide-background'
import {ThemeContainer} from '@/components/theme-container'
import {ControlPanel} from '@/components/control-panel'
import {exitFullscreen, toggleFullscreen} from '@/utils/fullscreen'

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
  
  return (
    <ThemeContainer>
      <Style/>
      {pausing && (
        <PauseLayer/>
      )}
      <Container mouseMoving={mouseMoving}>
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
      {mouseMoving && (
        <ControlPanel previousPage={previousPage} nextPage={nextPage} toggleFullscreen={toggleFullscreen}/>
      )}
    </ThemeContainer>
  )
}
