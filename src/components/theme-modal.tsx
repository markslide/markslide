import React, {memo} from 'react'
import {Modal} from '@/components/modal'
import { withRouter, RouteComponentProps } from 'react-router'
import {useStore} from 'reto'
import {ThemeStore} from '@/stores/theme.store'
import {themeMap} from '@/utils/theme-map'
import styled from 'styled-components'

const P = styled.div`
  margin: 12px 0;
  > a, span {
    display: inline-block;
    margin-right: 8px;
  }
`

export const ThemeModal = withRouter(memo<RouteComponentProps>((props) => {
  const themeStore = useStore(ThemeStore)
  
  function onClose() {
    props.history.push('..')
  }
  return (
    <Modal onClose={onClose}>
      {Object.keys(themeMap).map(key => (
        <P key={key}>
          <span>{themeMap[key]}</span>
          {themeStore.theme === key ? (
            <span>Using</span>
          ) : (
            <a onClick={() => {
              themeStore.setTheme(key)
            }}>Use</a>
          )}
        </P>
      ))}
    </Modal>
  )
}))
