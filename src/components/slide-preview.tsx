import {Slide} from '@/components/slide'
import React, {FC} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  height: 30vw;
  width: 40vw;
  margin: 24px auto;
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
