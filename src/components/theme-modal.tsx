import React, {memo, useMemo} from 'react'
import {Modal} from '@/components/modal'
import {RouteComponentProps, withRouter} from 'react-router'
import {useStore} from 'reto'
import {ThemeStore} from '@/stores/theme.store'
import {themes} from '@/utils/themes'
import styled from 'styled-components'
import {Color} from '@/components/color-picker'

const P = styled.div`
  margin: 12px 0;
  
  > a, span {
    display: inline-block;
    margin-right: 8px;
  }
`

const Colors = styled.div`
  > div {
    display: inline-block;
  }
  
  > div+div {
    margin-left: 20px;
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
              themeStore.setMode(theme.modes.length ? theme.modes[0].id : '')
            }}>Use</a>
          )}
        </P>
      ))}
      <hr/>
      <h3>Schemes</h3>
      <Colors>
        {selectedTheme.schemes.map(scheme => (
          <P key={scheme.id}>
            {scheme.hex && (
              <Color
                color={scheme.hex}
                theme={{title: scheme.name, open: themeStore.scheme === scheme.id}}
                onClick={() => {themeStore.setScheme(scheme.id)}}
              />
            )}
          </P>
        ))}
      </Colors>
      {selectedTheme.modes && (
        <>
          <hr/>
          <h3>Dark Mode</h3>
          {selectedTheme.modes.map(mode => (
            <P key={mode.id}>
              <span>{mode.name}</span>
              {themeStore.mode === mode.id ? (
                <span><b>Using</b></span>
              ) : (
                <a onClick={() => {
                  themeStore.setMode(mode.id)
                }}>Use</a>
              )}
            </P>
          ))}
        </>
      )}
    </Modal>
  )
}))
