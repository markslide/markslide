import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from '@/components/app'
import '@/themes/one-dark/index.less'
import '@/themes/citrine/_schemes/color-1.less'
import '@/themes/citrine/_schemes/color-1.dark.less'

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
