import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {SlideStore} from "@/stores/slide.store";
import {SlidePreview} from '@/components/slide-preview'
import {EditPageStore} from '@/stores/edit-page.store'
import {Box} from '@/components/box'

const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PreviewList = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  > * {
    flex: none;
    margin-right:30px;
    :first-of-type {
      margin-left: 30px;
    }
  }
`

export const Previewer: FC = () => {
  const {slideTexts} = useStore(SlideStore)
  const editorStore = useStore(EditPageStore)

  return (
    <Container>
      <Box role='row' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <SlidePreview
          markdown={slideTexts[editorStore.selectedPreview]}
          scale={0.5}
        />
      </Box>
      <Box role='row' style={{height: '200px', flex: 'none'}}>
        <PreviewList>
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
        </PreviewList>
      </Box>
    </Container>
  )
}
