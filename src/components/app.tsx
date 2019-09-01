import {FC} from 'react'
import * as React from 'react'
import {AppRouter} from '@/components/app-router'
import {Provider} from 'reto'
import {PresentationStore} from '@/stores/presentation.store'

export const App: FC = () => {
  return (
    <Provider of={PresentationStore}>
      <AppRouter/>
    </Provider>
  )
}
