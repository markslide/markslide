import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {PresentationStore} from "@/stores/presentation.store";
import {SlidePreview} from '@/components/slide-preview'

const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
`

export const Previewer: FC = () => {

  const {slideTexts} = useStore(PresentationStore)

  return (
    <Container>
      {slideTexts.map((text, index) => (
        <SlidePreview markdown={text} key={index}/>
      ))}
    </Container>
  )
}
