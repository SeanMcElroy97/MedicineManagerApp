import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Route, Redirect } from "react-router-dom";

//Determines which URLs need to have a user logged in for
class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
