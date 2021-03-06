import React, {memo} from 'react'
import { RouteComponentProps, Route} from 'react-router'
import styled from 'styled-components'
import {Editor} from '@/components/editor'
import {Previewer} from '@/components/previewer'
import {EditPageHeader} from '@/components/edit-page-header'
import {useStore, withProvider} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'
import {ThemeModal} from '@/components/theme-modal'

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
`

export const EditPage = memo(withProvider<RouteComponentProps>({
  of: EditPageStore
})((props) => {
  const editPageStore = useStore(EditPageStore)
  return (
    <Container>
      <Header>
        <EditPageHeader/>
      </Header>
      <Main>
        <Box>
          <Editor/>
        </Box>
        {editPageStore.showPreview && (
          <Box style={{width: '600px', flex: 'none'}}>
            <Previewer/>
          </Box>
        )}
        <Route path={props.match.url + '/theme'} component={ThemeModal}/>
      </Main>
    </Container>
  )
}))
