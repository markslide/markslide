import React, {FC} from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import {Editor} from '@/components/editor'

const layoutBorder = `solid 1px #F3F3F3`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  flex: none;
  border-bottom: ${layoutBorder};
  padding: 24px 0;
`

const Main = styled.div`
  flex: auto;
  display: flex;
  > * {
    border-right: ${layoutBorder};
    &:last-of-type {
      border-right: none;
    }
  }
`

const EditorBox = styled.div`
  flex: auto;
`

const PreviewBox = styled.div`
  flex: auto;
`

export const EditPage: FC<RouteComponentProps> = () => {
  return (
    <Container>
      <Header>
        This is header
      </Header>
      <Main>
        <EditorBox>
          This is editor
        </EditorBox>
        <PreviewBox>
          This is preview
        </PreviewBox>
      </Main>
    </Container>
  )
}
