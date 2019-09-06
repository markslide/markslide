import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {SlideStore} from "@/stores/slide.store";
import {SlidePreview} from '@/components/slide-preview'
import {EditPageStore} from '@/stores/edit-page.store'

const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
`

export const Previewer: FC = () => {
  const {slideTexts} = useStore(SlideStore)
  const editorStore = useStore(EditPageStore)

  return (
    <Container>
      {slideTexts.map((text, index) => (
        <SlidePreview
          markdown={text}
          key={index}
          scale={0.2}
          selected={editorStore.selectedPreview === index}
          onClick={() => {
            editorStore.setSelectedPreview(index)
          }}
        />
      ))}
    </Container>
  )
}
