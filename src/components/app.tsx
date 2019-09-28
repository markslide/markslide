import {FC} from 'react'
import * as React from 'react'
import {AppRouter} from '@/components/app-router'
import {Provider} from 'reto'
import {SlideStore} from '@/stores/slide.store'
import {GlobalStyle} from '@/components/global-style'
import {ThemeStore} from '@/stores/theme.store'

export const App: FC = () => {
  return (
    <>
      <GlobalStyle/>
      <Provider of={SlideStore}>
        <Provider of={ThemeStore}>
          <AppRouter/>
        </Provider>
      </Provider>
    </>
  )
}
