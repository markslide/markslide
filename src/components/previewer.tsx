import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {SlideStore} from "@/stores/slide.store";
import {SlidePreview} from '@/components/slide-preview'
import {useWindowSize} from '@/utils/use-window-size'

const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
`

export const Previewer: FC = () => {
  const size = useWindowSize()
  const {slideTexts} = useStore(SlideStore)

  return (
    <Container>
      {slideTexts.map((text, index) => (
        <SlidePreview markdown={text} key={index} scale={0.2}/>
      ))}
    </Container>
  )
}
