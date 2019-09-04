import {Slide} from '@/components/slide'
import React, {FC, memo} from 'react'
import styled from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from '@/stores/slide.store'

const Container = styled.div`
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  margin: 24px auto;
  transition: all 0.2s ease;
  border: 2px solid rgba(0,0,0, 0);
  box-sizing: content-box;
  
  :hover {
    border: 2px solid rgba(0,0,0, 0.2);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  }
`

const Scale = styled.div<{
  scale: number
}>`
  transform-origin: left top;
  transform: scale(${props => props.scale});
  position: relative;
`

interface Props {
  markdown: string
  scale: number
}

export const SlidePreview = memo<Props>((props) => {
  const {filmSize} = useStore(SlideStore)
  return (
    <Container
      style={{
        height: filmSize.height * props.scale,
        width: filmSize.width * props.scale,
      }}
    >
      <Scale scale={0.1875}>
        <Slide markdown={props.markdown} preview={true}/>
      </Scale>
    </Container>
  )
})
