import React, {memo} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'

const Container = styled.div`
  padding: 12px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    flex: none;
    margin: 0 8px;
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

const FlexSpace = styled.div`
  flex: auto
`

const Logo = styled.img`
  width: 100px;
  height: 40px;
  background: #f0fff4;
`

const IconButton = styled.img`
  ${clickable};
  height: 28px;
`

export const EditPageHeader = memo<{}>(() => {
  return (
    <Container>
      <Logo/>
      <FlexSpace/>
      <IconButton src='https://randomuser.me/api/portraits/men/1.jpg'/>
      <FixedSpace/>
      <IconButton src='https://randomuser.me/api/portraits/men/1.jpg'/>
      <IconButton src='https://randomuser.me/api/portraits/men/1.jpg'/>
      <FixedSpace/>
      <IconButton src='https://randomuser.me/api/portraits/men/1.jpg'/>
      <IconButton src='https://randomuser.me/api/portraits/men/1.jpg'/>
      <Logo/>
    </Container>
  )
})
