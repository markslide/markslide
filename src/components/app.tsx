import {FC} from 'react'
import * as React from 'react'
import {AppRouter} from '@/components/app-router'
import {Provider} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'
import {GlobalStyle} from '@/components/global-style'

export const App: FC = () => {
  return (
    <>
      <GlobalStyle/>
      <Provider of={PresentationStore}>
        <AppRouter/>
      </Provider>
    </>
  )
}
