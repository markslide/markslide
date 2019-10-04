import styled from 'styled-components'
import React, {FC} from 'react'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`

const Content = styled.div`
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  background: #FFFFFF;
  padding: 16px;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

interface Props {
  onClose: () => void
}

export const Modal: FC<Props> = (props) => {
  return (
    <Container onClick={props.onClose}>
      <Content onClick={(e) => {e.stopPropagation()}}>
        {props.children}
      </Content>
    </Container>
  )
}
