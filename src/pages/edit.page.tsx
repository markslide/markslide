import React from 'react'
import {RouteComponentProps} from 'react-router'
import styled from 'styled-components'
import {Editor} from '@/components/editor'
import {Previewer} from '@/components/previewer'
import {EditPageHeader} from '@/components/edit-page-header'
import {useStore, withProvider} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'

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
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  transition: width 0.4s ease-in-out;
  
  #editor-wrapper {
    .CodeMirror, 
    .editor-toolbar {
      transition: padding 0.4s ease-in-out;
    }
  }
  
  &.closed {
    width: 0 !important;
    
    #editor-wrapper {
      .CodeMirror, 
      .editor-toolbar {
        padding: 0 25% !important;
      }
      .editor-toolbar {
        padding-left: calc(25% + 46px) !important;
      }
    }
  }
`

export const EditPage = withProvider<RouteComponentProps>({
  of: EditPageStore
})(() => {
  const editPageStore = useStore(EditPageStore)
  return (
    <Container>
      <Header>
        <EditPageHeader/>
      </Header>
      <Main>
        <Box className={!editPageStore.showPreview && "closed"}>
          <Editor onUpload={() => {}} contentEmpty={false}/>
        </Box>
        <Box style={{width: '600px', flex: 'none'}} className={!editPageStore.showPreview && "closed"}>
          <Previewer/>
        </Box>
      </Main>
    </Container>
  )
})
