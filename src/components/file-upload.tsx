import {FC, memo, default as React, DragEvent} from 'react'
import styled from 'styled-components'

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
}

export const FileUpload: FC<Props> = (props) => {
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
    <div
      onDragOver={doNothing}
      onDragEnter={doNothing}
      onDragLeave={doNothing}
      onDragEnd={doNothing}
      onDrop={handleDrop}
      onDropCapture={handleDrop}
    >
      <UploadPlaceHolder>
        {/*<i class="fa fa-file-text"></i>*/}
        <p>Drag your file here</p>
      </UploadPlaceHolder>
    </div>
  )
}

function doNothing(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  return false
}
