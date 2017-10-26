import React, { Component } from 'react';
import Game from './components/Game';
import { Route, Switch } from 'react-router-dom';
import { login, register, logout, validateToken } from './actions/auth';
import {
  ProtectedRoute,
  Login,
  Register,
  FetchUser,
  NavBar
} from '@devpoint/dps-react-kit';
import Scores from './components/Scores';

const authRoutes = [
  {url: '/scores', text: 'scores'}
]

const App = () => (
  <div>
    <NavBar authRoutes={authRoutes} handleLogout={logout} />
    <FetchUser validateToken={validateToken}>
      <Switch>
        <ProtectedRoute exact path="/" component={Game} />
        <ProtectedRoute exact path="/scores" component={Scores} />
        <Route
          exact
          path="/login"
          render={ props => <Login {...props} handleLogin={login} /> }
        />
        <Route
          exact
          path="/register"
          render={ props => <Register {...props} registerUser={register} /> }
        />
      </Switch>
    </FetchUser>
  </div>
)

export default App;
