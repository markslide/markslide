import React, {memo} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'
import playIcon from '@/assets/icon/play.svg'
import logo from '@/assets/icon/logo.svg'
import searchIcon from '@/assets/icon/search.svg'
import questionIcon from '@/assets/icon/question.svg'
import exportIcon from '@/assets/icon/export.svg'
import previewIcon from '@/assets/icon/preview.svg'
import shareIcon from '@/assets/icon/share.svg'
import themeIcon from '@/assets/icon/theme.svg'
import {RouteComponentProps, withRouter} from 'react-router'
import {hoverShrink} from "@/utils/hover-animation";


const Container = styled.div`
  padding: 16px 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    flex: none;
    margin: 0 6px;
    :first-of-type {
      margin-left: 0;
    }
    :last-of-type {
      margin-right: 0;
    }
  }
`

const FixedSpace = styled.div`
  flex: none;
  width: 16px;
`

// const FlexSpace = styled.div`
//   flex: auto
// `

const Logo = styled.img`
  height: 26px;
  margin-right: 16px;
`

const IconButton = styled.img`
  ${clickable};
  ${hoverShrink};
  height: 21px;
`

const TextButton = styled.div`
  ${clickable};
  ${hoverShrink};
`

const UserInfoButton = styled(TextButton)`
  height: 23px;
  line-height: 23px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 12px;
  color: #17AE7E;
`

const Version = styled.div`
  width: 54px;
  height: 22px;
  border-radius: 4px;
  line-height: 22px;
  text-align: center;
  background-color: #f7f7f7;
  color: #b0b0b0;
  font-size: 10px;
`

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
  return (
    <Container>
      <Logo src={logo}/>
      <Version>v 0.0.1</Version>
      <FixedSpace/>
      <IconButton src={searchIcon}/>
      <SearchInput placeholder='Search every document...' spellCheck={false}/>
      <FixedSpace/>
      <IconButton src={previewIcon}/>
      <FixedSpace/>
      <IconButton src={themeIcon}/>
      <IconButton src={playIcon} onClick={() => {props.history.push('/presentation')}}/>
      <FixedSpace/>
      <IconButton src={exportIcon}/>
      <IconButton src={shareIcon}/>
      <FixedSpace/>
      <IconButton src={questionIcon}/>
      <UserInfoButton>gb hao</UserInfoButton>
    </Container>
  )
})
)
