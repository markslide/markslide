import * as React from 'react'
import {memo} from 'react'
import styled from 'styled-components'
import {useStore} from 'reto'
import {SlideStore} from "@/stores/slide.store";
import {MDEditor} from "@/components/md-editor";
import "easymde/dist/easymde.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import {editorStyle} from '@/utils/editor-style'
import "@/assets/css/github.min.css"
import "highlightjs/highlight.pack.min"


const Container = styled.div`
  height: 100%;
  ${editorStyle};
`

interface Props {
}

export const Editor = memo<Props>((props) => {
  const {text, setText} = useStore(SlideStore, store => [store.text])
  
  return (
    <Container>
      <MDEditor
        id='editor'
        value={text}
        onChange={setText}
      />
    </Container>
  )
})
