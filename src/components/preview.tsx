import {FC} from 'react'
import * as React from 'react'
import styled from 'styled-components'
import {useStore} from "reto";
import {PresentationStore} from "@/stores/presentation.store";

const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  padding: 16px;
`

export const Preview: FC = () => {

  const {slideTexts} = useStore(PresentationStore)

  return (
    <Container>
      {slideTexts}
      1
    </Container>
  )
}
