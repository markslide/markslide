import styled, {keyframes} from 'styled-components'

const fadeInKeyframes = keyframes`
  0% {opacity: 0;}
  100% {opacity:1;}
`

export const PauseLayer = styled.div`
  position: fixed;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  animation: ${fadeInKeyframes} 0.4s ease;
  animation-iteration-count: 1;
  background: #000000;
`
