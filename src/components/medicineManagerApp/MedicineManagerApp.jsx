import React, { Component } from "react";

import LoginComponent from "../LoginComponent.jsx";
import HeaderComponent from "../HeaderComponent.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent.jsx";
import UpdateProductFile from "../UpdateProductFile.jsx";
import patientListComponent from "../Patients/PatientListComponent.jsx";

// import AuthenticationService from "../../Authentication/AuthenticationService.js";
import AuthenticatedRoute from "../../Authentication/AuthenticatedRoute.jsx";

export default class MedicineManagerApp extends Component {
  render() {
    return (
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <AuthenticatedRoute path="/home" component={HomeComponent} />
          <AuthenticatedRoute path="/signout" component={LoginComponent} />
          <AuthenticatedRoute
            path="/productfile"
            component={UpdateProductFile}
          />
          <AuthenticatedRoute
            path="/patients"
            component={patientListComponent}
          />
          <Route component={LoginComponent} />
        </Switch>
      </Router>
    );
  }
}
