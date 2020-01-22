import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import VisaApplicationState from "./context/visa_application/VisaApplicationState";

import Navbar from "./components/layouts/MyNavbar";
import Alert from "./components/layouts/Alert";

import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import NotFound from "./components/pages/NotFound";
import SingleVisa from "./components/visa_application/Visa";

import VisaApplication from "./components/visa_application/Application";
import Visas from "./components/visa_application/Visas";

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
              <PrivateRoute
                exact
                path='/application/:visaAppId'
                component={SingleVisa}
              />

              {["/visaform", "/visaform/:visaAppId"].map((path, index) => (
                <PrivateRoute
                  exact
                  path={path}
                  key={index}
                  component={VisaApplication}
                />
              ))}
              <PrivateRoute exact path='/applications' component={Visas} />
              <Route component={NotFound} />
            </Switch>
          </VisaApplicationState>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
