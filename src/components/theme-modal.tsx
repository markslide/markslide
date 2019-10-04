import React, {memo, useMemo} from 'react'
import {Modal} from '@/components/modal'
import {withRouter, RouteComponentProps} from 'react-router'
import {useStore} from 'reto'
import {ThemeStore} from '@/stores/theme.store'
import {themes} from '@/utils/themes'
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
  
  const selectedTheme = useMemo(() => {
    for (const theme of themes) {
      if (theme.id === themeStore.theme) {
        return theme
      }
    }
  }, [themeStore.theme])
  
  function onClose() {
    props.history.push('..')
  }
  return (
    <Modal onClose={onClose}>
      <h3>Themes</h3>
      {themes.map(theme => (
        <P key={theme.id}>
          <span>{theme.name}</span>
          {themeStore.theme === theme.id ? (
            <span><b>Using</b></span>
          ) : (
            <a onClick={() => {
              themeStore.setTheme(theme.id)
              themeStore.setScheme(theme.schemes[0].id)
            }}>Use</a>
          )}
        </P>
      ))}
      <hr/>
      <h3>Schemes</h3>
      {selectedTheme && selectedTheme.schemes.map(scheme => (
        <P key={scheme.id}>
          <span>{scheme.name}</span>
          {themeStore.scheme === scheme.id ? (
            <span><b>Using</b></span>
          ) : (
            <a onClick={() => {
              themeStore.setScheme(scheme.id)
            }}>Use</a>
          )}
        </P>
      ))}
    </Modal>
  )
}))
