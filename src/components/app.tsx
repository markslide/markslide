import {FC} from 'react'
import * as React from 'react'
import {AppRouter} from '@/components/app-router'
import {createGlobalStyle} from "styled-components";

const BodyStyle = createGlobalStyle`
  body {
    margin: 0
    padding: 0
  }
`

export const App: FC = () => {
  return (
    <>
      <BodyStyle/>
      <AppRouter/>
    </>
  )
}
