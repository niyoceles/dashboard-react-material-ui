import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//component
// import AuthRoute from './utils/AuthRoute';
//pages
import dashboard from './pages/dashboard';
import login from './pages/login';
import objectTheme from './utils/theme';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { logoutUser } from '../src/redux/actions';
import axios from 'axios';

const theme = createMuiTheme(objectTheme);

const token = localStorage.applicationToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={login} />
                <Route exact path='/dashboard' component={dashboard} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
