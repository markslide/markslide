import styled from 'styled-components'
import {clickable} from '@/utils/clickable'
import {hoverShrink} from '@/utils/hover-animation'
import React, {memo} from 'react'
import logo from '@/assets/icon/logo.svg'
import questionIcon from '@/assets/icon/question.svg'

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

export const FixedSpace = styled.div`
  flex: none;
  width: 16px;
`

export const FlexSpace = styled.div`
  flex: auto
`

const Logo = styled.img`
  height: 26px;
  margin-right: 16px;
  user-select: none;
`

export const IconButton = styled.img`
  ${clickable};
  ${hoverShrink};
  height: 21px;
  user-select: none;
`

export const TextButton = styled.div`
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
  ${clickable};
  padding: 3px 8px;
  border-radius: 4px;
  line-height: 22px;
  text-align: center;
  background-color: #f7f7f7;
  color: #b0b0b0;
  font-size: 10px;
`

interface Props {}

export const PageHeader = memo<Props>((props) => {
  function viewReleases() {
    window.open('https://github.com/markslide/markslide/releases', '_blank')
  }
  
  function viewHelp() {
    window.open('https://github.com/markslide/markslide', '_blank')
  }
  
  return (
    <Container>
      <Logo src={logo}/>
      <Version onClick={viewReleases}>v {PACKAGE_VERSION}</Version>
      <FixedSpace/>
      {props.children || (
        <FlexSpace/>
      )}
      <FixedSpace/>
      <IconButton src={questionIcon} onClick={viewHelp}/>
      {/*<UserInfoButton>gb hao</UserInfoButton>*/}
    </Container>
  )
})

