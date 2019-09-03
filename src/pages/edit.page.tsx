import React, {FC} from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import {Editor} from '@/components/editor'
import {Preview} from '@/components/preview'

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
  height: 100%;
  > * {
    border-right: ${layoutBorder};
    &:last-of-type {
      border-right: none;
    }
  }
`

const Box = styled.div`
  flex: auto;
  width: 50%;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
`

export const EditPage: FC<RouteComponentProps> = () => {
  return (
    <Container>
      <Header>
        This is header
      </Header>
      <Main>
        <Box>
          <Editor onUpload={() => {}} contentEmpty={false}/>
        </Box>
        <Box>
          <Preview/>
        </Box>
      </Main>
    </Container>
  )
}
