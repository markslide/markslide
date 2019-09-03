import {memo, default as React} from 'react'
import {Route, Switch, Redirect} from 'react-router'
import {UploadPage} from '@/pages/upload.page'
import {HashRouter as Router} from 'react-router-dom'
import {PresentationPage} from '@/pages/presentation.page'
import {EditPage} from '@/pages/edit.page'

export const AppRouter = memo(function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={() => (
          <Redirect to='/upload'/>
        )}/>
        <Route path='/upload' component={UploadPage} exact/>
        <Route path='/edit' component={EditPage}/>
        <Route path='/presentation' component={PresentationPage} exact/>
      </Switch>
    </Router>
  )
})
