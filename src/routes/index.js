import React from 'react'
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router'
import {requireAuthentication} from '../components/auth/AuthenticatedComponent'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import LoginView from 'views/LoginView/LoginView'
import NotFoundView from 'views/NotFoundView/NotFoundView'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomeView} />
      <Route path='/404' component={requireAuthentication(NotFoundView)} />
      <Route path='/login' component={LoginView} />
      <Redirect from='*' to='/404' />
    </Route>
  </Router>
)
