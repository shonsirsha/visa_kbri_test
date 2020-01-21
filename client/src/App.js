import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import VisaApplicationState from "./context/visa_application/VisaApplicationState";

import Navbar from "./components/layouts/MyNavbar";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import VisaApplication from "./components/visa_application/Application";
import Alert from "./components/layouts/Alert";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <VisaApplicationState>
            <Alert />

            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/visaform' component={VisaApplication} />
            </Switch>
          </VisaApplicationState>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
