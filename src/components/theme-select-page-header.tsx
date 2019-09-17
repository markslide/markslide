import React, {memo} from 'react'
import confirmIcon from '@/assets/icon/confirm.svg'
import cancelIcon from '@/assets/icon/cancel.svg'
import {RouteComponentProps, withRouter} from 'react-router'
import {FlexSpace, IconButton, PageHeader} from '@/components/page-header'

export const ThemeEditPageHeader = withRouter(memo<RouteComponentProps>((props) => {

  function confirmThemeChange() {
    // Confirm change
    props.history.push('/edit')
  }

  function cancelThemeChange() {
    // Cancel change
    props.history.push('/edit')
  }

  return (
    <PageHeader>
      <FlexSpace/>
      <IconButton src={cancelIcon} onClick={cancelThemeChange}/>
      <IconButton src={confirmIcon} onClick={confirmThemeChange}/>
    </PageHeader>
  )
}))
