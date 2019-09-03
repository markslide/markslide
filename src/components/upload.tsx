import {FC, DragEvent} from 'react'
import * as React from 'react'
import styled from 'styled-components'

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

const Editor = styled.textarea`
  width: 100%;
  height: 99%;
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
}

export const Upload: FC<Props> = (props) => {
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
      <div>
        {/*<i class="fa fa-file-text"></i>*/}
        <p>Drag your file here</p>
      </div>
    </Container>
  )
}

function doNothing(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  return false
}
