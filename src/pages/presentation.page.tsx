import {FC, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'

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
  const store = useStore(PresentationStore)
  
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
  
  return (
    <Container>
      {pausing && (
        <PauseLayer/>
      )}
      
      <Background mouseMoving={mouseMoving}>
      
      </Background>
      
    </Container>
  )
}
