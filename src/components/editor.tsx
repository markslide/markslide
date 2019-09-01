import {FC, DragEvent, useRef} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {PresentationStore} from "@/stores/presentation.store";

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  
  div{
    position: absolute;
    width:100%;
    top:50%;
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
  width: calc(100% - 80px);
  height: calc(99% - 80px);
  text-align: left;
  padding: 40px;
  // position: relative;
  border: none;
  resize: none;
  
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
  const {text, setText} = useStore(PresentationStore)

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
      reader.onerror = (event) => {
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
        onChange={e=>setText(e.target.value)}
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
