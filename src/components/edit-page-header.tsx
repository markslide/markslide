import React, {memo} from 'react'
import styled from 'styled-components'
import {clickable} from '@/utils/clickable'
import playIcon from '@/assets/icon/play.svg'
import cancelIcon from '@/assets/icon/cancel.svg'
import confirmIcon from '@/assets/icon/confirm.svg'
import exportIcon from '@/assets/icon/export.svg'
import previewIcon from '@/assets/icon/preview.svg'
import shareIcon from '@/assets/icon/share.svg'
import themeIcon from '@/assets/icon/theme.svg'
import { withRouter, RouteComponentProps } from 'react-router'


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
  height: 24px;
`

export const EditPageHeader = withRouter(memo<RouteComponentProps>((props) => {
  return (
    <Container>
      <Logo/>
      <FlexSpace/>
      <IconButton src={previewIcon}/>
      <FixedSpace/>
      <IconButton src={themeIcon}/>
      <IconButton src={playIcon} onClick={() => {props.history.push('/presentation')}}/>
      <FixedSpace/>
      <IconButton src={exportIcon}/>
      <IconButton src={shareIcon}/>
      <Logo/>
    </Container>
  )
})
)
