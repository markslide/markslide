import {FC} from 'react'
import * as React from 'react'
import {Upload} from '@/components/upload'
import {RouteComponentProps} from 'react-router'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import {createGlobalStyle} from "styled-components";
import {Preview} from "@/components/preview";


const HrStyle = createGlobalStyle`
  hr {
    border: 0.5px dashed #bbb;
    margin-block-start: 2em;
    margin-block-end: 2em;
  }
`

export const UploadPage: FC<RouteComponentProps> = (props) => {
  const store = useStore(PresentationStore)
  
  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'row'}}>
      <Upload onUpload={(text) => {
        store.setText(text)
      }}/>
      <HrStyle/>
      <hr/>
      <Preview/>
      <button onClick={()=>props.history.push('/presentation')}>Show</button>
    </div>
  )
}
