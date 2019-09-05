import * as React from 'react'
import {DragEvent, FC} from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {SlideStore} from "@/stores/slide.store";
import SimpleMDE from "@/components/md-editor";
import "easymde/dist/easymde.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import {EditorStyle} from './editor-style'

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`

const UploadPlaceHolder = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  left:0;
  i{
      color: #FFFFFF;
      font-size: 60px;
  }
  p{
      font-size: 16px;
      color: #7b7b7b;
  }
`

interface Props {
  onUpload: (text: string) => void
  contentEmpty: boolean
}

export const Editor: FC<Props> = (props) => {

  const {text, updateText} = useStore(SlideStore)

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    const {files} = e.dataTransfer
    if (files.length > 0) {
      const reader = new FileReader()
      reader.readAsText(files[0])
      reader.onload = (event) => {
        console.log(event.target.result)
        const {result} = event.target
        if (typeof result === 'string') {
          props.onUpload(result)
        }
      }
      reader.onerror = () => {
        console.warn('failed to read')
      }
    }
    return false
  }

  return (
    <Container
      onDragOver={doNothing}
      onDragEnter={doNothing}
      onDragLeave={doNothing}
      onDragEnd={doNothing}
      onDrop={handleDrop}
      onDropCapture={handleDrop}
    >
      <UploadPlaceHolder style={{display: props.contentEmpty ? 'initial' : 'none'}}>
        {/*<i class="fa fa-file-text"></i>*/}
        <p>Drag your file here</p>
      </UploadPlaceHolder>

      <EditorStyle/>
      <SimpleMDE
        id='editor'
        // label="Markdown Editor"
        options={{
          autofocus: true,
          spellChecker: false,
          autoDownloadFontAwesome: false,
          hideIcons: ["guide", "preview", "heading", "fullscreen", "side-by-side"],
          showIcons: ["heading-1", "heading-2", "heading-3", "horizontal-rule", "code"],
          status: ["lines", "words"]
        }}
        value={text}
        onChange={updateText}
      />
      {/*  style={{display: !props.contentEmpty?'initial':'none'}}*/}
    </Container>
  )
}

function doNothing(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  return false
}
