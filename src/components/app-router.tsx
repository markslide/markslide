import {memo, default as React} from 'react'
import {Route, Switch, Redirect} from 'react-router'
import {UploadPage} from '@/pages/upload.page'
import {BrowserRouter as Router} from 'react-router-dom'

export const AppRouter = memo(function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={() => (
          <Redirect to='/upload'/>
        )}/>
        <Route path='/upload' component={UploadPage} exact/>
      </Switch>
    </Router>
  )
})
