import React from 'react'
import {RouteComponentProps} from 'react-router'
import styled, {css} from 'styled-components'
import {withProvider} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'
import {ThemeEditPageHeader} from "@/components/theme-select-page-header";
import {ColorScheme} from "@/components/color-scheme";
import {SlidesRatioPicker} from "@/components/slides-ratio-select";

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
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`

const Box = styled.div`
  flex: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  height: auto;
  
  ${props => (props.role == 'col' || !props.role) ? 
  css`
    + div {
    border-left: ${layoutBorder};
  `:
  css`
    + div {
    border-top: ${layoutBorder};
  `}
`

const PaddingBox = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 30px 10%;
`;


export const ThemeSelect = withProvider<RouteComponentProps>({
  of: EditPageStore
})(() => {
  return (
    <Container>
      <Header>
        <ThemeEditPageHeader/>
      </Header>
      <Main>
        <Box style={{width: '60%'}}>
          <Box role={'row'} style={{height: 350}}>

          </Box>
          <Box role={'row'}>

          </Box>
        </Box>
        <Box style={{width: '40%'}}>
          <Box role={'row'}>
            <PaddingBox>
              <Title>Color</Title>
              <ColorScheme/>
            </PaddingBox>
          </Box>
          <Box role={'row'}>
            <PaddingBox>
              <Title>Ratio</Title>
              <SlidesRatioPicker/>
            </PaddingBox>
          </Box>
          <Box role={'row'}>

          </Box>
        </Box>
      </Main>
    </Container>
  )
})
