import {FC, useMemo} from 'react'
import * as React from 'react'
import {Editor} from '@/components/editor'
import {RouteComponentProps} from 'react-router'
import {useStore} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import styled, {createGlobalStyle} from "styled-components";
import {Preview} from "@/components/preview";


const HrStyle = createGlobalStyle`
  hr {
    border: 0.5px dashed #bbb;
    margin-block-start: 2em;
    margin-block-end: 2em;
  }
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  > * {
    flex: auto;
  }
`

export const UploadPage: FC<RouteComponentProps> = (props) => {
  const store = useStore(PresentationStore)
const contentEmpty = useMemo(()=>{
    return !store.slideTexts || store.slideTexts.length === 0
  }, [store.slideTexts])
  return (
    <Container>
      <Editor
        onUpload={text => store.updateText(text)}
        contentEmpty={contentEmpty}
      />
      <HrStyle/>
      <hr/>
      <Preview/>
      <button onClick={()=>props.history.push('/presentation')}>Show</button>
    </Container>
  )
}
