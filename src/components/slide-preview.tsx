import {Slide} from '@/components/slide'
import React, {FC} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  height: 19vw;
  width: 34vw;
  margin: 18px auto;
  transition: all 0.2s ease;
  border: 2px solid rgba(0,0,0, 0);
  box-sizing: border-box;
  
  :hover {
    border: 2px solid rgba(0,0,0, 0.2);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  }
`

const Scale = styled.div`
  transform-origin: left top;
  transform: scale(0.4);
  position: relative;
`

interface Props {
  markdown: string
}

export const SlidePreview: FC<Props> = (props) => {
  return (
    <Container>
      <Scale>
        <Slide markdown={props.markdown} preview={true}/>
      </Scale>
    </Container>
  )
}
