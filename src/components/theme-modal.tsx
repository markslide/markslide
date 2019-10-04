import React, {memo} from 'react'
import {Modal} from '@/components/modal'
import { withRouter, RouteComponentProps } from 'react-router'

export const ThemeModal = withRouter(memo<RouteComponentProps>((props) => {
  function onClose() {
    props.history.push('..')
  }
  return (
    <Modal onClose={onClose}>
      theme
    </Modal>
  )
}))
