import {FC, DragEvent, useRef} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {PresentationStore} from "@/stores/presentation.store";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  div{
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
  }
`

const TextArea = styled.textarea`
  border: none;
  resize: none;
  display: block;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 24px 3.5vw 24px 90px;
  word-break: break-all;
  font-size: 14px;
  font-family: inherit;
  color: inherit;
  
  :focus {
    outline: none;
  }
`

interface Props {
  onUpload: (text: string) => void
  contentEmpty: boolean
}

export const Editor: FC<Props> = (props) => {

  const editorRef = useRef()
  const {text, updateText} = useStore(PresentationStore)

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
          if (editorRef && editorRef.current) {
            // @ts-ignore
            editorRef.current.focus()
            // @ts-ignore
            editorRef.current.setSelectionRange(0, 0)
          }
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
      <div style={{display: props.contentEmpty?'initial':'none'}}>
        {/*<i class="fa fa-file-text"></i>*/}
        <p>Drag your file here</p>
      </div>
      <TextArea
        ref={editorRef}
        value={text}
        autoFocus={true}
        onChange={e=>updateText(e.target.value)}
        style={{display: !props.contentEmpty?'initial':'none'}}
      />
    </Container>
  )
}

function doNothing(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  return false
}
