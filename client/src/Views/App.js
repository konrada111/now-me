import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterView from './RegisterView';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import LoginView from './LoginView';

import { useSelector } from 'react-redux';
import { selectUserToken, selectUserRole } from '../features/appSlice';
import AdminPanel from './AdminPanel';
import HomePage from './HomePage';
import ProtectedRoute from 'ProtectedRoute/ProtectedRoute';
import Specialist from './Specialist';

function App() {
  const token = useSelector(selectUserToken);
  const role = useSelector(selectUserRole);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainTemplate>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/sign-in">
              <RegisterView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
            <ProtectedRoute path="/admin-panel" component={AdminPanel} isAuth={role} />
            <Route path="/specialist">
              <Specialist />
            </Route>
          </Switch>
        </MainTemplate>
      </ThemeProvider>
    </Router>
  );
}

export default App;
