import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserListPage from 'containers/pages/User/List'
import UserCreatePage from 'containers/pages/User/Create'
import UserEditPage from 'containers/pages/User/Edit'
import NotFoundPage from 'containers/pages/NotFound'

const Routes = () => (
  <BrowserRouter>
    <div className="pt-5">
      <Switch>
        <Route exact path="/" component={UserListPage} />
        <Route exact path="/new" component={UserCreatePage} />
        <Route exact path="/:userId/edit" component={UserEditPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Routes
