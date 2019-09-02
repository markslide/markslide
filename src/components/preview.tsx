import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {PresentationStore} from "@/stores/presentation.store";

const Container = styled.div`
  height: 100%;
  white-space: pre-wrap;
  overflow-y: scroll;
  word-break: break-all;
`

export const Preview: FC = () => {

  const {slideTexts} = useStore(PresentationStore)

  return (
    <Container id='preview'>
      {slideTexts}
    </Container>
  )
}
