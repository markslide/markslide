import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {SlideStore} from "@/stores/slide.store";
import {SlidePreview} from '@/components/slide-preview'
import {EditPageStore} from '@/stores/edit-page.store'
import {Box} from '@/components/box'
import {customScrollbar} from '@/utils/custom-scrollbar'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PreviewList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  padding-right: 30px;
  ${customScrollbar};
  > * {
    flex: none;
  }
`

const PreviewSpace = styled.div`
  width: 30px;
  height: 10px;
`

export const Previewer: FC = () => {
  const {slideTexts} = useStore(SlideStore)
  const editorStore = useStore(EditPageStore)

  return (
    <Container>
      <Box role='row' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {slideTexts[editorStore.selectedPreview] && (
          <SlidePreview
            markdown={slideTexts[editorStore.selectedPreview]}
            scale={0.5}
          />
        )}
      </Box>
      <Box role='row' style={{height: '200px', flex: 'none'}}>
        <PreviewList>
          <PreviewSpace/>
          {slideTexts.map((text, index) => (
            <React.Fragment key={index}>
              <SlidePreview
                markdown={text}
                refIndex={index}
                scale={0.2}
                selected={editorStore.selectedPreview === index}
                onClick={() => {
                  editorStore.setSelectedPreview(index)
                }}
              />
              <PreviewSpace/>
            </React.Fragment>
          ))}
        </PreviewList>
      </Box>
    </Container>
  )
}
