import React, {FC} from 'react'
import {useStore} from 'reto'
import {ThemeStore} from '@/stores/theme.store'

export const ThemeContainer: FC = (props) => {
  const themeStore = useStore(ThemeStore)
  
  return (
    <div className={`theme-${themeStore.theme} theme-scheme-${themeStore.scheme} theme-mode-${themeStore.mode}`}>
      {props.children}
    </div>
  )
}
