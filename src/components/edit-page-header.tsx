import React, {memo} from 'react'
import styled from 'styled-components'
import playIcon from '@/assets/icon/play.svg'
import searchIcon from '@/assets/icon/search.svg'
import exportIcon from '@/assets/icon/export.svg'
import previewIcon from '@/assets/icon/preview.svg'
import shareIcon from '@/assets/icon/share.svg'
import themeIcon from '@/assets/icon/theme.svg'
import {RouteComponentProps, withRouter} from 'react-router'
import {FixedSpace, FlexSpace, IconButton, PageHeader} from '@/components/page-header'
import {useStore} from 'reto'
import {EditPageStore} from '@/stores/edit-page.store'


const SearchInput = styled.input`
  font-size: 15px;
  border: none;
  flex: auto;
  font-weight: normal;
  font-family: inherit;
  color: inherit;
  
  ::placeholder {
    color: #E5E5E5;
  }
  
  :focus {
    outline: none;
    caret-color: #17AE7E;
  }
`

export const EditPageHeader = withRouter(memo<RouteComponentProps>((props) => {
  const editPageStore = useStore(EditPageStore)
  function togglePreview() {
    editPageStore.setShowPreview(!editPageStore.showPreview)
  }
  
  return (
    <PageHeader>
      {/*<IconButton src={searchIcon}/>*/}
      {/*<SearchInput placeholder='Search every document...' spellCheck={false}/>*/}
      {/*<FixedSpace/>*/}
      <FlexSpace/>
      <IconButton src={previewIcon} onClick={togglePreview}/>
      <FixedSpace/>
      <IconButton src={themeIcon}  onClick={() => {props.history.push('/theme')}}/>
      <IconButton src={playIcon} onClick={() => {props.history.push('/presentation/0')}}/>
      {/*<FixedSpace/>*/}
      {/*<IconButton src={exportIcon} onClick={() => {console.log(editPageStore.slideElementsRef.current)}}/>*/}
      {/*<IconButton src={shareIcon}/>*/}
    </PageHeader>
  )
}))
